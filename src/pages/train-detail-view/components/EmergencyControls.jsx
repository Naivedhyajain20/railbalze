import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EmergencyControls = ({ train, onEmergencyAction }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [priorityLevel, setPriorityLevel] = useState(train?.priority);
  const [emergencyReason, setEmergencyReason] = useState('');
  const [customDelay, setCustomDelay] = useState('');

  const emergencyActions = [
    {
      id: 'emergency-stop',
      title: 'Emergency Stop',
      description: 'Immediately halt the train at current location',
      icon: 'StopCircle',
      color: 'text-railway-danger',
      bgColor: 'bg-railway-danger/10',
      borderColor: 'border-railway-danger/20',
      requiresReason: true,
      severity: 'critical'
    },
    {
      id: 'priority-boost',
      title: 'Priority Override',
      description: 'Increase train priority for faster routing',
      icon: 'ArrowUp',
      color: 'text-railway-caution',
      bgColor: 'bg-railway-caution/10',
      borderColor: 'border-railway-caution/20',
      requiresReason: false,
      severity: 'medium'
    },
    {
      id: 'route-divert',
      title: 'Route Diversion',
      description: 'Redirect train to alternative route',
      icon: 'GitBranch',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      requiresReason: true,
      severity: 'medium'
    },
    {
      id: 'maintenance-mode',
      title: 'Maintenance Mode',
      description: 'Switch train to maintenance status',
      icon: 'Wrench',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20',
      requiresReason: true,
      severity: 'low'
    }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'critical', label: 'Critical Priority' }
  ];

  const reasonOptions = [
    { value: 'safety-concern', label: 'Safety Concern' },
    { value: 'mechanical-issue', label: 'Mechanical Issue' },
    { value: 'track-obstruction', label: 'Track Obstruction' },
    { value: 'weather-conditions', label: 'Weather Conditions' },
    { value: 'passenger-emergency', label: 'Passenger Emergency' },
    { value: 'signal-failure', label: 'Signal Failure' },
    { value: 'operational-requirement', label: 'Operational Requirement' },
    { value: 'other', label: 'Other (specify)' }
  ];

  const handleActionClick = (action) => {
    setShowConfirmDialog(action);
    setEmergencyReason('');
  };

  const handleConfirmAction = async () => {
    if (!showConfirmDialog) return;

    setActionLoading(showConfirmDialog?.id);
    
    try {
      await onEmergencyAction({
        actionId: showConfirmDialog?.id,
        trainId: train?.id,
        reason: emergencyReason,
        priority: priorityLevel,
        customDelay: customDelay,
        timestamp: new Date()?.toISOString()
      });
      
      setShowConfirmDialog(null);
      setEmergencyReason('');
      setCustomDelay('');
    } catch (error) {
      console.error('Emergency action failed:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handlePriorityChange = async (newPriority) => {
    setPriorityLevel(newPriority);
    
    try {
      await onEmergencyAction({
        actionId: 'priority-change',
        trainId: train?.id,
        priority: newPriority,
        timestamp: new Date()?.toISOString()
      });
    } catch (error) {
      console.error('Priority change failed:', error);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Shield" size={20} />
          <span>Emergency Controls</span>
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-railway-safe rounded-full"></div>
          <span className="text-sm text-muted-foreground">System Active</span>
        </div>
      </div>
      {/* Priority Control */}
      <div className="mb-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Flag" size={16} />
            <span>Train Priority</span>
          </h3>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            priorityLevel === 'critical' ? 'bg-railway-danger/10 text-railway-danger' :
            priorityLevel === 'high' ? 'bg-railway-caution/10 text-railway-caution' :
            priorityLevel === 'medium'? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
          }`}>
            {priorityLevel?.toUpperCase()}
          </span>
        </div>
        
        <Select
          options={priorityOptions}
          value={priorityLevel}
          onChange={handlePriorityChange}
          placeholder="Select priority level"
          className="w-full"
        />
      </div>
      {/* Emergency Actions */}
      <div className="space-y-3">
        <h3 className="font-medium text-foreground mb-3">Emergency Actions</h3>
        
        {emergencyActions?.map((action) => (
          <div
            key={action?.id}
            className={`border rounded-lg p-4 transition-all duration-200 ${action?.bgColor} ${action?.borderColor}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name={action?.icon} size={20} className={action?.color} />
                <div>
                  <h4 className="font-medium text-foreground">{action?.title}</h4>
                  <p className="text-sm text-muted-foreground">{action?.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  action?.severity === 'critical' ? 'bg-railway-danger/20 text-railway-danger' :
                  action?.severity === 'medium'? 'bg-railway-caution/20 text-railway-caution' : 'bg-muted text-muted-foreground'
                }`}>
                  {action?.severity?.toUpperCase()}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleActionClick(action)}
                  loading={actionLoading === action?.id}
                  className={`${action?.color} border-current hover:bg-current/10`}
                >
                  Execute
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="font-medium text-foreground mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Pause"
            iconPosition="left"
            className="text-railway-caution border-railway-caution/20 hover:bg-railway-caution/10"
          >
            Hold Signal
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            className="text-primary border-primary/20 hover:bg-primary/10"
          >
            Reset Status
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="MessageSquare"
            iconPosition="left"
            className="text-secondary border-secondary/20 hover:bg-secondary/10"
          >
            Contact Driver
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="AlertTriangle"
            iconPosition="left"
            className="text-railway-danger border-railway-danger/20 hover:bg-railway-danger/10"
          >
            Alert Control
          </Button>
        </div>
      </div>
      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full animate-fade-in">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name={showConfirmDialog?.icon} size={24} className={showConfirmDialog?.color} />
              <h3 className="text-lg font-semibold text-foreground">
                Confirm {showConfirmDialog?.title}
              </h3>
            </div>
            
            <p className="text-muted-foreground mb-4">
              Are you sure you want to execute "{showConfirmDialog?.title}" for Train {train?.number}?
              This action cannot be undone.
            </p>

            {showConfirmDialog?.requiresReason && (
              <div className="space-y-3 mb-4">
                <Select
                  label="Reason for Action"
                  options={reasonOptions}
                  value={emergencyReason}
                  onChange={setEmergencyReason}
                  placeholder="Select reason..."
                  required
                />
                
                {emergencyReason === 'other' && (
                  <Input
                    label="Specify Reason"
                    type="text"
                    placeholder="Enter specific reason..."
                    value={customDelay}
                    onChange={(e) => setCustomDelay(e?.target?.value)}
                    required
                  />
                )}
              </div>
            )}

            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(null)}
              >
                Cancel
              </Button>
              
              <Button
                variant="destructive"
                onClick={handleConfirmAction}
                loading={actionLoading === showConfirmDialog?.id}
                disabled={showConfirmDialog?.requiresReason && !emergencyReason}
              >
                Confirm Action
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyControls;