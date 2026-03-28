import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImpactAnalysisPanel = ({ activeScenario, simulationResults }) => {
  const [activeTab, setActiveTab] = useState('throughput');
  const [comparisonMode, setComparisonMode] = useState('current');

  // Mock impact data
  const [throughputData] = useState([
    { time: '10:00', current: 45, simulated: 42, difference: -3 },
    { time: '10:30', current: 52, simulated: 48, difference: -4 },
    { time: '11:00', current: 48, simulated: 35, difference: -13 },
    { time: '11:30', current: 55, simulated: 40, difference: -15 },
    { time: '12:00', current: 60, simulated: 58, difference: -2 },
    { time: '12:30', current: 58, simulated: 62, difference: 4 }
  ]);

  const [delayData] = useState([
    { category: 'Express Trains', current: 8, simulated: 15, impact: 87.5 },
    { category: 'Local Services', current: 12, simulated: 18, impact: 50 },
    { category: 'Freight Trains', current: 25, simulated: 35, impact: 40 },
    { category: 'Emergency Services', current: 2, simulated: 8, impact: 300 }
  ]);

  const [resourceData] = useState([
    { name: 'Track Utilization', current: 75, simulated: 85, unit: '%' },
    { name: 'Signal Operations', current: 120, simulated: 145, unit: 'ops/hr' },
    { name: 'Controller Actions', current: 35, simulated: 52, unit: 'actions/hr' },
    { name: 'Energy Consumption', current: 2400, simulated: 2650, unit: 'kWh' }
  ]);

  const [riskAssessment] = useState([
    { risk: 'Schedule Disruption', probability: 85, impact: 'High', color: '#DC2626' },
    { risk: 'Passenger Delays', probability: 92, impact: 'High', color: '#DC2626' },
    { risk: 'Resource Strain', probability: 68, impact: 'Medium', color: '#D97706' },
    { risk: 'Safety Concerns', probability: 25, impact: 'Low', color: '#059669' }
  ]);

  const [costAnalysis] = useState([
    { category: 'Operational Delays', current: 15000, simulated: 28000, difference: 13000 },
    { category: 'Resource Overtime', current: 8500, simulated: 12500, difference: 4000 },
    { category: 'Passenger Compensation', current: 5200, simulated: 9800, difference: 4600 },
    { category: 'Energy Costs', current: 18000, simulated: 19500, difference: 1500 }
  ]);

  const pieColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(value);
  };

  const getImpactColor = (value) => {
    if (value > 0) return 'text-railway-danger';
    if (value < 0) return 'text-railway-safe';
    return 'text-muted-foreground';
  };

  const getImpactIcon = (value) => {
    if (value > 0) return 'TrendingUp';
    if (value < 0) return 'TrendingDown';
    return 'Minus';
  };

  const tabs = [
    { id: 'throughput', label: 'Throughput', icon: 'BarChart3' },
    { id: 'delays', label: 'Delays', icon: 'Clock' },
    { id: 'resources', label: 'Resources', icon: 'Zap' },
    { id: 'risks', label: 'Risks', icon: 'AlertTriangle' },
    { id: 'costs', label: 'Costs', icon: 'DollarSign' }
  ];

  return (
    <div className="h-full bg-surface border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Impact Analysis</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={comparisonMode === 'current' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setComparisonMode('current')}
            >
              vs Current
            </Button>
            <Button
              variant={comparisonMode === 'baseline' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setComparisonMode('baseline')}
            >
              vs Baseline
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={14} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'throughput' && (
          <div className="space-y-4">
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="text-sm font-medium text-foreground mb-3">Hourly Throughput Comparison</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={throughputData}>
                    <CartesianGrid strokeDasharray="3,3" stroke="#E5E7EB" />
                    <XAxis dataKey="time" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="current" 
                      stroke="#059669" 
                      strokeWidth={2}
                      name="Current"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="simulated" 
                      stroke="#DC2626" 
                      strokeWidth={2}
                      strokeDasharray="5,5"
                      name="Simulated"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {throughputData?.slice(-3)?.map((item, index) => (
                <div key={index} className="bg-card rounded-lg p-3 border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-foreground">{item?.time}</div>
                      <div className="text-xs text-muted-foreground">Trains/Hour</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono text-foreground">
                        {item?.current} → {item?.simulated}
                      </div>
                      <div className={`text-xs flex items-center space-x-1 ${getImpactColor(item?.difference)}`}>
                        <Icon name={getImpactIcon(item?.difference)} size={12} />
                        <span>{item?.difference > 0 ? '+' : ''}{item?.difference}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'delays' && (
          <div className="space-y-4">
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="text-sm font-medium text-foreground mb-3">Delay Impact by Category</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={delayData}>
                    <CartesianGrid strokeDasharray="3,3" stroke="#E5E7EB" />
                    <XAxis dataKey="category" fontSize={10} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="current" fill="#059669" name="Current (min)" />
                    <Bar dataKey="simulated" fill="#DC2626" name="Simulated (min)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-2">
              {delayData?.map((item, index) => (
                <div key={index} className="bg-card rounded-lg p-3 border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-foreground">{item?.category}</div>
                      <div className="text-xs text-muted-foreground">
                        {item?.current}min → {item?.simulated}min
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${getImpactColor(item?.impact)}`}>
                        +{item?.impact}%
                      </div>
                      <div className="text-xs text-muted-foreground">Impact</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-4">
            {resourceData?.map((resource, index) => (
              <div key={index} className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-foreground">{resource?.name}</h3>
                  <div className="text-xs text-muted-foreground">{resource?.unit}</div>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">Current</div>
                  <div className="text-sm font-mono text-foreground">{resource?.current}</div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-muted-foreground">Simulated</div>
                  <div className="text-sm font-mono text-foreground">{resource?.simulated}</div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((resource?.simulated / resource?.current) * 100, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-muted-foreground">Change</div>
                  <div className={`text-xs font-medium ${getImpactColor(resource?.simulated - resource?.current)}`}>
                    {resource?.simulated > resource?.current ? '+' : ''}
                    {((resource?.simulated - resource?.current) / resource?.current * 100)?.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="space-y-4">
            {riskAssessment?.map((risk, index) => (
              <div key={index} className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-foreground">{risk?.risk}</h3>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    risk?.impact === 'High' ? 'bg-railway-danger/10 text-railway-danger' :
                    risk?.impact === 'Medium'? 'bg-railway-caution/10 text-railway-caution' : 'bg-railway-safe/10 text-railway-safe'
                  }`}>
                    {risk?.impact} Impact
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">Probability</div>
                  <div className="text-sm font-medium text-foreground">{risk?.probability}%</div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${risk?.probability}%`,
                      backgroundColor: risk?.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'costs' && (
          <div className="space-y-4">
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="text-sm font-medium text-foreground mb-3">Cost Impact Summary</h3>
              <div className="space-y-3">
                {costAnalysis?.map((cost, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                    <div>
                      <div className="text-sm font-medium text-foreground">{cost?.category}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatCurrency(cost?.current)} → {formatCurrency(cost?.simulated)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${getImpactColor(cost?.difference)}`}>
                        {cost?.difference > 0 ? '+' : ''}{formatCurrency(cost?.difference)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {((cost?.difference / cost?.current) * 100)?.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="text-sm font-medium text-foreground mb-2">Total Impact</h3>
              <div className="text-2xl font-bold text-railway-danger">
                +{formatCurrency(costAnalysis?.reduce((sum, cost) => sum + cost?.difference, 0))}
              </div>
              <div className="text-xs text-muted-foreground">Additional operational cost</div>
            </div>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="outline"
          fullWidth
          iconName="Download"
          iconPosition="left"
          size="sm"
        >
          Export Report
        </Button>
        
        <Button
          variant="ghost"
          fullWidth
          iconName="Share"
          iconPosition="left"
          size="sm"
        >
          Share Analysis
        </Button>
      </div>
    </div>
  );
};

export default ImpactAnalysisPanel;