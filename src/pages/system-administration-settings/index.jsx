import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import UserManagementTab from './components/UserManagementTab';
import SafetyConfigurationTab from './components/SafetyConfigurationTab';
import TrainPriorityTab from './components/TrainPriorityTab';
import SystemPreferencesTab from './components/SystemPreferencesTab';
import AuditLogTab from './components/AuditLogTab';

const SystemAdministrationSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    {
      id: 'users',
      label: 'User Management',
      icon: 'Users',
      description: 'Manage user accounts and permissions'
    },
    {
      id: 'safety',
      label: 'Safety Configuration',
      icon: 'Shield',
      description: 'Configure safety parameters and thresholds'
    },
    {
      id: 'priority',
      label: 'Train Priority',
      icon: 'ArrowUpDown',
      description: 'Set train priority levels and rules'
    },
    {
      id: 'preferences',
      label: 'System Preferences',
      icon: 'Settings',
      description: 'Configure system-wide preferences'
    },
    {
      id: 'audit',
      label: 'Audit Log',
      icon: 'FileText',
      description: 'View system activity and changes'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagementTab />;
      case 'safety':
        return <SafetyConfigurationTab />;
      case 'priority':
        return <TrainPriorityTab />;
      case 'preferences':
        return <SystemPreferencesTab />;
      case 'audit':
        return <AuditLogTab />;
      default:
        return <UserManagementTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="main-content">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <button
              onClick={() => navigate('/main-dashboard')}
              className="hover:text-foreground transition-colors duration-150"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground">Administration</span>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground">Settings</span>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">System Administration</h1>
                <p className="text-muted-foreground">
                  Configure system settings, manage users, and monitor activity
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Tab Description */}
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                {tabs?.find(tab => tab?.id === activeTab)?.description}
              </p>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-background">
            {renderTabContent()}
          </div>

          {/* Help Section */}
          <div className="mt-12 bg-muted/30 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <Icon name="HelpCircle" size={24} className="text-primary mt-1" />
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Access comprehensive documentation and support resources for system administration.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Book"
                    iconPosition="left"
                    onClick={() => window.open('/documentation', '_blank')}
                  >
                    Documentation
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                    onClick={() => window.open('/support', '_blank')}
                  >
                    Contact Support
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Video"
                    iconPosition="left"
                    onClick={() => window.open('/training', '_blank')}
                  >
                    Training Videos
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-primary" />
                <span className="text-sm text-foreground font-medium">Railway DSS</span>
              </div>
              <span className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} Railway Decision Support System
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Version 2.1.0</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-railway-safe rounded-full"></div>
                <span>System Operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SystemAdministrationSettings;