import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg">
          <Icon name="Train" size={32} color="white" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Railway Traffic Control System
      </h1>

      {/* Tagline */}
      <p className="text-muted-foreground text-sm leading-relaxed">
        AI-powered decision support for optimal railway operations
      </p>

      {/* Status Indicator */}
      <div className="flex items-center justify-center space-x-2 mt-4">
        <div className="w-2 h-2 bg-railway-safe rounded-full animate-pulse"></div>
        <span className="text-xs text-muted-foreground">System Online</span>
      </div>
    </div>
  );
};

export default LoginHeader;