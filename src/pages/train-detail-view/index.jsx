import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TrainSidebar from '../../components/ui/TrainSidebar';
import TrainHeader from './components/TrainHeader';
import RouteVisualization from './components/RouteVisualization';
import AISuggestions from './components/AISuggestions';
import PerformanceCharts from './components/PerformanceCharts';
import EmergencyControls from './components/EmergencyControls';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TrainDetailView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock train data - in real app this would come from API
  const mockTrains = [
    {
      id: 'T001',
      number: '12345',
      name: 'Express Mumbai',
      status: 'delayed',
      delay: 15,
      currentLocation: 'Bhopal Junction',
      destination: 'Mumbai Central',
      scheduledDeparture: '14:30',
      estimatedArrival: '22:45',
      platform: '3',
      currentSpeed: 85,
      maxSpeed: 120,
      passengerCount: 847,
      maxCapacity: 1200,
      priority: 'high',
      routeProgress: 65,
      hasPrevious: false,
      hasNext: true
    },
    {
      id: 'T002',
      number: '67890',
      name: 'Delhi Express',
      status: 'on-time',
      delay: 0,
      currentLocation: 'Agra Cantt',
      destination: 'New Delhi',
      scheduledDeparture: '15:45',
      estimatedArrival: '19:30',
      platform: '1',
      currentSpeed: 95,
      maxSpeed: 130,
      passengerCount: 1156,
      maxCapacity: 1400,
      priority: 'medium',
      routeProgress: 45,
      hasPrevious: true,
      hasNext: true
    }
  ];

  const mockRoute = {
    totalDistance: 1267,
    estimatedDuration: '8h 15m',
    stations: [
      {
        id: 'S001',
        name: 'Mumbai Central',
        platform: '3',
        scheduledTime: '14:30',
        estimatedTime: '14:30',
        distance: 0,
        passed: true,
        hasConflict: false
      },
      {
        id: 'S002',
        name: 'Vadodara Jn',
        platform: '2',
        scheduledTime: '17:15',
        estimatedTime: '17:30',
        distance: 392,
        passed: true,
        hasConflict: false,
        delay: 15
      },
      {
        id: 'S003',
        name: 'Ratlam Jn',
        platform: '1',
        scheduledTime: '19:45',
        estimatedTime: '20:00',
        distance: 589,
        passed: true,
        hasConflict: false,
        delay: 15
      },
      {
        id: 'S004',
        name: 'Bhopal Jn',
        platform: '4',
        scheduledTime: '21:30',
        estimatedTime: '21:45',
        distance: 743,
        passed: false,
        hasConflict: false,
        delay: 15,
        notes: 'Current location - Extended stop for passenger boarding'
      },
      {
        id: 'S005',
        name: 'Jhansi Jn',
        platform: '2',
        scheduledTime: '23:15',
        estimatedTime: '23:30',
        distance: 967,
        passed: false,
        hasConflict: true,
        delay: 15,
        conflictReason: 'Track maintenance scheduled - Alternative route available'
      },
      {
        id: 'S006',
        name: 'Agra Cantt',
        platform: '3',
        scheduledTime: '01:45',
        estimatedTime: '02:00',
        distance: 1156,
        passed: false,
        hasConflict: false,
        delay: 15
      },
      {
        id: 'S007',
        name: 'New Delhi',
        platform: '16',
        scheduledTime: '04:30',
        estimatedTime: '04:45',
        distance: 1267,
        passed: false,
        hasConflict: false,
        delay: 15
      }
    ]
  };

  const mockSuggestions = [
    {
      id: 'AI001',
      type: 'risky',
      title: 'Route Optimization Available',
      description: 'Alternative route via Gwalior can reduce delay by 8 minutes',
      confidence: 87,
      impact: [
        'Reduce total delay from 15min to 7min',
        'Avoid track maintenance at Jhansi',
        'Minimal impact on other trains'
      ],
      estimatedDuration: '12 minutes',
      affectedTrains: 2,
      riskLevel: 'Medium',
      reasoning: `Based on current traffic patterns and track availability, rerouting via Gwalior junction would bypass the maintenance work at Jhansi while adding only 3km to the total journey. Historical data shows 94% success rate for this alternative route during similar conditions.`,
      timestamp: new Date(Date.now() - 300000),
      model: 'RailwayAI',
      version: '2.1.4'
    },
    {
      id: 'AI002',
      type: 'safe',
      title: 'Speed Optimization Recommended',
      description: 'Increase speed to 105 km/h on next segment to recover 3 minutes',
      confidence: 94,
      impact: [
        'Recover 3 minutes of delay',
        'Maintain passenger comfort',
        'Stay within safety limits'
      ],
      estimatedDuration: '45 minutes',
      affectedTrains: 1,
      riskLevel: 'Low',
      reasoning: `Track conditions and weather are optimal for increased speed. The upcoming 67km segment has clear signals and no speed restrictions. This adjustment will help recover time while maintaining all safety protocols.`,
      timestamp: new Date(Date.now() - 180000),
      model: 'RailwayAI',
      version: '2.1.4'
    }
  ];

  useEffect(() => {
    // Simulate loading and get train data
    const trainId = location?.state?.trainId || 'T001';
    const train = mockTrains?.find(t => t?.id === trainId) || mockTrains?.[0];
    setSelectedTrain(train);
    setLoading(false);
  }, [location?.state]);

  const handleNavigateTrain = (direction) => {
    const currentIndex = mockTrains?.findIndex(t => t?.id === selectedTrain?.id);
    let newIndex;
    
    if (direction === 'next' && currentIndex < mockTrains?.length - 1) {
      newIndex = currentIndex + 1;
    } else if (direction === 'previous' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else {
      return;
    }
    
    const newTrain = mockTrains?.[newIndex];
    setSelectedTrain(newTrain);
    navigate('/train-detail-view', { state: { trainId: newTrain?.id }, replace: true });
  };

  const handleAcceptSuggestion = async (suggestionId) => {
    console.log('Accepting suggestion:', suggestionId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleModifySuggestion = async (suggestionId) => {
    console.log('Modifying suggestion:', suggestionId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleRejectSuggestion = async (suggestionId) => {
    console.log('Rejecting suggestion:', suggestionId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleEmergencyAction = async (actionData) => {
    console.log('Emergency action:', actionData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <Icon name="Train" size={48} className="mx-auto mb-4 text-muted-foreground animate-pulse" />
            <p className="text-lg font-medium text-foreground">Loading train details...</p>
            <p className="text-muted-foreground">Please wait while we fetch the latest information</p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedTrain) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <Icon name="AlertTriangle" size={48} className="mx-auto mb-4 text-railway-danger" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Train Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested train could not be found.</p>
            <Button
              variant="default"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={() => navigate('/main-dashboard')}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <TrainSidebar 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-80'
        } p-6`}>
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <button
              onClick={() => navigate('/main-dashboard')}
              className="hover:text-foreground transition-colors duration-150"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">Train {selectedTrain?.number}</span>
          </nav>

          {/* Train Header */}
          <TrainHeader 
            train={selectedTrain}
            onNavigateTrain={handleNavigateTrain}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            {/* Route Visualization */}
            <div className="xl:col-span-2">
              <RouteVisualization 
                train={selectedTrain}
                route={mockRoute}
              />
            </div>

            {/* AI Suggestions */}
            <AISuggestions
              suggestions={mockSuggestions}
              onAcceptSuggestion={handleAcceptSuggestion}
              onModifySuggestion={handleModifySuggestion}
              onRejectSuggestion={handleRejectSuggestion}
            />

            {/* Emergency Controls */}
            <EmergencyControls
              train={selectedTrain}
              onEmergencyAction={handleEmergencyAction}
            />
          </div>

          {/* Performance Charts */}
          <PerformanceCharts train={selectedTrain} />

          {/* Quick Actions Footer */}
          <div className="mt-6 bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-railway-safe rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">
                    Last updated: {new Date()?.toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Wifi" size={16} className="text-railway-safe" />
                  <span className="text-sm text-muted-foreground">Connected</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => window.location?.reload()}
                >
                  Refresh Data
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                >
                  Export Report
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Share"
                  iconPosition="left"
                >
                  Share View
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrainDetailView;