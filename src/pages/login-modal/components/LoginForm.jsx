import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onClose, isLoading, setIsLoading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData?.password?.trim()) {
      newErrors.password = "Password is required";
    } else if (formData?.password?.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Mock authentication - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful authentication
      const mockUserData = {
        id: 'user_001',
        name: 'Traffic Controller',
        email: formData?.email,
        role: 'Senior Controller',
        lastLogin: new Date()?.toISOString()
      };
      
      // Store auth data
      localStorage.setItem('authToken', 'mock_jwt_token_' + Date.now());
      localStorage.setItem('userData', JSON.stringify(mockUserData));
      localStorage.setItem('rememberMe', formData?.rememberMe?.toString());
      
      // Navigate to dashboard
      navigate('/main-dashboard');
      
    } catch (error) {
      setErrors({
        submit: "Authentication failed. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In real app, this would open forgot password modal or navigate to reset page
    alert("Password reset functionality would be implemented here.\n\nFor demo purposes, use any valid email and password to login.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Input */}
      <Input
        label="Email Address"
        type="email"
        placeholder="controller@railway.com"
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.email}
        required
        disabled={isLoading}
        className="w-full"
      />
      {/* Password Input */}
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
          disabled={isLoading}
          className="w-full pr-12"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-150"
          disabled={isLoading}
        >
          <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
        </button>
      </div>
      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          checked={formData?.rememberMe}
          onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
          disabled={isLoading}
          size="sm"
        />
        
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-colors duration-150"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>
      {/* Submit Error */}
      {errors?.submit && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-destructive" />
            <span className="text-sm text-destructive">{errors?.submit}</span>
          </div>
        </div>
      )}
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        iconName="LogIn"
        iconPosition="left"
        iconSize={18}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
      {/* Demo Credentials Info */}
      <div className="p-3 bg-muted/50 border border-border rounded-md">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Demo Access</p>
            <p>Use any valid email format with any password to access the system.</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;