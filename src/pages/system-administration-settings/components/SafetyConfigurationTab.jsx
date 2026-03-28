import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SafetyConfigurationTab = () => {
  const [config, setConfig] = useState({
    minSafeDistance: 500,
    conflictDetectionRadius: 1000,
    emergencyBrakingDistance: 800,
    speedLimitThreshold: 120,
    alertDelayThreshold: 5,
    criticalDelayThreshold: 15,
    trackOccupancyTimeout: 300,
    signalResponseTime: 30
  });

  const [hasChanges, setHasChanges] = useState(false);

  const safetyParameters = [
    {
      key: 'minSafeDistance',
      label: 'Minimum Safe Distance',
      description: 'Minimum distance required between trains (meters)',
      unit: 'm',
      min: 100,
      max: 2000,
      step: 50,
      critical: true
    },
    {
      key: 'conflictDetectionRadius',
      label: 'Conflict Detection Radius',
      description: 'Distance for proactive conflict detection (meters)',
      unit: 'm',
      min: 500,
      max: 5000,
      step: 100,
      critical: true
    },
    {
      key: 'emergencyBrakingDistance',
      label: 'Emergency Braking Distance',
      description: 'Required distance for emergency stops (meters)',
      unit: 'm',
      min: 200,
      max: 1500,
      step: 50,
      critical: true
    },
    {
      key: 'speedLimitThreshold',
      label: 'Speed Limit Threshold',
      description: 'Maximum allowed speed for safety calculations (km/h)',
      unit: 'km/h',
      min: 60,
      max: 200,
      step: 10,
      critical: false
    },
    {
      key: 'alertDelayThreshold',
      label: 'Alert Delay Threshold',
      description: 'Delay time before triggering alerts (minutes)',
      unit: 'min',
      min: 1,
      max: 30,
      step: 1,
      critical: false
    },
    {
      key: 'criticalDelayThreshold',
      label: 'Critical Delay Threshold',
      description: 'Delay time for critical alerts (minutes)',
      unit: 'min',
      min: 5,
      max: 60,
      step: 5,
      critical: true
    },
    {
      key: 'trackOccupancyTimeout',
      label: 'Track Occupancy Timeout',
      description: 'Maximum time for track occupancy detection (seconds)',
      unit: 's',
      min: 60,
      max: 600,
      step: 30,
      critical: false
    },
    {
      key: 'signalResponseTime',
      label: 'Signal Response Time',
      description: 'Expected signal response time (seconds)',
      unit: 's',
      min: 10,
      max: 120,
      step: 5,
      critical: false
    }
  ];

  const handleParameterChange = (key, value) => {
    const numValue = parseInt(value);
    setConfig(prev => ({
      ...prev,
      [key]: numValue
    }));
    setHasChanges(true);
  };

  const handleSliderChange = (key, value) => {
    handleParameterChange(key, value);
  };

  const handleSave = () => {
    if (window.confirm('Are you sure you want to save these safety configuration changes? This will affect all railway operations.')) {
      console.log('Saving safety configuration:', config);
      setHasChanges(false);
      // Show success message
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all parameters to default values?')) {
      setConfig({
        minSafeDistance: 500,
        conflictDetectionRadius: 1000,
        emergencyBrakingDistance: 800,
        speedLimitThreshold: 120,
        alertDelayThreshold: 5,
        criticalDelayThreshold: 15,
        trackOccupancyTimeout: 300,
        signalResponseTime: 30
      });
      setHasChanges(true);
    }
  };

  const getParameterStatus = (key, value, param) => {
    const percentage = ((value - param?.min) / (param?.max - param?.min)) * 100;
    
    if (param?.critical) {
      if (percentage < 30) return { color: 'text-railway-danger', status: 'Low Risk' };
      if (percentage > 70) return { color: 'text-railway-caution', status: 'High Safety' };
      return { color: 'text-railway-safe', status: 'Optimal' };
    } else {
      if (percentage < 25 || percentage > 75) return { color: 'text-railway-caution', status: 'Review' };
      return { color: 'text-railway-safe', status: 'Normal' };
    }
  };

  const calculateImpact = () => {
    const criticalParams = safetyParameters?.filter(p => p?.critical);
    const changedCritical = criticalParams?.filter(p => config?.[p?.key] !== 500); // Assuming 500 as baseline
    
    if (changedCritical?.length === 0) return { level: 'low', message: 'Minimal impact on operations' };
    if (changedCritical?.length <= 2) return { level: 'medium', message: 'Moderate impact on safety protocols' };
    return { level: 'high', message: 'Significant impact on railway operations' };
  };

  const impact = calculateImpact();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Safety Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Configure safety parameters and thresholds for railway operations
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
            Save Changes
          </Button>
        </div>
      </div>
      {/* Impact Warning */}
      {hasChanges && (
        <div className={`p-4 rounded-lg border ${
          impact?.level === 'high' ? 'bg-railway-danger/10 border-railway-danger/20' :
          impact?.level === 'medium'? 'bg-railway-caution/10 border-railway-caution/20' : 'bg-railway-safe/10 border-railway-safe/20'
        }`}>
          <div className="flex items-center space-x-2">
            <Icon 
              name={impact?.level === 'high' ? 'AlertTriangle' : impact?.level === 'medium' ? 'AlertCircle' : 'Info'} 
              size={16} 
              className={
                impact?.level === 'high' ? 'text-railway-danger' :
                impact?.level === 'medium'? 'text-railway-caution' : 'text-railway-safe'
              }
            />
            <span className="text-sm font-medium text-foreground">Configuration Impact</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{impact?.message}</p>
        </div>
      )}
      {/* Safety Parameters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {safetyParameters?.map((param) => {
          const status = getParameterStatus(param?.key, config?.[param?.key], param);
          
          return (
            <div key={param?.key} className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">{param?.label}</h4>
                    {param?.critical && (
                      <Icon name="AlertTriangle" size={14} className="text-railway-caution" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{param?.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-foreground">
                    {config?.[param?.key]} {param?.unit}
                  </div>
                  <div className={`text-xs ${status?.color}`}>
                    {status?.status}
                  </div>
                </div>
              </div>
              {/* Slider */}
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="range"
                    min={param?.min}
                    max={param?.max}
                    step={param?.step}
                    value={config?.[param?.key]}
                    onChange={(e) => handleSliderChange(param?.key, e?.target?.value)}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{param?.min} {param?.unit}</span>
                    <span>{param?.max} {param?.unit}</span>
                  </div>
                </div>

                {/* Direct Input */}
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    min={param?.min}
                    max={param?.max}
                    step={param?.step}
                    value={config?.[param?.key]}
                    onChange={(e) => handleParameterChange(param?.key, e?.target?.value)}
                    className="w-24"
                  />
                  <span className="text-sm text-muted-foreground">{param?.unit}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Configuration Summary */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="font-medium text-foreground mb-4">Configuration Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-railway-danger">
              {safetyParameters?.filter(p => p?.critical)?.length}
            </div>
            <div className="text-sm text-muted-foreground">Critical Parameters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-railway-caution">
              {safetyParameters?.filter(p => !p?.critical)?.length}
            </div>
            <div className="text-sm text-muted-foreground">Standard Parameters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {new Date()?.toLocaleDateString()}
            </div>
            <div className="text-sm text-muted-foreground">Last Updated</div>
          </div>
        </div>
      </div>
      {/* Help Section */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
          <div>
            <h5 className="font-medium text-foreground">Safety Configuration Guidelines</h5>
            <p className="text-sm text-muted-foreground mt-1">
              Critical parameters (marked with ⚠️) directly affect train safety and require careful consideration. 
              Changes to these values should be reviewed by safety personnel before implementation.
            </p>
            <Button
              variant="link"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
              className="mt-2 p-0 h-auto"
            >
              View Safety Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyConfigurationTab;