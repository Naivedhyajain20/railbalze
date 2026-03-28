import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const ThroughputChart = ({ data, isLoading = false, timeRange = '7d' }) => {
  // Mock data for demonstration
  const mockData = [
    { time: '00:00', planned: 45, actual: 42, efficiency: 93.3 },
    { time: '04:00', planned: 38, actual: 35, efficiency: 92.1 },
    { time: '08:00', planned: 65, actual: 58, efficiency: 89.2 },
    { time: '12:00', planned: 72, actual: 68, efficiency: 94.4 },
    { time: '16:00', planned: 68, actual: 65, efficiency: 95.6 },
    { time: '20:00', planned: 55, actual: 52, efficiency: 94.5 }
  ];

  // Ensure chartData is always a valid array
  const chartData = Array.isArray(data) ? data : mockData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{`Time: ${label}`}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-foreground">
                {entry?.name === 'efficiency' ? `${entry?.value}%` : `${entry?.value} trains`}
              </span>
            </div>
          ))}
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

  // Defensive check for empty data
  if (!Array.isArray(chartData) || chartData.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-center h-80">
          <p className="text-muted-foreground">No chart data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Train Throughput Analysis</h3>
            <p className="text-sm text-muted-foreground">Planned vs Actual train movements</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Planned</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-railway-safe rounded-full"></div>
            <span className="text-sm text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-railway-caution rounded-full"></div>
            <span className="text-sm text-muted-foreground">Efficiency</span>
          </div>
        </div>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            {/* Added right YAxis for efficiency line */}
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="var(--color-muted-foreground)" 
              fontSize={12} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="planned" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              name="Planned"
            />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="var(--color-railway-safe)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-railway-safe)', strokeWidth: 2, r: 4 }}
              name="Actual"
            />
            <Line 
              type="monotone" 
              dataKey="efficiency" 
              stroke="var(--color-railway-caution)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-railway-caution)', strokeWidth: 2, r: 4 }}
              name="Efficiency (%)"
              yAxisId="right"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-foreground">94.2%</div>
          <div className="text-sm text-muted-foreground">Average Efficiency</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-foreground">320</div>
          <div className="text-sm text-muted-foreground">Total Trains</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-foreground">18</div>
          <div className="text-sm text-muted-foreground">Variance</div>
        </div>
      </div>
    </div>
  );
};

export default ThroughputChart;
