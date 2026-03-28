import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const KPISummaryBar = ({ isVisible = true }) => {
  const [kpiData, setKpiData] = useState({});
  const [timeRange, setTimeRange] = useState('today');
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock KPI data
  useEffect(() => {
    const mockData = {
      today: {
        throughput: {
          value: 847,
          change: +12,
          trend: 'up',
          target: 900,
          unit: 'trains'
        },
        avgDelay: {
          value: 4.2,
          change: -1.8,
          trend: 'down',
          target: 3.0,
          unit: 'minutes'
        },
        trackUtilization: {
          value: 78.5,
          change: +5.2,
          trend: 'up',
          target: 85.0,
          unit: '%'
        },
        onTimePerformance: {
          value: 94.3,
          change: +2.1,
          trend: 'up',
          target: 95.0,
          unit: '%'
        },
        safetyScore: {
          value: 99.8,
          change: 0,
          trend: 'stable',
          target: 99.9,
          unit: '%'
        },
        energyEfficiency: {
          value: 87.2,
          change: +3.4,
          trend: 'up',
          target: 90.0,
          unit: '%'
        }
      },
      week: {
        throughput: {
          value: 5894,
          change: +234,
          trend: 'up',
          target: 6300,
          unit: 'trains'
        },
        avgDelay: {
          value: 5.1,
          change: -0.9,
          trend: 'down',
          target: 3.0,
          unit: 'minutes'
        },
        trackUtilization: {
          value: 76.8,
          change: +2.3,
          trend: 'up',
          target: 85.0,
          unit: '%'
        },
        onTimePerformance: {
          value: 92.7,
          change: +1.4,
          trend: 'up',
          target: 95.0,
          unit: '%'
        },
        safetyScore: {
          value: 99.6,
          change: -0.1,
          trend: 'down',
          target: 99.9,
          unit: '%'
        },
        energyEfficiency: {
          value: 85.9,
          change: +1.8,
          trend: 'up',
          target: 90.0,
          unit: '%'
        }
      }
    };

    setKpiData(mockData?.[timeRange] || mockData?.today);
  }, [timeRange]);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      case 'stable':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend, isPositive = true) => {
    if (trend === 'stable') return 'text-muted-foreground';
    
    const isGoodTrend = (trend === 'up' && isPositive) || (trend === 'down' && !isPositive);
    return isGoodTrend ? 'text-railway-safe' : 'text-railway-caution';
  };

  const getProgressColor = (value, target) => {
    const percentage = (value / target) * 100;
    if (percentage >= 95) return 'bg-railway-safe';
    if (percentage >= 80) return 'bg-railway-caution';
    return 'bg-railway-danger';
  };

  const formatValue = (value, unit) => {
    if (unit === '%') return `${value}${unit}`;
    if (unit === 'trains') return value?.toLocaleString();
    if (unit === 'minutes') return `${value}${unit}`;
    return `${value}${unit}`;
  };

  const renderKPICard = (key, data, title, icon, isPositiveTrend = true) => {
    const progressPercentage = Math.min((data?.value / data?.target) * 100, 100);
    
    return (
      <div key={key} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon name={icon} size={16} className="text-primary" />
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
          </div>
          <Icon 
            name={getTrendIcon(data?.trend)} 
            size={14} 
            className={getTrendColor(data?.trend, isPositiveTrend)} 
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground">
              {formatValue(data?.value, data?.unit)}
            </span>
            <div className="flex items-center space-x-1 text-xs">
              <span className={getTrendColor(data?.trend, isPositiveTrend)}>
                {data?.change > 0 ? '+' : ''}{data?.change}
              </span>
              <span className="text-muted-foreground">vs {timeRange === 'today' ? 'yesterday' : 'last week'}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Target: {formatValue(data?.target, data?.unit)}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor(data?.value, data?.target)}`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const primaryKPIs = {
    throughput: { title: 'Daily Throughput', icon: 'BarChart3', isPositive: true },
    avgDelay: { title: 'Avg Delay', icon: 'Clock', isPositive: false },
    trackUtilization: { title: 'Track Utilization', icon: 'Activity', isPositive: true },
    onTimePerformance: { title: 'On-Time Performance', icon: 'Target', isPositive: true }
  };

  const secondaryKPIs = {
    safetyScore: { title: 'Safety Score', icon: 'Shield', isPositive: true },
    energyEfficiency: { title: 'Energy Efficiency', icon: 'Zap', isPositive: true }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border shadow-lg z-[800] transition-all duration-300">
      {/* Main KPI Bar */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="BarChart3" size={20} className="text-primary" />
              <h2 className="font-semibold text-foreground">Performance Overview</h2>
            </div>
            
            <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
              <Button
                variant={timeRange === 'today' ? 'default' : 'ghost'}
                size="xs"
                onClick={() => setTimeRange('today')}
                className="px-3 py-1"
              >
                Today
              </Button>
              <Button
                variant={timeRange === 'week' ? 'default' : 'ghost'}
                size="xs"
                onClick={() => setTimeRange('week')}
                className="px-3 py-1"
              >
                This Week
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-railway-safe rounded-full animate-pulse"></div>
              <span>Live Data</span>
            </div>
            
            <Button
              variant="ghost"
              size="xs"
              iconName={isExpanded ? "ChevronDown" : "ChevronUp"}
              iconSize={16}
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-2 py-1"
            />
          </div>
        </div>

        {/* Primary KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(primaryKPIs)?.map(([key, config]) => 
            kpiData?.[key] && renderKPICard(key, kpiData?.[key], config?.title, config?.icon, config?.isPositive)
          )}
        </div>

        {/* Expanded Secondary KPIs */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {Object.entries(secondaryKPIs)?.map(([key, config]) => 
                kpiData?.[key] && renderKPICard(key, kpiData?.[key], config?.title, config?.icon, config?.isPositive)
              )}
              
              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-4 flex flex-col justify-center">
                <h3 className="text-sm font-medium text-foreground mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="xs"
                    iconName="FileText"
                    iconPosition="left"
                    iconSize={12}
                    fullWidth
                    className="justify-start"
                  >
                    Generate Report
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    iconName="Settings"
                    iconPosition="left"
                    iconSize={12}
                    fullWidth
                    className="justify-start"
                  >
                    Adjust Targets
                  </Button>
                </div>
              </div>
              
              {/* System Status */}
              <div className="bg-card border border-border rounded-lg p-4 flex flex-col justify-center">
                <h3 className="text-sm font-medium text-foreground mb-3">System Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">API Status</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-railway-safe rounded-full"></div>
                      <span className="text-railway-safe">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Data Sync</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-railway-safe rounded-full animate-pulse"></div>
                      <span className="text-railway-safe">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Last Update</span>
                    <span className="text-muted-foreground">{new Date()?.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPISummaryBar;