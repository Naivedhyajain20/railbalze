import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserContextMenu = ({ className = '' }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const menuRef = useRef(null);

  // Mock user data - in real app this would come from auth context
  const user = {
    name: 'Traffic Controller',
    email: 'controller@railway.com',
    role: 'Senior Controller',
    avatar: null,
    lastLogin: '2025-09-01 09:30:00'
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event?.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // In real app, this would update theme context/localStorage
    document.documentElement?.setAttribute('data-theme', newTheme);
  };

  const handleLogout = () => {
    // Show confirmation dialog in real app
    if (window.confirm('Are you sure you want to sign out?')) {
      // Clear auth tokens, user data, etc.
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      navigate('/login-modal');
    }
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    // Navigate to profile page or open profile modal
    console.log('Navigate to profile');
    setIsOpen(false);
  };

  const handlePreferencesClick = () => {
    navigate('/system-administration-settings');
    setIsOpen(false);
  };

  const handleHelpClick = () => {
    // Open help documentation or support
    window.open('/help', '_blank');
    setIsOpen(false);
  };

  const formatLastLogin = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      {/* User Avatar Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 hover:bg-muted"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          {user?.avatar ? (
            <img 
              src={user?.avatar} 
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <Icon name="User" size={16} color="white" />
          )}
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-foreground truncate max-w-24">
            {user?.name?.split(' ')?.[0]}
          </div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </Button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-md shadow-lg z-dropdown animate-fade-in">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                {user?.avatar ? (
                  <img 
                    src={user?.avatar} 
                    alt={user?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <Icon name="User" size={20} color="white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.role}
                </p>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Last login: {formatLastLogin(user?.lastLogin)}
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={handleProfileClick}
              className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150 flex items-center space-x-3"
            >
              <Icon name="User" size={16} />
              <span>View Profile</span>
            </button>

            <button
              onClick={handlePreferencesClick}
              className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150 flex items-center space-x-3"
            >
              <Icon name="Settings" size={16} />
              <span>Preferences</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <Icon name={theme === 'light' ? 'Sun' : 'Moon'} size={16} />
                <span>Theme</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-muted-foreground capitalize">
                  {theme}
                </span>
                <Icon name="ChevronRight" size={12} className="text-muted-foreground" />
              </div>
            </button>

            <button
              onClick={handleHelpClick}
              className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150 flex items-center space-x-3"
            >
              <Icon name="HelpCircle" size={16} />
              <span>Help & Support</span>
            </button>

            {/* Divider */}
            <div className="border-t border-border my-1"></div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors duration-150 flex items-center space-x-3"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Railway DSS v2.1.0</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-railway-safe rounded-full"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContextMenu;