import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceCharts = ({ train }) => {
  const [activeChart, setActiveChart] = useState('delay');
  const [timeRange, setTimeRange] = useState('24h');

  // Mock historical data
  const delayData = [
    { time: '00:00', delay: 0, scheduled: 0 },
    { time: '02:00', delay: 2, scheduled: 0 },
    { time: '04:00', delay: 5, scheduled: 0 },
    { time: '06:00', delay: 3, scheduled: 0 },
    { time: '08:00', delay: 8, scheduled: 0 },
    { time: '10:00', delay: 12, scheduled: 0 },
    { time: '12:00', delay: 15, scheduled: 0 },
    { time: '14:00', delay: 18, scheduled: 0 },
    { time: '16:00', delay: 22, scheduled: 0 },
    { time: '18:00', delay: 19, scheduled: 0 },
    { time: '20:00', delay: 16, scheduled: 0 },
    { time: '22:00', delay: 13, scheduled: 0 }
  ];

  const speedData = [
    { time: '00:00', speed: 85, maxSpeed: 120 },
    { time: '02:00', speed: 92, maxSpeed: 120 },
    { time: '04:00', speed: 78, maxSpeed: 120 },
    { time: '06:00', speed: 88, maxSpeed: 120 },
    { time: '08:00', speed: 95, maxSpeed: 120 },
    { time: '10:00', speed: 82, maxSpeed: 120 },
    { time: '12:00', speed: 76, maxSpeed: 120 },
    { time: '14:00', speed: 89, maxSpeed: 120 },
    { time: '16:00', speed: 93, maxSpeed: 120 },
    { time: '18:00', speed: 87, maxSpeed: 120 },
    { time: '20:00', speed: 91, maxSpeed: 120 },
    { time: '22:00', speed: 86, maxSpeed: 120 }
  ];

  const occupancyData = [
    { time: '00:00', occupancy: 45, capacity: 100 },
    { time: '02:00', occupancy: 38, capacity: 100 },
    { time: '04:00', occupancy: 42, capacity: 100 },
    { time: '06:00', occupancy: 68, capacity: 100 },
    { time: '08:00', occupancy: 85, capacity: 100 },
    { time: '10:00', occupancy: 92, capacity: 100 },
    { time: '12:00', occupancy: 88, capacity: 100 },
    { time: '14:00', occupancy: 76, capacity: 100 },
    { time: '16:00', occupancy: 82, capacity: 100 },
    { time: '18:00', occupancy: 95, capacity: 100 },
    { time: '20:00', occupancy: 78, capacity: 100 },
    { time: '22:00', occupancy: 65, capacity: 100 }
  ];

  const chartConfigs = {
    delay: {
      title: 'Delay Trends',
      icon: 'Clock',
      data: delayData,
      color: '#D97706',
      description: 'Historical delay patterns over time'
    },
    speed: {
      title: 'Speed Performance',
      icon: 'Gauge',
      data: speedData,
      color: '#0EA5E9',
      description: 'Speed variations and performance metrics'
    },
    occupancy: {
      title: 'Passenger Occupancy',
      icon: 'Users',
      data: occupancyData,
      color: '#059669',
      description: 'Passenger load throughout the journey'
    }
  };

  const timeRangeOptions = [
    { value: '6h', label: '6 Hours' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-foreground mb-2">{`Time: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}${activeChart === 'speed' ? ' km/h' : activeChart === 'occupancy' ? '%' : ' min'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const config = chartConfigs?.[activeChart];
    
    switch (activeChart) {
      case 'delay':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={config?.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="delay" 
                stroke={config?.color} 
                strokeWidth={2}
                dot={{ fill: config?.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: config?.color, strokeWidth: 2 }}
                name="Delay"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'speed':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={config?.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="speed" 
                stroke={config?.color} 
                fill={`${config?.color}20`}
                strokeWidth={2}
                name="Speed"
              />
              <Line 
                type="monotone" 
                dataKey="maxSpeed" 
                stroke="var(--color-muted-foreground)" 
                strokeDasharray="5 5"
                strokeWidth={1}
                name="Max Speed"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'occupancy':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={config?.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="occupancy" 
                fill={config?.color}
                radius={[2, 2, 0, 0]}
                name="Occupancy"
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} />
          <span>Performance Analytics</span>
        </h2>
        
        <div className="flex items-center space-x-2">
          {timeRangeOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={timeRange === option?.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(option?.value)}
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Chart Type Selector */}
      <div className="flex items-center space-x-1 mb-6 bg-muted rounded-lg p-1">
        {Object.entries(chartConfigs)?.map(([key, config]) => (
          <Button
            key={key}
            variant={activeChart === key ? "default" : "ghost"}
            size="sm"
            iconName={config?.icon}
            iconPosition="left"
            onClick={() => setActiveChart(key)}
            className="flex-1"
          >
            {config?.title}
          </Button>
        ))}
      </div>
      {/* Chart Description */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          {chartConfigs?.[activeChart]?.description}
        </p>
      </div>
      {/* Chart Container */}
      <div className="bg-background/50 rounded-lg p-4">
        {renderChart()}
      </div>
      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-railway-safe" />
            <span className="text-sm font-medium text-muted-foreground">Average Performance</span>
          </div>
          <p className="text-lg font-semibold text-foreground">
            {activeChart === 'delay' ? '12.5 min' : 
             activeChart === 'speed' ? '87.2 km/h' : '72.3%'}
          </p>
          <p className="text-xs text-muted-foreground">
            {activeChart === 'delay' ? 'delay' : 
             activeChart === 'speed' ? 'avg speed' : 'occupancy'}
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Best Performance</span>
          </div>
          <p className="text-lg font-semibold text-foreground">
            {activeChart === 'delay' ? '0 min' : 
             activeChart === 'speed' ? '95 km/h' : '95%'}
          </p>
          <p className="text-xs text-muted-foreground">
            {activeChart === 'delay' ? 'minimum delay' : 
             activeChart === 'speed' ? 'peak speed' : 'max occupancy'}
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-railway-caution" />
            <span className="text-sm font-medium text-muted-foreground">Needs Attention</span>
          </div>
          <p className="text-lg font-semibold text-foreground">
            {activeChart === 'delay' ? '22 min' : 
             activeChart === 'speed' ? '76 km/h' : '42%'}
          </p>
          <p className="text-xs text-muted-foreground">
            {activeChart === 'delay' ? 'max delay' : 
             activeChart === 'speed' ? 'min speed' : 'min occupancy'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCharts;