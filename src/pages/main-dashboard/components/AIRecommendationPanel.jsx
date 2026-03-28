import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIRecommendationPanel = ({ selectedTrain, isCollapsed, onToggleCollapse }) => {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [recommendations, setRecommendations] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Mock AI recommendations
  useEffect(() => {
    const mockRecommendations = [
      {
        id: 'REC001',
        type: 'safe',
        priority: 'high',
        title: 'Route Optimization Available',
        description: `Train 12345 can switch to Track A3 to reduce travel time by 8 minutes and avoid upcoming congestion on current route.`,
        impact: 'Reduces delay by 8 minutes',
        confidence: 94,
        timestamp: new Date(Date.now() - 300000),
        trainId: 'T001',
        actions: ['Accept', 'Modify', 'Reject']
      },
      {
        id: 'REC002',
        type: 'caution',
        priority: 'medium',
        title: 'Speed Adjustment Recommended',
        description: `Delhi Express should reduce speed to 65 km/h due to weather conditions and track maintenance ahead. This will prevent potential delays.`,
        impact: 'Prevents 15-20 min delay',
        confidence: 87,
        timestamp: new Date(Date.now() - 600000),
        trainId: 'T002',
        actions: ['Accept', 'Modify', 'Reject']
      },
      {
        id: 'REC003',
        type: 'danger',
        priority: 'critical',
        title: 'Immediate Action Required',
        description: `Potential conflict detected between Freight 001 and Night Express at Junction C1. Recommend holding Freight 001 for 5 minutes.`,
        impact: 'Prevents collision risk',
        confidence: 98,
        timestamp: new Date(Date.now() - 120000),
        trainId: 'T004',
        actions: ['Accept Immediately', 'Override']
      },
      {
        id: 'REC004',
        type: 'safe',
        priority: 'low',
        title: 'Platform Assignment Optimization',
        description: `Regional Fast can use Platform 2 instead of Platform 1 for better passenger flow and reduced boarding time.`,
        impact: 'Improves efficiency by 12%',
        confidence: 76,
        timestamp: new Date(Date.now() - 900000),
        trainId: 'T006',
        actions: ['Accept', 'Reject']
      }
    ];

    const mockAlerts = [
      {
        id: 'ALT001',
        type: 'warning',
        title: 'Track Maintenance Scheduled',
        description: 'Track B2 maintenance scheduled for 18:00-22:00 today. 3 trains affected.',
        timestamp: new Date(Date.now() - 1800000),
        severity: 'medium'
      },
      {
        id: 'ALT002',
        type: 'info',
        title: 'Weather Update',
        description: 'Light rain expected in 2 hours. Speed restrictions may apply.',
        timestamp: new Date(Date.now() - 3600000),
        severity: 'low'
      },
      {
        id: 'ALT003',
        type: 'error',
        title: 'Signal System Alert',
        description: 'Signal malfunction detected at Junction C1. Manual control activated.',
        timestamp: new Date(Date.now() - 600000),
        severity: 'high'
      }
    ];

    setRecommendations(mockRecommendations);
    setAlerts(mockAlerts);
  }, []);

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'safe':
        return 'CheckCircle';
      case 'caution':
        return 'AlertTriangle';
      case 'danger':
        return 'XCircle';
      default:
        return 'Info';
    }
  };

  const getRecommendationColor = (type) => {
    switch (type) {
      case 'safe':
        return 'text-railway-safe';
      case 'caution':
        return 'text-railway-caution';
      case 'danger':
        return 'text-railway-danger';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRecommendationBg = (type) => {
    switch (type) {
      case 'safe':
        return 'bg-railway-safe/10 border-railway-safe/20';
      case 'caution':
        return 'bg-railway-caution/10 border-railway-caution/20';
      case 'danger':
        return 'bg-railway-danger/10 border-railway-danger/20';
      default:
        return 'bg-muted/10 border-border';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning':
        return 'text-railway-caution';
      case 'error':
        return 'text-railway-danger';
      case 'info':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const handleRecommendationAction = (recommendationId, action) => {
    console.log(`Action ${action} taken for recommendation ${recommendationId}`);
    // In real app, this would send the action to the backend
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return timestamp?.toLocaleDateString();
  };

  const renderRecommendationCard = (rec) => (
    <div
      key={rec?.id}
      className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${getRecommendationBg(rec?.type)}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon 
            name={getRecommendationIcon(rec?.type)} 
            size={18} 
            className={getRecommendationColor(rec?.type)} 
          />
          <div>
            <h4 className="text-sm font-semibold text-foreground">{rec?.title}</h4>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="capitalize">{rec?.priority} Priority</span>
              <span>•</span>
              <span>{rec?.confidence}% Confidence</span>
            </div>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatTimestamp(rec?.timestamp)}
        </span>
      </div>

      <p className="text-sm text-foreground mb-3 leading-relaxed">
        {rec?.description}
      </p>

      <div className="flex items-center justify-between mb-3">
        <div className="text-xs">
          <span className="text-muted-foreground">Impact: </span>
          <span className="font-medium text-foreground">{rec?.impact}</span>
        </div>
        <div className="text-xs">
          <span className="text-muted-foreground">Train: </span>
          <span className="font-mono font-medium text-primary">{rec?.trainId}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {rec?.actions?.map((action, index) => (
          <Button
            key={index}
            variant={
              action?.includes('Accept') || action?.includes('Immediately') ? 'default' :
              action?.includes('Modify') ? 'outline' : 'ghost'
            }
            size="xs"
            onClick={() => handleRecommendationAction(rec?.id, action)}
            className="px-3 py-1"
          >
            {action}
          </Button>
        ))}
      </div>
    </div>
  );

  const renderAlertCard = (alert) => (
    <div
      key={alert?.id}
      className="p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors duration-200"
    >
      <div className="flex items-start space-x-3">
        <Icon 
          name={getAlertIcon(alert?.type)} 
          size={16} 
          className={getAlertColor(alert?.type)} 
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground truncate">
            {alert?.title}
          </h4>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {alert?.description}
          </p>
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(alert?.timestamp)}
          </span>
        </div>
        <Button
          variant="ghost"
          size="xs"
          iconName="X"
          iconSize={12}
          className="p-1 opacity-50 hover:opacity-100"
        />
      </div>
    </div>
  );

  const renderCollapsedView = () => (
    <div className="p-2 space-y-2">
      {/* Quick status indicators */}
      <div className="space-y-1">
        <div className="w-full h-8 bg-railway-safe/10 border border-railway-safe/20 rounded flex items-center justify-center">
          <Icon name="CheckCircle" size={16} className="text-railway-safe" />
        </div>
        <div className="w-full h-8 bg-railway-caution/10 border border-railway-caution/20 rounded flex items-center justify-center">
          <Icon name="AlertTriangle" size={16} className="text-railway-caution" />
        </div>
        <div className="w-full h-8 bg-railway-danger/10 border border-railway-danger/20 rounded flex items-center justify-center">
          <Icon name="XCircle" size={16} className="text-railway-danger" />
        </div>
      </div>
    </div>
  );

  return (
    <aside className={`fixed right-0 top-16 bottom-0 bg-surface border-l border-border transition-all duration-300 z-[900] ${
      isCollapsed ? 'w-16' : 'w-96'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <Icon name="Brain" size={20} className="text-primary" />
              <h2 className="font-semibold text-foreground">AI Assistant</h2>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-railway-safe rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Active</span>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            iconName={isCollapsed ? "ChevronLeft" : "ChevronRight"}
            iconSize={16}
            className="p-2"
          />
        </div>

        {/* Content */}
        {isCollapsed ? (
          renderCollapsedView()
        ) : (
          <>
            {/* Tabs */}
            <div className="flex border-b border-border">
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                  activeTab === 'recommendations' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Lightbulb" size={16} />
                  <span>Recommendations</span>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                    {recommendations?.length}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('alerts')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-150 ${
                  activeTab === 'alerts' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Bell" size={16} />
                  <span>Alerts</span>
                  <span className="bg-railway-caution/10 text-railway-caution text-xs px-2 py-0.5 rounded-full">
                    {alerts?.length}
                  </span>
                </div>
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'recommendations' ? (
                <div className="p-4 space-y-4">
                  {recommendations?.length > 0 ? (
                    recommendations?.map(renderRecommendationCard)
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Icon name="Lightbulb" size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No recommendations available</p>
                      <p className="text-xs">AI is analyzing current conditions</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {alerts?.length > 0 ? (
                    alerts?.map(renderAlertCard)
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Icon name="Bell" size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No active alerts</p>
                      <p className="text-xs">System operating normally</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>AI Model: RailwayGPT v2.1</span>
                <span>Response Time: 0.3s</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-railway-safe rounded-full"></div>
                  <span className="text-xs">System Healthy</span>
                </div>
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="RefreshCw"
                  iconSize={12}
                  className="px-2 py-1"
                >
                  Refresh
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default AIRecommendationPanel;