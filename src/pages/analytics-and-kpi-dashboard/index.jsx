import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import KPICard from './components/KPICard';
import FilterControls from './components/FilterControls';
import ThroughputChart from './components/ThroughputChart';
import DelayAnalysisChart from './components/DelayAnalysisChart';
import UtilizationHeatmap from './components/UtilizationHeatmap';
import PredictiveInsights from './components/PredictiveInsights';
import ExportControls from './components/ExportControls';

const AnalyticsAndKPIDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({
    dateRange: '7d',
    route: 'all',
    metric: 'all'
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock KPI data
  const kpiData = [
    {
      title: 'Train Throughput',
      value: '1,247',
      unit: 'trains/day',
      trend: 'up',
      trendValue: '+5.2%',
      icon: 'Train',
      color: 'primary',
      description: 'Daily average over selected period'
    },
    {
      title: 'Average Delay',
      value: '8.3',
      unit: 'minutes',
      trend: 'down',
      trendValue: '-12%',
      icon: 'Clock',
      color: 'success',
      description: 'Improvement from last period'
    },
    {
      title: 'Track Utilization',
      value: '87.5',
      unit: '%',
      trend: 'up',
      trendValue: '+2.1%',
      icon: 'Activity',
      color: 'warning',
      description: 'Peak utilization rate'
    },
    {
      title: 'Safety Score',
      value: '96.2',
      unit: '%',
      trend: 'up',
      trendValue: '+0.8%',
      icon: 'Shield',
      color: 'success',
      description: 'Compliance with safety protocols'
    },
    {
      title: 'On-Time Performance',
      value: '94.7',
      unit: '%',
      trend: 'up',
      trendValue: '+3.5%',
      icon: 'CheckCircle',
      color: 'success',
      description: 'Trains arriving within 5 minutes'
    },
    {
      title: 'Energy Efficiency',
      value: '92.1',
      unit: '%',
      trend: 'down',
      trendValue: '-1.2%',
      icon: 'Zap',
      color: 'warning',
      description: 'Power consumption optimization'
    }
  ];

  // Add mock data for chart components
  const mockThroughputData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Train Throughput',
      data: [1200, 1250, 1180, 1300, 1247, 1150, 1100]
    }]
  };

  const mockDelayData = {
    labels: ['Route A', 'Route B', 'Route C', 'Route D'],
    datasets: [{
      label: 'Average Delay (minutes)',
      data: [8.3, 6.7, 9.2, 7.8]
    }]
  };

  const mockUtilizationData = {
    tracks: ['Track 1', 'Track 2', 'Track 3', 'Track 4'],
    timeSlots: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
    data: [[85, 92, 87, 78, 88, 65], [90, 95, 89, 82, 91, 70], [78, 85, 82, 75, 80, 58], [88, 90, 85, 80, 85, 68]]
  };

  const mockInsights = [
    {
      type: 'optimization',
      title: 'Route Optimization Opportunity',
      description: 'Adjusting Route B schedule could reduce delays by 15%',
      priority: 'high'
    },
    {
      type: 'maintenance',
      title: 'Predictive Maintenance Alert',
      description: 'Track 3 showing early signs of wear, schedule maintenance',
      priority: 'medium'
    }
  ];

  useEffect(() => {
    // Simulate initial data loading
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
      setLastUpdated(new Date());
    };

    loadData();
  }, []);

  useEffect(() => {
    // Auto-refresh data every 5 minutes
    const interval = setInterval(() => {
      handleRefresh();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const handleFiltersChange = (filters) => {
    setCurrentFilters(filters);
    console.log('Filters changed:', filters);
    // In real app, this would trigger data refetch
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    setLastUpdated(new Date());
  };

  const handleExport = (config) => {
    console.log('Exporting data with config:', config);
    // In real app, this would trigger actual export
  };

  const handleNavigateToDetail = (metric) => {
    // Navigate to detailed view based on metric
    switch (metric) {
      case 'trains': navigate('/train-detail-view');
        break;
      case 'simulation': navigate('/what-if-simulation-interface');
        break;
      default:
        navigate('/main-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="main-content">
        <div className="container mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="mb-4 lg:mb-0">
              <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                <button 
                  onClick={() => navigate('/main-dashboard')}
                  className="hover:text-foreground transition-colors duration-150"
                >
                  Dashboard
                </button>
                <Icon name="ChevronRight" size={16} />
                <span className="text-foreground">Analytics</span>
              </nav>
              
              <h1 className="text-3xl font-bold text-foreground">Analytics & KPI Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Comprehensive performance insights and operational analytics
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-sm text-muted-foreground">
                Last updated: {lastUpdated?.toLocaleTimeString()}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
                loading={refreshing}
                iconName="RefreshCw"
                iconPosition="left"
                iconSize={16}
              >
                Refresh
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate('/what-if-simulation-interface')}
                iconName="PlayCircle"
                iconPosition="left"
                iconSize={16}
              >
                Run Simulation
              </Button>
            </div>
          </div>

          {/* Filter Controls */}
          <FilterControls 
            onFiltersChange={handleFiltersChange}
            isLoading={isLoading}
          />

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                {...kpi}
                isLoading={isLoading}
              />
            ))}
          </div>

          {/* Charts and Visualizations */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            {/* Throughput Analysis */}
            <div className="xl:col-span-2">
              <ThroughputChart 
                isLoading={isLoading}
                timeRange={currentFilters?.dateRange}
                data={mockThroughputData}
              />
            </div>
            
            {/* Delay Analysis */}
            <DelayAnalysisChart 
              isLoading={isLoading}
              data={mockDelayData}
            />
            
            {/* Utilization Heatmap */}
            <UtilizationHeatmap 
              isLoading={isLoading}
              data={mockUtilizationData}
            />
          </div>

          {/* AI Insights and Predictions */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="xl:col-span-2">
              <PredictiveInsights 
                isLoading={isLoading}
                insights={mockInsights}
              />
            </div>
            
            <div>
              <ExportControls 
                onExport={handleExport}
                isExporting={false}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                onClick={() => handleNavigateToDetail('trains')}
                iconName="Train"
                iconPosition="left"
                iconSize={16}
                className="justify-start"
              >
                View Train Details
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleNavigateToDetail('simulation')}
                iconName="PlayCircle"
                iconPosition="left"
                iconSize={16}
                className="justify-start"
              >
                What-If Analysis
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/system-administration-settings')}
                iconName="Settings"
                iconPosition="left"
                iconSize={16}
                className="justify-start"
              >
                System Settings
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/main-dashboard')}
                iconName="LayoutDashboard"
                iconPosition="left"
                iconSize={16}
                className="justify-start"
              >
                Main Dashboard
              </Button>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="mt-8 bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Performance Summary</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-railway-safe rounded-full"></div>
                <span className="text-sm text-muted-foreground">System Healthy</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-railway-safe mb-2">Excellent</div>
                <div className="text-sm text-muted-foreground">Overall Performance</div>
                <div className="text-xs text-muted-foreground mt-1">
                  All key metrics within target ranges
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-2">5</div>
                <div className="text-sm text-muted-foreground">Active Recommendations</div>
                <div className="text-xs text-muted-foreground mt-1">
                  AI-suggested optimizations available
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-railway-caution mb-2">2</div>
                <div className="text-sm text-muted-foreground">Areas for Improvement</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Minor optimization opportunities identified
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsAndKPIDashboard;