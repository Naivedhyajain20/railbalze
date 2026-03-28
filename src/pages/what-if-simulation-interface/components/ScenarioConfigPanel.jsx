import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ScenarioConfigPanel = ({ onScenarioChange, activeScenario }) => {
  const [expandedSection, setExpandedSection] = useState('delays');
  const [delayConfig, setDelayConfig] = useState({
    trainId: '',
    delayDuration: 15,
    startTime: '10:30',
    reason: 'signal'
  });
  const [closureConfig, setClosureConfig] = useState({
    trackSection: '',
    startTime: '11:00',
    duration: 60,
    reason: 'maintenance'
  });
  const [unscheduledConfig, setUnscheduledConfig] = useState({
    trainType: 'freight',
    origin: '',
    destination: '',
    departureTime: '12:00',
    priority: 'medium'
  });

  const trainOptions = [
    { value: 'T001', label: '12345 - Express Mumbai' },
    { value: 'T002', label: '67890 - Delhi Express' },
    { value: 'T003', label: '11111 - Local Service' },
    { value: 'T004', label: '22222 - Freight 001' },
    { value: 'T005', label: '33333 - Night Express' }
  ];

  const trackSectionOptions = [
    { value: 'SEC001', label: 'Mumbai-Pune Section A' },
    { value: 'SEC002', label: 'Delhi-Agra Section B' },
    { value: 'SEC003', label: 'Chennai-Bangalore Section C' },
    { value: 'SEC004', label: 'Kolkata-Howrah Section D' }
  ];

  const delayReasonOptions = [
    { value: 'signal', label: 'Signal Failure' },
    { value: 'weather', label: 'Weather Conditions' },
    { value: 'mechanical', label: 'Mechanical Issue' },
    { value: 'passenger', label: 'Passenger Incident' },
    { value: 'freight', label: 'Freight Delay' }
  ];

  const closureReasonOptions = [
    { value: 'maintenance', label: 'Scheduled Maintenance' },
    { value: 'emergency', label: 'Emergency Repair' },
    { value: 'construction', label: 'Track Construction' },
    { value: 'inspection', label: 'Safety Inspection' }
  ];

  const trainTypeOptions = [
    { value: 'passenger', label: 'Passenger Train' },
    { value: 'freight', label: 'Freight Train' },
    { value: 'express', label: 'Express Service' },
    { value: 'local', label: 'Local Service' }
  ];

  const stationOptions = [
    { value: 'MUM', label: 'Mumbai Central' },
    { value: 'DEL', label: 'New Delhi' },
    { value: 'CHE', label: 'Chennai Central' },
    { value: 'KOL', label: 'Kolkata' },
    { value: 'BAN', label: 'Bangalore' }
  ];

  const priorityOptions = [
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const handleSectionToggle = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleDelayConfigChange = (field, value) => {
    const newConfig = { ...delayConfig, [field]: value };
    setDelayConfig(newConfig);
    onScenarioChange('delay', newConfig);
  };

  const handleClosureConfigChange = (field, value) => {
    const newConfig = { ...closureConfig, [field]: value };
    setClosureConfig(newConfig);
    onScenarioChange('closure', newConfig);
  };

  const handleUnscheduledConfigChange = (field, value) => {
    const newConfig = { ...unscheduledConfig, [field]: value };
    setUnscheduledConfig(newConfig);
    onScenarioChange('unscheduled', newConfig);
  };

  const handleApplyScenario = () => {
    const scenario = {
      type: expandedSection,
      config: expandedSection === 'delays' ? delayConfig : 
              expandedSection === 'closures' ? closureConfig : unscheduledConfig,
      timestamp: new Date()?.toISOString()
    };
    onScenarioChange('apply', scenario);
  };

  const handleResetScenario = () => {
    setDelayConfig({
      trainId: '',
      delayDuration: 15,
      startTime: '10:30',
      reason: 'signal'
    });
    setClosureConfig({
      trackSection: '',
      startTime: '11:00',
      duration: 60,
      reason: 'maintenance'
    });
    setUnscheduledConfig({
      trainType: 'freight',
      origin: '',
      destination: '',
      departureTime: '12:00',
      priority: 'medium'
    });
    onScenarioChange('reset', null);
  };

  return (
    <div className="h-full bg-surface border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Scenario Configuration</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Model operational scenarios and assess impacts
        </p>
      </div>
      {/* Configuration Sections */}
      <div className="flex-1 overflow-y-auto">
        {/* Delay Modeling */}
        <div className="border-b border-border">
          <button
            onClick={() => handleSectionToggle('delays')}
            className="w-full p-4 text-left hover:bg-muted transition-colors duration-150 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={18} className="text-railway-caution" />
              <div>
                <h3 className="font-medium text-foreground">Train Delays</h3>
                <p className="text-sm text-muted-foreground">Model delay scenarios</p>
              </div>
            </div>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`text-muted-foreground transition-transform duration-200 ${
                expandedSection === 'delays' ? 'rotate-180' : ''
              }`} 
            />
          </button>
          
          {expandedSection === 'delays' && (
            <div className="p-4 bg-muted/30 space-y-4">
              <Select
                label="Select Train"
                options={trainOptions}
                value={delayConfig?.trainId}
                onChange={(value) => handleDelayConfigChange('trainId', value)}
                placeholder="Choose a train..."
                required
              />
              
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Delay Duration (min)"
                  type="number"
                  value={delayConfig?.delayDuration}
                  onChange={(e) => handleDelayConfigChange('delayDuration', parseInt(e?.target?.value))}
                  min="1"
                  max="180"
                />
                
                <Input
                  label="Start Time"
                  type="time"
                  value={delayConfig?.startTime}
                  onChange={(e) => handleDelayConfigChange('startTime', e?.target?.value)}
                />
              </div>
              
              <Select
                label="Delay Reason"
                options={delayReasonOptions}
                value={delayConfig?.reason}
                onChange={(value) => handleDelayConfigChange('reason', value)}
              />
            </div>
          )}
        </div>

        {/* Track Closures */}
        <div className="border-b border-border">
          <button
            onClick={() => handleSectionToggle('closures')}
            className="w-full p-4 text-left hover:bg-muted transition-colors duration-150 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <Icon name="XCircle" size={18} className="text-railway-danger" />
              <div>
                <h3 className="font-medium text-foreground">Track Closures</h3>
                <p className="text-sm text-muted-foreground">Simulate track blockages</p>
              </div>
            </div>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`text-muted-foreground transition-transform duration-200 ${
                expandedSection === 'closures' ? 'rotate-180' : ''
              }`} 
            />
          </button>
          
          {expandedSection === 'closures' && (
            <div className="p-4 bg-muted/30 space-y-4">
              <Select
                label="Track Section"
                options={trackSectionOptions}
                value={closureConfig?.trackSection}
                onChange={(value) => handleClosureConfigChange('trackSection', value)}
                placeholder="Select track section..."
                required
              />
              
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Start Time"
                  type="time"
                  value={closureConfig?.startTime}
                  onChange={(e) => handleClosureConfigChange('startTime', e?.target?.value)}
                />
                
                <Input
                  label="Duration (min)"
                  type="number"
                  value={closureConfig?.duration}
                  onChange={(e) => handleClosureConfigChange('duration', parseInt(e?.target?.value))}
                  min="15"
                  max="480"
                />
              </div>
              
              <Select
                label="Closure Reason"
                options={closureReasonOptions}
                value={closureConfig?.reason}
                onChange={(value) => handleClosureConfigChange('reason', value)}
              />
            </div>
          )}
        </div>

        {/* Unscheduled Trains */}
        <div className="border-b border-border">
          <button
            onClick={() => handleSectionToggle('unscheduled')}
            className="w-full p-4 text-left hover:bg-muted transition-colors duration-150 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <Icon name="Plus" size={18} className="text-primary" />
              <div>
                <h3 className="font-medium text-foreground">Unscheduled Trains</h3>
                <p className="text-sm text-muted-foreground">Add emergency services</p>
              </div>
            </div>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`text-muted-foreground transition-transform duration-200 ${
                expandedSection === 'unscheduled' ? 'rotate-180' : ''
              }`} 
            />
          </button>
          
          {expandedSection === 'unscheduled' && (
            <div className="p-4 bg-muted/30 space-y-4">
              <Select
                label="Train Type"
                options={trainTypeOptions}
                value={unscheduledConfig?.trainType}
                onChange={(value) => handleUnscheduledConfigChange('trainType', value)}
              />
              
              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Origin"
                  options={stationOptions}
                  value={unscheduledConfig?.origin}
                  onChange={(value) => handleUnscheduledConfigChange('origin', value)}
                  placeholder="Select origin..."
                />
                
                <Select
                  label="Destination"
                  options={stationOptions}
                  value={unscheduledConfig?.destination}
                  onChange={(value) => handleUnscheduledConfigChange('destination', value)}
                  placeholder="Select destination..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Departure Time"
                  type="time"
                  value={unscheduledConfig?.departureTime}
                  onChange={(e) => handleUnscheduledConfigChange('departureTime', e?.target?.value)}
                />
                
                <Select
                  label="Priority"
                  options={priorityOptions}
                  value={unscheduledConfig?.priority}
                  onChange={(value) => handleUnscheduledConfigChange('priority', value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="default"
          fullWidth
          onClick={handleApplyScenario}
          iconName="Play"
          iconPosition="left"
          disabled={!expandedSection}
        >
          Apply Scenario
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          onClick={handleResetScenario}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset Configuration
        </Button>
      </div>
    </div>
  );
};

export default ScenarioConfigPanel;