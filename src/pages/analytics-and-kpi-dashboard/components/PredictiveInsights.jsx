import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PredictiveInsights = ({ insights, isLoading = false }) => {
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [viewMode, setViewMode] = useState('recommendations'); // recommendations, predictions, alerts

  // Mock predictive insights data
  const mockInsights = {
    recommendations: [
      {
        id: 'R001',
        type: 'optimization',
        priority: 'high',
        title: 'Route Optimization Opportunity',
        description: 'AI analysis suggests rerouting 3 trains during peak hours could reduce overall delays by 18%',
        impact: '+18% efficiency',
        confidence: 92,
        timeframe: '2-4 hours',
        action: 'Implement suggested routing changes',
        details: `Based on historical traffic patterns and current conditions, rerouting trains T-12345, T-67890, and T-11111 through alternative tracks during 14:00-18:00 window would:\n• Reduce average delay from 12.5 to 10.2 minutes\n• Improve track utilization balance\n• Minimize passenger impact`
      },
      {
        id: 'R002',
        type: 'maintenance',
        priority: 'medium',
        title: 'Preventive Maintenance Window',
        description: 'Optimal maintenance window identified for Track Section 7A with minimal service disruption',
        impact: 'Prevent 15+ delays',
        confidence: 87,
        timeframe: 'Tomorrow 02:00-05:00',
        action: 'Schedule maintenance during suggested window',
        details: `Analysis of traffic patterns shows:\n• Lowest train frequency: 02:00-05:00\n• Only 3 scheduled services affected\n• Alternative routing available\n• Weather conditions favorable`
      },
      {
        id: 'R003',
        type: 'capacity',
        priority: 'low',
        title: 'Capacity Reallocation',
        description: 'Underutilized tracks in Sector B could accommodate overflow from high-traffic Sector A',
        impact: '+12% capacity',
        confidence: 78,
        timeframe: 'Next week',
        action: 'Review and implement capacity redistribution',
        details: `Current utilization analysis:\n• Sector A: 94% utilization (overcapacity)\n• Sector B: 67% utilization (underutilized)\n• Potential for 8 additional train slots\n• Estimated implementation time: 3-5 days`
      }
    ],
    predictions: [
      {
        id: 'P001',
        type: 'delay',
        severity: 'high',
        title: 'High Delay Risk - Evening Rush',
        prediction: '78% probability of delays >15 minutes during 17:00-19:00',
        factors: ['Weather conditions', 'High passenger volume', 'Track maintenance'],
        confidence: 84,
        timeframe: 'Today 17:00-19:00',
        mitigation: 'Deploy additional staff and prepare alternative routes'
      },
      {
        id: 'P002',
        type: 'congestion',
        severity: 'medium',
        title: 'Junction Congestion Forecast',
        prediction: 'Central Junction expected to reach 95% capacity by 14:30',
        factors: ['Scheduled freight trains', 'Express service overlap'],
        confidence: 91,
        timeframe: 'Today 14:30-15:45',
        mitigation: 'Stagger freight departures by 15 minutes'
      },
      {
        id: 'P003',
        type: 'equipment',
        severity: 'low',
        title: 'Equipment Performance Alert',
        prediction: 'Signal system in Zone 3 showing early degradation patterns',
        factors: ['Usage patterns', 'Environmental conditions', 'Maintenance history'],
        confidence: 73,
        timeframe: 'Next 7-10 days',
        mitigation: 'Schedule diagnostic inspection within 48 hours'
      }
    ],
    alerts: [
      {
        id: 'A001',
        type: 'critical',
        severity: 'high',
        title: 'Immediate Attention Required',
        message: 'Track sensor anomaly detected in Section 12B - potential safety concern',
        timestamp: '2025-09-01 09:45:00',
        status: 'active',
        action: 'Dispatch maintenance team immediately'
      },
      {
        id: 'A002',
        type: 'warning',
        severity: 'medium',
        title: 'Weather Impact Warning',
        message: 'Heavy rainfall forecast may affect operations in Northern sectors',
        timestamp: '2025-09-01 08:30:00',
        status: 'monitoring',
        action: 'Prepare weather contingency protocols'
      },
      {
        id: 'A003',
        type: 'info',
        severity: 'low',
        title: 'Performance Milestone',
        message: 'System achieved 96.2% on-time performance this week - exceeding target',
        timestamp: '2025-09-01 07:00:00',
        status: 'resolved',
        action: 'Document best practices for replication'
      }
    ]
  };

  const currentData = insights || mockInsights?.[viewMode];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-railway-danger';
      case 'medium': return 'text-railway-caution';
      case 'low': return 'text-railway-safe';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'Info';
      default: return 'Circle';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-railway-danger';
      case 'medium': return 'text-railway-caution';
      case 'low': return 'text-railway-safe';
      default: return 'text-muted-foreground';
    }
  };

  const renderRecommendations = () => (
    <div className="space-y-4">
      {currentData?.map((item) => (
        <div key={item?.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start space-x-3">
              <Icon 
                name={getPriorityIcon(item?.priority)} 
                size={20} 
                className={getPriorityColor(item?.priority)} 
              />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground">{item?.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{item?.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full bg-muted ${getPriorityColor(item?.priority)}`}>
                {item?.priority}
              </span>
              <span className="text-xs text-muted-foreground">{item?.confidence}% confidence</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
            <div className="text-center p-2 bg-muted/50 rounded">
              <div className="text-sm font-medium text-foreground">{item?.impact}</div>
              <div className="text-xs text-muted-foreground">Expected Impact</div>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded">
              <div className="text-sm font-medium text-foreground">{item?.timeframe}</div>
              <div className="text-xs text-muted-foreground">Timeframe</div>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded">
              <div className="text-sm font-medium text-foreground">{item?.confidence}%</div>
              <div className="text-xs text-muted-foreground">Confidence</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedInsight(item)}
              iconName="Eye"
              iconPosition="left"
              iconSize={14}
            >
              View Details
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="CheckCircle"
              iconPosition="left"
              iconSize={14}
            >
              Implement
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPredictions = () => (
    <div className="space-y-4">
      {currentData?.map((item) => (
        <div key={item?.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start space-x-3">
              <Icon 
                name="TrendingUp" 
                size={20} 
                className={getSeverityColor(item?.severity)} 
              />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground">{item?.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{item?.prediction}</p>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full bg-muted ${getSeverityColor(item?.severity)}`}>
              {item?.severity}
            </span>
          </div>
          
          <div className="mb-3">
            <div className="text-xs font-medium text-foreground mb-1">Contributing Factors:</div>
            <div className="flex flex-wrap gap-1">
              {item?.factors?.map((factor, index) => (
                <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                  {factor}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {item?.timeframe} • {item?.confidence}% confidence
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="Shield"
              iconPosition="left"
              iconSize={14}
            >
              Apply Mitigation
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-4">
      {currentData?.map((item) => (
        <div key={item?.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start space-x-3">
              <Icon 
                name="Bell" 
                size={20} 
                className={getSeverityColor(item?.severity)} 
              />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground">{item?.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{item?.message}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full bg-muted ${getSeverityColor(item?.severity)}`}>
                {item?.severity}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                item?.status === 'active' ? 'bg-railway-danger/10 text-railway-danger' :
                item?.status === 'monitoring'? 'bg-railway-caution/10 text-railway-caution' : 'bg-railway-safe/10 text-railway-safe'
              }`}>
                {item?.status}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {new Date(item.timestamp)?.toLocaleString()}
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              iconPosition="left"
              iconSize={14}
            >
              Take Action
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-48 h-6 bg-muted rounded animate-pulse"></div>
          <div className="w-32 h-8 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3]?.map(i => (
            <div key={i} className="w-full h-24 bg-muted rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Predictive Insights</h3>
            <p className="text-sm text-muted-foreground">
              {viewMode === 'recommendations' && 'AI-generated optimization recommendations'}
              {viewMode === 'predictions' && 'Predictive analysis and forecasts'}
              {viewMode === 'alerts' && 'System alerts and notifications'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'recommendations' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('recommendations')}
            iconName="Lightbulb"
            iconPosition="left"
            iconSize={14}
          >
            Recommendations
          </Button>
          <Button
            variant={viewMode === 'predictions' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('predictions')}
            iconName="TrendingUp"
            iconPosition="left"
            iconSize={14}
          >
            Predictions
          </Button>
          <Button
            variant={viewMode === 'alerts' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('alerts')}
            iconName="Bell"
            iconPosition="left"
            iconSize={14}
          >
            Alerts
          </Button>
        </div>
      </div>
      {viewMode === 'recommendations' && renderRecommendations()}
      {viewMode === 'predictions' && renderPredictions()}
      {viewMode === 'alerts' && renderAlerts()}
      {/* Detail Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-4">
          <div className="bg-popover border border-border rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">{selectedInsight?.title}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedInsight(null)}
                iconName="X"
                iconSize={16}
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedInsight?.description}</p>
              </div>
              
              {selectedInsight?.details && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Detailed Analysis</h4>
                  <div className="text-sm text-muted-foreground whitespace-pre-line">
                    {selectedInsight?.details}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedInsight(null)}
                >
                  Close
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="CheckCircle"
                  iconPosition="left"
                  iconSize={14}
                >
                  Implement
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictiveInsights;