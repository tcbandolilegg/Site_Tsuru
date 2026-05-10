/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PainPoints from "./components/PainPoints";
import Features from "./components/Features";
import FamilySection from "./components/FamilySection";
import CTA from "./components/CTA";
import RegistrationForm from "./components/RegistrationForm";
import Plans from "./components/Plans";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [view, setView] = useState<'home' | 'plans' | 'registration'>('home');
  const [selectedPlan, setSelectedPlan] = useState('dopamina');
  const [isLoginIntent, setIsLoginIntent] = useState(false);

  const goToPlans = () => {
    setIsLoginIntent(false);
    const element = document.getElementById('plans');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById('plans');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleAccess = () => {
    setIsLoginIntent(true);
    setSelectedPlan('dopamina');
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById('registration');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const goToRegistration = (plan: string) => {
    setIsLoginIntent(false);
    setSelectedPlan(plan);
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById('registration');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const goToHome = () => {
    setView('home');
    window.scrollTo(0, 0);
  };

  const scrollToFamily = () => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const element = document.getElementById('family');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('family');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSolutions = () => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const element = document.getElementById('solutions');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('solutions');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFeatures = () => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const element = document.getElementById('features');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('features');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCTA = () => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const element = document.getElementById('cta');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('cta');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar 
        onOpenContact={() => setIsContactOpen(true)} 
        onRegister={goToPlans}
        onAccess={handleAccess}
        onLogoClick={goToHome}
        onFamilyClick={scrollToFamily}
        onSolutionsClick={scrollToSolutions}
        onFeaturesClick={scrollToFeatures}
        onCTAClick={scrollToCTA}
      />
      
      {view === 'home' && (
        <>
          <Hero 
            onRegister={goToPlans} 
            onAccess={handleAccess} 
            onLearnMore={scrollToCTA} 
          />
          <PainPoints />
          <Features />
          <FamilySection />
          <Plans onSelectPlan={goToRegistration} />
          <CTA onOpenContact={() => setIsContactOpen(true)} onRegister={goToPlans} onAccess={handleAccess} />
          <div id="registration" className="py-20 bg-tsuru-bg">
            <RegistrationForm selectedPlan={selectedPlan} isLoginIntent={isLoginIntent} />
          </div>
        </>
      )}

      <Footer 
        onOpenContact={() => setIsContactOpen(true)} 
        onLogoClick={goToHome}
        onFamilyClick={scrollToFamily}
        onSolutionsClick={scrollToSolutions}
        onFeaturesClick={scrollToFeatures}
        onPlansClick={goToPlans}
      />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}

