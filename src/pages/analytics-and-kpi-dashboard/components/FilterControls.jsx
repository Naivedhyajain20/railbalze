import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ onFiltersChange, isLoading = false }) => {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedRoute, setSelectedRoute] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showCustomRange, setShowCustomRange] = useState(false);

  const dateRangeOptions = [
    { value: '1d', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 3 Months' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const routeOptions = [
    { value: 'all', label: 'All Routes' },
    { value: 'mumbai-delhi', label: 'Mumbai-Delhi Corridor' },
    { value: 'chennai-bangalore', label: 'Chennai-Bangalore Line' },
    { value: 'kolkata-howrah', label: 'Kolkata-Howrah Section' },
    { value: 'pune-nashik', label: 'Pune-Nashik Route' },
    { value: 'hyderabad-vijayawada', label: 'Hyderabad-Vijayawada' }
  ];

  const metricOptions = [
    { value: 'all', label: 'All Metrics' },
    { value: 'throughput', label: 'Throughput Only' },
    { value: 'delays', label: 'Delay Analysis' },
    { value: 'utilization', label: 'Track Utilization' },
    { value: 'safety', label: 'Safety Metrics' },
    { value: 'efficiency', label: 'Operational Efficiency' }
  ];

  const handleDateRangeChange = (value) => {
    setDateRange(value);
    setShowCustomRange(value === 'custom');
    
    if (value !== 'custom') {
      applyFilters({
        dateRange: value,
        route: selectedRoute,
        metric: selectedMetric
      });
    }
  };

  const handleCustomDateApply = () => {
    if (customStartDate && customEndDate) {
      applyFilters({
        dateRange: 'custom',
        customStartDate,
        customEndDate,
        route: selectedRoute,
        metric: selectedMetric
      });
    }
  };

  const applyFilters = (filters) => {
    onFiltersChange?.(filters);
  };

  const handleRouteChange = (value) => {
    setSelectedRoute(value);
    applyFilters({
      dateRange,
      customStartDate: dateRange === 'custom' ? customStartDate : undefined,
      customEndDate: dateRange === 'custom' ? customEndDate : undefined,
      route: value,
      metric: selectedMetric
    });
  };

  const handleMetricChange = (value) => {
    setSelectedMetric(value);
    applyFilters({
      dateRange,
      customStartDate: dateRange === 'custom' ? customStartDate : undefined,
      customEndDate: dateRange === 'custom' ? customEndDate : undefined,
      route: selectedRoute,
      metric: value
    });
  };

  const handleReset = () => {
    setDateRange('7d');
    setSelectedRoute('all');
    setSelectedMetric('all');
    setCustomStartDate('');
    setCustomEndDate('');
    setShowCustomRange(false);
    
    applyFilters({
      dateRange: '7d',
      route: 'all',
      metric: 'all'
    });
  };

  const handleExport = () => {
    // Mock export functionality
    const exportData = {
      dateRange,
      route: selectedRoute,
      metric: selectedMetric,
      timestamp: new Date()?.toISOString()
    };
    
    console.log('Exporting data with filters:', exportData);
    // In real app, this would trigger actual export
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Primary Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 flex-1">
          <div className="min-w-0 flex-1 sm:max-w-48">
            <Select
              label="Time Period"
              options={dateRangeOptions}
              value={dateRange}
              onChange={handleDateRangeChange}
              disabled={isLoading}
            />
          </div>
          
          <div className="min-w-0 flex-1 sm:max-w-48">
            <Select
              label="Route"
              options={routeOptions}
              value={selectedRoute}
              onChange={handleRouteChange}
              disabled={isLoading}
            />
          </div>
          
          <div className="min-w-0 flex-1 sm:max-w-48">
            <Select
              label="Metrics"
              options={metricOptions}
              value={selectedMetric}
              onChange={handleMetricChange}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={isLoading}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
          >
            Reset
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={isLoading}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export
          </Button>
        </div>
      </div>
      {/* Custom Date Range */}
      {showCustomRange && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-end space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 sm:max-w-48">
              <Input
                label="Start Date"
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e?.target?.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="flex-1 sm:max-w-48">
              <Input
                label="End Date"
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e?.target?.value)}
                disabled={isLoading}
              />
            </div>
            
            <Button
              variant="default"
              size="sm"
              onClick={handleCustomDateApply}
              disabled={isLoading || !customStartDate || !customEndDate}
              iconName="Calendar"
              iconPosition="left"
              iconSize={16}
            >
              Apply Range
            </Button>
          </div>
        </div>
      )}
      {/* Quick Filters */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Filter" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Quick Filters:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => handleMetricChange('delays')}
            className={selectedMetric === 'delays' ? 'bg-primary/10 border-primary' : ''}
          >
            High Delays
          </Button>
          
          <Button
            variant="outline"
            size="xs"
            onClick={() => handleRouteChange('mumbai-delhi')}
            className={selectedRoute === 'mumbai-delhi' ? 'bg-primary/10 border-primary' : ''}
          >
            Main Corridor
          </Button>
          
          <Button
            variant="outline"
            size="xs"
            onClick={() => handleDateRangeChange('1d')}
            className={dateRange === '1d' ? 'bg-primary/10 border-primary' : ''}
          >
            Today
          </Button>
          
          <Button
            variant="outline"
            size="xs"
            onClick={() => handleMetricChange('safety')}
            className={selectedMetric === 'safety' ? 'bg-primary/10 border-primary' : ''}
          >
            Safety Critical
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;