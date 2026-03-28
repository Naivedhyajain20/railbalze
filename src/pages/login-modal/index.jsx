import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import LandingBackground from './components/LandingBackground';

const LoginModalPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/main-dashboard');
      return;
    }

    // Auto-open modal after a brief delay for better UX
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleModalClose = () => {
    if (!isLoading) {
      setIsModalOpen(false);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Landing Background */}
      <LandingBackground />
      {/* Floating Action Button - Show when modal is closed */}
      {!isModalOpen && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={handleModalOpen}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Access System</span>
          </button>
        </div>
      )}
      {/* Login Modal */}
      <LoginModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center justify-between text-white/60 text-sm">
          <div className="flex items-center space-x-4">
            <span>© {new Date()?.getFullYear()} Railway Corporation</span>
            <span>•</span>
            <span>Enterprise Solution</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Version 2.1.0</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-railway-safe rounded-full"></div>
              <span>System Operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModalPage;