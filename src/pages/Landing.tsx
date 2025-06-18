
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stores/useAppStore';
import AuthModal from '@/components/auth/AuthModal';
import Navigation from '@/components/landing/Navigation';
import Hero from '@/components/landing/Hero';
import Stats from '@/components/landing/Stats';
import Features from '@/components/landing/Features';
import About from '@/components/landing/About';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';

const Landing = () => {
  const { isAuthenticated, setShowAuthModal } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to dashboard if already logged in
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-white relative overflow-hidden">
        <Navigation onLoginClick={handleLoginClick} />
        <Hero onLoginClick={handleLoginClick} />
        <Stats />
        <Features />
        <About />
        <Contact />
        <Footer />
      </div>
      <AuthModal />
    </>
  );
};

export default Landing;
