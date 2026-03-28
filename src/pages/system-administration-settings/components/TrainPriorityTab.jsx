import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import { Checkbox } from '../../../components/ui/Checkbox';

const TrainPriorityTab = () => {
  const [priorities, setPriorities] = useState([
    {
      id: 'P1',
      level: 1,
      name: 'Emergency Services',
      description: 'Emergency response and medical trains',
      color: '#DC2626',
      rules: ['Always override other trains', 'Immediate track clearance', 'No delay tolerance'],
      trainTypes: ['Emergency', 'Medical', 'Fire Response'],
      count: 2
    },
    {
      id: 'P2',
      level: 2,
      name: 'Express Passenger',
      description: 'High-speed passenger services',
      color: '#D97706',
      rules: ['Priority over freight', 'Minimal stops', 'Schedule adherence critical'],
      trainTypes: ['Express', 'High-Speed', 'Inter-city'],
      count: 8
    },
    {
      id: 'P3',
      level: 3,
      name: 'Regular Passenger',
      description: 'Standard passenger services',
      color: '#059669',
      rules: ['Standard scheduling', 'Normal delay tolerance', 'Passenger comfort priority'],
      trainTypes: ['Local', 'Regional', 'Suburban'],
      count: 15
    },
    {
      id: 'P4',
      level: 4,
      name: 'Priority Freight',
      description: 'Time-sensitive cargo',
      color: '#0EA5E9',
      rules: ['Scheduled delivery windows', 'Moderate delay tolerance', 'Route optimization'],
      trainTypes: ['Express Freight', 'Perishables', 'Mail'],
      count: 6
    },
    {
      id: 'P5',
      level: 5,
      name: 'Standard Freight',
      description: 'Regular cargo transport',
      color: '#64748B',
      rules: ['Flexible scheduling', 'High delay tolerance', 'Efficiency over speed'],
      trainTypes: ['Container', 'Bulk', 'General Freight'],
      count: 12
    }
  ]);

  const [draggedItem, setDraggedItem] = useState(null);
  const [automationRules, setAutomationRules] = useState({
    emergencyOverride: true,
    passengerPriority: true,
    freightOptimization: false,
    dynamicReordering: true,
    delayBasedAdjustment: true
  });

  const [showAddPriorityModal, setShowAddPriorityModal] = useState(false);

  const handleDragStart = (e, priority) => {
    setDraggedItem(priority);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetPriority) => {
    e?.preventDefault();
    
    if (!draggedItem || draggedItem?.id === targetPriority?.id) {
      setDraggedItem(null);
      return;
    }

    const newPriorities = [...priorities];
    const draggedIndex = newPriorities?.findIndex(p => p?.id === draggedItem?.id);
    const targetIndex = newPriorities?.findIndex(p => p?.id === targetPriority?.id);

    // Remove dragged item and insert at target position
    const [removed] = newPriorities?.splice(draggedIndex, 1);
    newPriorities?.splice(targetIndex, 0, removed);

    // Update levels based on new order
    const updatedPriorities = newPriorities?.map((priority, index) => ({
      ...priority,
      level: index + 1
    }));

    setPriorities(updatedPriorities);
    setDraggedItem(null);
  };

  const handleAutomationToggle = (rule) => {
    setAutomationRules(prev => ({
      ...prev,
      [rule]: !prev?.[rule]
    }));
  };

  const handleSavePriorities = () => {
    if (window.confirm('Are you sure you want to save the priority configuration? This will affect train scheduling immediately.')) {
      console.log('Saving priority configuration:', priorities);
      console.log('Automation rules:', automationRules);
    }
  };

  const getPriorityIcon = (level) => {
    switch (level) {
      case 1: return 'AlertTriangle';
      case 2: return 'Zap';
      case 3: return 'Users';
      case 4: return 'Package';
      case 5: return 'Truck';
      default: return 'Circle';
    }
  };

  const automationOptions = [
    {
      key: 'emergencyOverride',
      label: 'Emergency Override',
      description: 'Automatically prioritize emergency trains over all others'
    },
    {
      key: 'passengerPriority',
      label: 'Passenger Priority',
      description: 'Prioritize passenger trains during peak hours'
    },
    {
      key: 'freightOptimization',
      label: 'Freight Optimization',
      description: 'Optimize freight train scheduling for efficiency'
    },
    {
      key: 'dynamicReordering',
      label: 'Dynamic Reordering',
      description: 'Automatically adjust priorities based on delays'
    },
    {
      key: 'delayBasedAdjustment',
      label: 'Delay-Based Adjustment',
      description: 'Increase priority for significantly delayed trains'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Train Priority Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure train priority levels and automation rules
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            iconName="Plus"
            onClick={() => setShowAddPriorityModal(true)}
          >
            Add Priority Level
          </Button>
          <Button
            variant="default"
            iconName="Save"
            onClick={handleSavePriorities}
          >
            Save Configuration
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Levels */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">Priority Hierarchy</h4>
            <div className="text-sm text-muted-foreground">
              Drag to reorder priorities
            </div>
          </div>

          <div className="space-y-3">
            {priorities?.map((priority) => (
              <div
                key={priority?.id}
                draggable
                onDragStart={(e) => handleDragStart(e, priority)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, priority)}
                className={`bg-card rounded-lg border border-border p-4 cursor-move hover:shadow-md transition-all duration-200 ${
                  draggedItem?.id === priority?.id ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Priority Level */}
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: priority?.color }}
                    >
                      {priority?.level}
                    </div>
                    <Icon name={getPriorityIcon(priority?.level)} size={16} className="text-muted-foreground" />
                  </div>

                  {/* Priority Details */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-foreground">{priority?.name}</h5>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          {priority?.count} active trains
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Edit"
                          onClick={() => console.log('Edit priority:', priority?.id)}
                        />
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {priority?.description}
                    </p>

                    {/* Train Types */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {priority?.trainTypes?.map((type) => (
                        <span
                          key={type}
                          className="px-2 py-1 bg-muted text-xs rounded-md text-foreground"
                        >
                          {type}
                        </span>
                      ))}
                    </div>

                    {/* Rules */}
                    <div className="space-y-1">
                      {priority?.rules?.map((rule, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Icon name="Check" size={12} className="text-railway-safe" />
                          <span className="text-xs text-muted-foreground">{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Drag Handle */}
                  <div className="flex flex-col space-y-1">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automation Rules */}
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-foreground mb-4">Automation Rules</h4>
            <div className="space-y-4">
              {automationOptions?.map((option) => (
                <div key={option?.key} className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={automationRules?.[option?.key]}
                      onChange={() => handleAutomationToggle(option?.key)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground text-sm">
                        {option?.label}
                      </h5>
                      <p className="text-xs text-muted-foreground mt-1">
                        {option?.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Statistics */}
          <div className="bg-card rounded-lg border border-border p-4">
            <h4 className="font-medium text-foreground mb-4">Priority Statistics</h4>
            <div className="space-y-3">
              {priorities?.map((priority) => (
                <div key={priority?.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: priority?.color }}
                    ></div>
                    <span className="text-sm text-foreground">{priority?.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {priority?.count}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Total Active</span>
                <span className="text-sm font-bold text-primary">
                  {priorities?.reduce((sum, p) => sum + p?.count, 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-lg border border-border p-4">
            <h4 className="font-medium text-foreground mb-4">Quick Actions</h4>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                iconName="RotateCcw"
                fullWidth
                onClick={() => console.log('Reset to defaults')}
              >
                Reset to Defaults
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                fullWidth
                onClick={() => console.log('Export configuration')}
              >
                Export Configuration
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Upload"
                fullWidth
                onClick={() => console.log('Import configuration')}
              >
                Import Configuration
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainPriorityTab;