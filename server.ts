import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  try {
    const app = express();
    const PORT = process.env.PORT || 3000;
    const isProduction = process.env.NODE_ENV === "production";

    // API routes
    app.get("/api/health", (req, res) => {
      res.json({ status: "ok", env: process.env.NODE_ENV });
    });

    // Use Vite middleware for development
    if (!isProduction) {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), 'dist');
      
      // Check if dist exists
      if (!fs.existsSync(distPath)) {
        console.warn(`Warning: 'dist' folder not found at ${distPath}. Did you run 'npm run build'?`);
      }

      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        const indexPath = path.join(distPath, 'index.html');
        res.sendFile(indexPath, (err) => {
          if (err) {
            console.error("Error sending index.html:", err);
            res.status(500).send("Internal Server Error: Missing build files.");
          }
        });
      });
    }

    app.listen(Number(PORT), "0.0.0.0", () => {
      console.log(`Server running on port ${PORT} (mode: ${isProduction ? 'production' : 'development'})`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
