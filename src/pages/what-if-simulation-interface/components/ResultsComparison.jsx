import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultsComparison = ({ currentResults, simulatedResults, onExport }) => {
  const [comparisonView, setComparisonView] = useState('summary');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Mock comparison data
  const [summaryData] = useState({
    totalTrains: { current: 45, simulated: 42, change: -6.7 },
    avgDelay: { current: 8.5, simulated: 12.3, change: 44.7 },
    onTimePerformance: { current: 87.2, simulated: 78.6, change: -9.9 },
    trackUtilization: { current: 74.5, simulated: 82.1, change: 10.2 },
    energyConsumption: { current: 2400, simulated: 2650, change: 10.4 },
    passengerImpact: { current: 1250, simulated: 1890, change: 51.2 }
  });

  const [detailedComparison] = useState([
    {
      metric: 'Express Trains',
      current: { value: 18, unit: 'trains', performance: 92.5 },
      simulated: { value: 16, unit: 'trains', performance: 81.2 },
      impact: 'High',
      recommendation: 'Consider alternative routing for express services'
    },
    {
      metric: 'Local Services',
      current: { value: 22, unit: 'trains', performance: 85.1 },
      simulated: { value: 21, unit: 'trains', performance: 79.8 },
      impact: 'Medium',
      recommendation: 'Adjust local service frequency during peak hours'
    },
    {
      metric: 'Freight Operations',
      current: { value: 5, unit: 'trains', performance: 78.3 },
      simulated: { value: 5, unit: 'trains', performance: 65.4 },
      impact: 'Low',
      recommendation: 'Reschedule freight during off-peak hours'
    }
  ]);

  const [timelineComparison] = useState([
    { time: '10:30', currentDelay: 5, simulatedDelay: 8, currentThroughput: 12, simulatedThroughput: 10 },
    { time: '11:00', currentDelay: 7, simulatedDelay: 15, currentThroughput: 15, simulatedThroughput: 12 },
    { time: '11:30', currentDelay: 6, simulatedDelay: 18, currentThroughput: 14, simulatedThroughput: 9 },
    { time: '12:00', currentDelay: 8, simulatedDelay: 12, currentThroughput: 16, simulatedThroughput: 14 },
    { time: '12:30', currentDelay: 9, simulatedDelay: 10, currentThroughput: 13, simulatedThroughput: 15 }
  ]);

  const getChangeColor = (change) => {
    if (change > 0) return 'text-railway-danger';
    if (change < 0) return 'text-railway-safe';
    return 'text-muted-foreground';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getImpactColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case 'high':
        return 'text-railway-danger bg-railway-danger/10';
      case 'medium':
        return 'text-railway-caution bg-railway-caution/10';
      case 'low':
        return 'text-railway-safe bg-railway-safe/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatValue = (value, unit) => {
    if (unit === '%') return `${value?.toFixed(1)}%`;
    if (unit === 'min') return `${value?.toFixed(1)}min`;
    if (unit === 'kWh') return `${value?.toLocaleString()}kWh`;
    return `${value?.toLocaleString()}${unit ? ` ${unit}` : ''}`;
  };

  const handleExport = (format) => {
    onExport({
      format,
      data: {
        summary: summaryData,
        detailed: detailedComparison,
        timeline: timelineComparison
      },
      timestamp: new Date()?.toISOString()
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="GitCompare" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Results Comparison</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('pdf')}
              iconName="Download"
              iconPosition="left"
            >
              Export PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('csv')}
              iconName="FileText"
              iconPosition="left"
            >
              Export CSV
            </Button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {['summary', 'detailed', 'timeline']?.map((view) => (
            <button
              key={view}
              onClick={() => setComparisonView(view)}
              className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 capitalize ${
                comparisonView === view
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        {comparisonView === 'summary' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(summaryData)?.map(([key, data]) => (
              <div key={key} className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground capitalize">
                    {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                  </h4>
                  <Icon 
                    name={getChangeIcon(data?.change)} 
                    size={16} 
                    className={getChangeColor(data?.change)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current:</span>
                    <span className="font-mono text-foreground">
                      {formatValue(data?.current, key?.includes('energy') ? 'kWh' : key?.includes('delay') ? 'min' : key?.includes('performance') || key?.includes('utilization') ? '%' : '')}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Simulated:</span>
                    <span className="font-mono text-foreground">
                      {formatValue(data?.simulated, key?.includes('energy') ? 'kWh' : key?.includes('delay') ? 'min' : key?.includes('performance') || key?.includes('utilization') ? '%' : '')}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                    <span className="text-muted-foreground">Change:</span>
                    <span className={`font-medium ${getChangeColor(data?.change)}`}>
                      {data?.change > 0 ? '+' : ''}{data?.change?.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {comparisonView === 'detailed' && (
          <div className="space-y-4">
            {detailedComparison?.map((item, index) => (
              <div key={index} className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-foreground">{item?.metric}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(item?.impact)}`}>
                    {item?.impact} Impact
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Current Operations</div>
                    <div className="text-sm font-mono text-foreground">
                      {item?.current?.value} {item?.current?.unit}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Performance: {item?.current?.performance}%
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Simulated Results</div>
                    <div className="text-sm font-mono text-foreground">
                      {item?.simulated?.value} {item?.simulated?.unit}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Performance: {item?.simulated?.performance}%
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-md p-3">
                  <div className="flex items-start space-x-2">
                    <Icon name="Lightbulb" size={14} className="text-primary mt-0.5" />
                    <div>
                      <div className="text-xs font-medium text-foreground mb-1">Recommendation</div>
                      <div className="text-xs text-muted-foreground">{item?.recommendation}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {comparisonView === 'timeline' && (
          <div className="space-y-4">
            <div className="bg-card rounded-lg p-4 border border-border">
              <h4 className="text-sm font-medium text-foreground mb-3">Delay Comparison Over Time</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timelineComparison}>
                    <CartesianGrid strokeDasharray="3,3" stroke="#E5E7EB" />
                    <XAxis dataKey="time" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="currentDelay" 
                      stroke="#059669" 
                      strokeWidth={2}
                      name="Current Delay (min)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="simulatedDelay" 
                      stroke="#DC2626" 
                      strokeWidth={2}
                      strokeDasharray="5,5"
                      name="Simulated Delay (min)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border border-border">
              <h4 className="text-sm font-medium text-foreground mb-3">Throughput Comparison</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timelineComparison}>
                    <CartesianGrid strokeDasharray="3,3" stroke="#E5E7EB" />
                    <XAxis dataKey="time" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="currentThroughput" fill="#059669" name="Current (trains/hr)" />
                    <Bar dataKey="simulatedThroughput" fill="#DC2626" name="Simulated (trains/hr)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border border-border">
              <h4 className="text-sm font-medium text-foreground mb-3">Key Insights</h4>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-railway-caution mt-0.5" />
                  <div className="text-sm text-foreground">
                    Peak delay impact occurs between 11:00-11:30 with 120% increase
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="TrendingDown" size={16} className="text-railway-danger mt-0.5" />
                  <div className="text-sm text-foreground">
                    Throughput drops by 40% during the critical period
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="Clock" size={16} className="text-primary mt-0.5" />
                  <div className="text-sm text-foreground">
                    Recovery time estimated at 45 minutes after scenario end
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

export default ResultsComparison;