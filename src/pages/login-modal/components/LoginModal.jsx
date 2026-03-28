import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import LoginHeader from './LoginHeader';
import LoginForm from './LoginForm';

const LoginModal = ({ isOpen, onClose, isLoading, setIsLoading }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEscape = (event) => {
      if (event?.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, isLoading]);

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget && !isLoading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />
      {/* Modal Container */}
      <div className="relative w-full max-w-md mx-4 animate-fade-in">
        {/* Modal Card */}
        <div className="bg-card border border-border rounded-xl shadow-xl overflow-hidden">
          {/* Close Button */}
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              disabled={isLoading}
              iconName="X"
              iconSize={18}
              className="w-8 h-8 p-0 hover:bg-muted/80"
            />
          </div>

          {/* Modal Content */}
          <div className="p-8">
            <LoginHeader />
            <LoginForm 
              onClose={onClose} 
              isLoading={isLoading} 
              setIsLoading={setIsLoading} 
            />
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-muted/30 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Railway DSS v2.1.0</span>
              <div className="flex items-center space-x-4">
                <span>© {new Date()?.getFullYear()} Railway Corp</span>
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={12} />
                  <span>Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;