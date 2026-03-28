import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const SystemPreferencesTab = () => {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    currency: 'USD',
    refreshInterval: 30,
    autoSave: true,
    soundAlerts: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    criticalAlertsOnly: false,
    mapDefaultZoom: 12,
    mapStyle: 'standard',
    showTrainNumbers: true,
    showDelayInfo: true,
    compactView: false,
    highContrast: false
  });

  const [hasChanges, setHasChanges] = useState(false);

  const themeOptions = [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'auto', label: 'Auto (System)' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' }
  ];

  const timezoneOptions = [
    { value: 'UTC', label: 'UTC' },
    { value: 'EST', label: 'Eastern Time' },
    { value: 'CST', label: 'Central Time' },
    { value: 'MST', label: 'Mountain Time' },
    { value: 'PST', label: 'Pacific Time' }
  ];

  const dateFormatOptions = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
  ];

  const timeFormatOptions = [
    { value: '12h', label: '12 Hour (AM/PM)' },
    { value: '24h', label: '24 Hour' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
    { value: 'JPY', label: 'Japanese Yen (¥)' }
  ];

  const refreshIntervalOptions = [
    { value: 10, label: '10 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: 300, label: '5 minutes' }
  ];

  const mapStyleOptions = [
    { value: 'standard', label: 'Standard' },
    { value: 'satellite', label: 'Satellite' },
    { value: 'terrain', label: 'Terrain' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleToggleChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving preferences:', preferences);
    setHasChanges(false);
    // Apply theme immediately
    if (preferences?.theme !== 'auto') {
      document.documentElement?.setAttribute('data-theme', preferences?.theme);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all preferences to default values?')) {
      setPreferences({
        theme: 'light',
        language: 'en',
        timezone: 'UTC',
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12h',
        currency: 'USD',
        refreshInterval: 30,
        autoSave: true,
        soundAlerts: true,
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        criticalAlertsOnly: false,
        mapDefaultZoom: 12,
        mapStyle: 'standard',
        showTrainNumbers: true,
        showDelayInfo: true,
        compactView: false,
        highContrast: false
      });
      setHasChanges(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">System Preferences</h3>
          <p className="text-sm text-muted-foreground">
            Configure application settings and user interface preferences
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            iconName="RotateCcw"
            onClick={handleReset}
          >
            Reset to Defaults
          </Button>
          <Button
            variant="default"
            iconName="Save"
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save Preferences
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Palette" size={18} />
            <span>Appearance</span>
          </h4>
          
          <div className="space-y-4">
            <Select
              label="Theme"
              options={themeOptions}
              value={preferences?.theme}
              onChange={(value) => handlePreferenceChange('theme', value)}
            />
            
            <Select
              label="Language"
              options={languageOptions}
              value={preferences?.language}
              onChange={(value) => handlePreferenceChange('language', value)}
            />

            <div className="space-y-3">
              <Checkbox
                label="High Contrast Mode"
                description="Increase contrast for better visibility"
                checked={preferences?.highContrast}
                onChange={() => handleToggleChange('highContrast')}
              />
              
              <Checkbox
                label="Compact View"
                description="Reduce spacing and padding in interface"
                checked={preferences?.compactView}
                onChange={() => handleToggleChange('compactView')}
              />
            </div>
          </div>
        </div>

        {/* Localization Settings */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Globe" size={18} />
            <span>Localization</span>
          </h4>
          
          <div className="space-y-4">
            <Select
              label="Timezone"
              options={timezoneOptions}
              value={preferences?.timezone}
              onChange={(value) => handlePreferenceChange('timezone', value)}
            />
            
            <Select
              label="Date Format"
              options={dateFormatOptions}
              value={preferences?.dateFormat}
              onChange={(value) => handlePreferenceChange('dateFormat', value)}
            />
            
            <Select
              label="Time Format"
              options={timeFormatOptions}
              value={preferences?.timeFormat}
              onChange={(value) => handlePreferenceChange('timeFormat', value)}
            />
            
            <Select
              label="Currency"
              options={currencyOptions}
              value={preferences?.currency}
              onChange={(value) => handlePreferenceChange('currency', value)}
            />
          </div>
        </div>

        {/* System Behavior */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Settings" size={18} />
            <span>System Behavior</span>
          </h4>
          
          <div className="space-y-4">
            <Select
              label="Data Refresh Interval"
              options={refreshIntervalOptions}
              value={preferences?.refreshInterval}
              onChange={(value) => handlePreferenceChange('refreshInterval', value)}
            />

            <div className="space-y-3">
              <Checkbox
                label="Auto-save Changes"
                description="Automatically save configuration changes"
                checked={preferences?.autoSave}
                onChange={() => handleToggleChange('autoSave')}
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Bell" size={18} />
            <span>Notifications</span>
          </h4>
          
          <div className="space-y-3">
            <Checkbox
              label="Sound Alerts"
              description="Play sound for system alerts"
              checked={preferences?.soundAlerts}
              onChange={() => handleToggleChange('soundAlerts')}
            />
            
            <Checkbox
              label="Email Notifications"
              description="Receive notifications via email"
              checked={preferences?.emailNotifications}
              onChange={() => handleToggleChange('emailNotifications')}
            />
            
            <Checkbox
              label="SMS Notifications"
              description="Receive notifications via SMS"
              checked={preferences?.smsNotifications}
              onChange={() => handleToggleChange('smsNotifications')}
            />
            
            <Checkbox
              label="Push Notifications"
              description="Receive browser push notifications"
              checked={preferences?.pushNotifications}
              onChange={() => handleToggleChange('pushNotifications')}
            />
            
            <Checkbox
              label="Critical Alerts Only"
              description="Only receive notifications for critical events"
              checked={preferences?.criticalAlertsOnly}
              onChange={() => handleToggleChange('criticalAlertsOnly')}
            />
          </div>
        </div>

        {/* Map Settings */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Map" size={18} />
            <span>Map Display</span>
          </h4>
          
          <div className="space-y-4">
            <Select
              label="Map Style"
              options={mapStyleOptions}
              value={preferences?.mapStyle}
              onChange={(value) => handlePreferenceChange('mapStyle', value)}
            />

            <Input
              label="Default Zoom Level"
              type="number"
              min="1"
              max="20"
              value={preferences?.mapDefaultZoom}
              onChange={(e) => handlePreferenceChange('mapDefaultZoom', parseInt(e?.target?.value))}
            />

            <div className="space-y-3">
              <Checkbox
                label="Show Train Numbers"
                description="Display train numbers on map markers"
                checked={preferences?.showTrainNumbers}
                onChange={() => handleToggleChange('showTrainNumbers')}
              />
              
              <Checkbox
                label="Show Delay Information"
                description="Display delay status on map"
                checked={preferences?.showDelayInfo}
                onChange={() => handleToggleChange('showDelayInfo')}
              />
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Eye" size={18} />
            <span>Preview</span>
          </h4>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-foreground mb-2">
                Current Date/Time Format:
              </div>
              <div className="font-mono text-sm text-muted-foreground">
                {new Date()?.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: preferences?.dateFormat?.includes('MM') ? '2-digit' : 'short',
                  day: '2-digit'
                })} {new Date()?.toLocaleTimeString('en-US', {
                  hour12: preferences?.timeFormat === '12h'
                })}
              </div>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-foreground mb-2">
                Sample Currency:
              </div>
              <div className="font-mono text-sm text-muted-foreground">
                {preferences?.currency === 'USD' ? '$1,234.56' :
                 preferences?.currency === 'EUR' ? '€1.234,56' :
                 preferences?.currency === 'GBP'? '£1,234.56' : '¥1,234'}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Changes Warning */}
      {hasChanges && (
        <div className="bg-railway-caution/10 border border-railway-caution/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-railway-caution" />
            <span className="text-sm font-medium text-foreground">Unsaved Changes</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            You have unsaved preference changes. Click "Save Preferences" to apply them.
          </p>
        </div>
      )}
    </div>
  );
};

export default SystemPreferencesTab;