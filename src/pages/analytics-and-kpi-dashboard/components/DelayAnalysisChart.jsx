import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const DelayAnalysisChart = ({ data, isLoading = false }) => {
  // Mock data for demonstration
  const mockData = [
    { category: 'Signal Issues', count: 45, avgDelay: 12.5, severity: 'high' },
    { category: 'Track Maintenance', count: 32, avgDelay: 18.2, severity: 'medium' },
    { category: 'Weather', count: 28, avgDelay: 8.7, severity: 'low' },
    { category: 'Equipment Failure', count: 23, avgDelay: 22.1, severity: 'high' },
    { category: 'Traffic Congestion', count: 67, avgDelay: 6.3, severity: 'medium' },
    { category: 'Crew Issues', count: 15, avgDelay: 15.8, severity: 'medium' },
    { category: 'Passenger Issues', count: 41, avgDelay: 4.2, severity: 'low' }
  ];

  const chartData = data || mockData;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'var(--color-railway-danger)';
      case 'medium': return 'var(--color-railway-caution)';
      case 'low': return 'var(--color-railway-safe)';
      default: return 'var(--color-primary)';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Incidents:</span>
              <span className="text-sm font-medium text-foreground">{data?.count}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg Delay:</span>
              <span className="text-sm font-medium text-foreground">{data?.avgDelay} min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Severity:</span>
              <span className={`text-sm font-medium capitalize ${
                data?.severity === 'high' ? 'text-railway-danger' :
                data?.severity === 'medium' ? 'text-railway-caution' : 'text-railway-safe'
              }`}>
                {data?.severity}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-48 h-6 bg-muted rounded animate-pulse"></div>
          <div className="w-24 h-4 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="w-full h-80 bg-muted rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-railway-caution/10 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-railway-caution" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Delay Analysis by Category</h3>
            <p className="text-sm text-muted-foreground">Incident frequency and average delay duration</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-railway-danger rounded-full"></div>
            <span className="text-sm text-muted-foreground">High</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-railway-caution rounded-full"></div>
            <span className="text-sm text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-railway-safe rounded-full"></div>
            <span className="text-sm text-muted-foreground">Low</span>
          </div>
        </div>
      </div>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="category" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="count" 
              fill={(entry) => getSeverityColor(entry?.severity)}
              name="Incident Count"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-foreground">251</div>
          <div className="text-sm text-muted-foreground">Total Incidents</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-foreground">11.2</div>
          <div className="text-sm text-muted-foreground">Avg Delay (min)</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-railway-danger">68</div>
          <div className="text-sm text-muted-foreground">High Severity</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-railway-safe">-15%</div>
          <div className="text-sm text-muted-foreground">vs Last Period</div>
        </div>
      </div>
    </div>
  );
};

export default DelayAnalysisChart;