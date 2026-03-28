import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TrainListPanel from './components/TrainListPanel';
import InteractiveMap from './components/InteractiveMap';
import AIRecommendationPanel from './components/AIRecommendationPanel';
import KPISummaryBar from './components/KPISummaryBar';
import UserProfileCard from './components/UserProfileCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MainDashboard = () => {
  const navigate = useNavigate();
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
  const [showConflictHeatmap, setShowConflictHeatmap] = useState(false);
  const [isKPIBarVisible, setIsKPIBarVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      console.log('Real-time data update:', new Date()?.toLocaleTimeString());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle train selection from different components
  const handleTrainSelect = (train) => {
    setSelectedTrain(train);
    // Navigate to train detail view with train data
    navigate('/train-detail-view', { state: { trainData: train } });
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event?.ctrlKey || event?.metaKey) {
        switch (event?.key) {
          case '1':
            event?.preventDefault();
            setLeftPanelCollapsed(!leftPanelCollapsed);
            break;
          case '2':
            event?.preventDefault();
            setRightPanelCollapsed(!rightPanelCollapsed);
            break;
          case '3':
            event?.preventDefault();
            setShowConflictHeatmap(!showConflictHeatmap);
            break;
          case 'k':
            event?.preventDefault();
            setIsKPIBarVisible(!isKPIBarVisible);
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [leftPanelCollapsed, rightPanelCollapsed, showConflictHeatmap, isKPIBarVisible]);

  // Calculate main content margins based on panel states
  const getMainContentStyle = () => {
    const leftMargin = leftPanelCollapsed ? 64 : 320; // 16px (w-16) or 320px (w-80)
    const rightMargin = rightPanelCollapsed ? 64 : 384; // 16px (w-16) or 384px (w-96)
    const bottomMargin = isKPIBarVisible ? 200 : 0; // Approximate KPI bar height
    
    return {
      marginLeft: `${leftMargin}px`,
      marginRight: `${rightMargin}px`,
      marginBottom: `${bottomMargin}px`,
      paddingTop: '64px' // Header height
    };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Left Panel - Train List */}
      <TrainListPanel
        isCollapsed={leftPanelCollapsed}
        onToggleCollapse={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
        onTrainSelect={handleTrainSelect}
        selectedTrainId={selectedTrain?.id}
      />
      {/* Right Panel - AI Recommendations */}
      <AIRecommendationPanel
        selectedTrain={selectedTrain}
        isCollapsed={rightPanelCollapsed}
        onToggleCollapse={() => setRightPanelCollapsed(!rightPanelCollapsed)}
      />
      {/* Main Content Area */}
      <main 
        className="transition-all duration-300 p-4"
        style={getMainContentStyle()}
      >
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="LayoutDashboard" size={24} className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Railway Control Center</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-railway-safe rounded-full animate-pulse"></div>
              <span>System Online</span>
              <span>•</span>
              <span>{new Date()?.toLocaleDateString()} {new Date()?.toLocaleTimeString()}</span>
            </div>
          </div>

          {/* Dashboard Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant={showConflictHeatmap ? 'default' : 'outline'}
              size="sm"
              iconName="Thermometer"
              iconPosition="left"
              iconSize={16}
              onClick={() => setShowConflictHeatmap(!showConflictHeatmap)}
            >
              Conflict Heatmap
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              iconSize={16}
              onClick={() => window.location?.reload()}
            >
              Refresh
            </Button>

            <Button
              variant="ghost"
              size="sm"
              iconName="Settings"
              iconSize={16}
              onClick={() => navigate('/system-administration-settings')}
            />
          </div>
        </div>

        {/* User Profile Card (only when left panel is expanded) */}
        {!leftPanelCollapsed && (
          <div className="fixed left-4 top-20 w-72 z-[850]">
            <div className="bg-surface border border-border rounded-lg shadow-lg">
              <UserProfileCard isCollapsed={false} />
            </div>
          </div>
        )}

        {/* Interactive Map */}
        <div className="h-[calc(100vh-200px)] min-h-96">
          <InteractiveMap
            selectedTrain={selectedTrain}
            onTrainSelect={handleTrainSelect}
            showConflictHeatmap={showConflictHeatmap}
          />
        </div>

        {/* Mobile Menu Toggle (visible on small screens) */}
        <div className="fixed bottom-4 right-4 lg:hidden z-[900]">
          <Button
            variant="default"
            size="lg"
            iconName="Menu"
            iconSize={20}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full w-14 h-14 shadow-lg"
          />
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-[950] lg:hidden">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Dashboard Menu</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  iconSize={20}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Mobile User Profile */}
                <div className="bg-card border border-border rounded-lg">
                  <UserProfileCard isCollapsed={false} />
                </div>
                
                {/* Mobile Quick Actions */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Train"
                      iconPosition="left"
                      onClick={() => {
                        navigate('/train-detail-view');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Train Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="PlayCircle"
                      iconPosition="left"
                      onClick={() => {
                        navigate('/what-if-simulation-interface');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Simulation
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="BarChart3"
                      iconPosition="left"
                      onClick={() => {
                        navigate('/analytics-and-kpi-dashboard');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Analytics
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Settings"
                      iconPosition="left"
                      onClick={() => {
                        navigate('/system-administration-settings');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Settings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* KPI Summary Bar */}
      <KPISummaryBar isVisible={isKPIBarVisible} />
      {/* Keyboard Shortcuts Help (hidden by default, can be toggled) */}
      <div className="fixed bottom-4 left-4 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm border border-border rounded-lg p-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="space-y-1">
          <div>Ctrl+1: Toggle Train List</div>
          <div>Ctrl+2: Toggle AI Panel</div>
          <div>Ctrl+3: Toggle Heatmap</div>
          <div>Ctrl+K: Toggle KPI Bar</div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;