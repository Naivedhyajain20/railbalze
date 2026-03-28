import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UtilizationHeatmap = ({ data, isLoading = false }) => {
  const [selectedHour, setSelectedHour] = useState(null);
  const [viewMode, setViewMode] = useState('hourly'); // hourly, daily, weekly

  // Mock heatmap data - 24 hours x 7 days
  const mockData = {
    hourly: Array.from({ length: 24 }, (_, hour) => 
      Array.from({ length: 7 }, (_, day) => ({
        hour,
        day,
        utilization: Math.floor(Math.random() * 100),
        trainCount: Math.floor(Math.random() * 20) + 5,
        dayName: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']?.[day]
      }))
    )?.flat(),
    daily: Array.from({ length: 30 }, (_, day) => ({
      day: day + 1,
      utilization: Math.floor(Math.random() * 100),
      trainCount: Math.floor(Math.random() * 200) + 100
    })),
    weekly: Array.from({ length: 12 }, (_, week) => ({
      week: week + 1,
      utilization: Math.floor(Math.random() * 100),
      trainCount: Math.floor(Math.random() * 1000) + 500
    }))
  };

  const heatmapData = Array.isArray(data) ? data : mockData?.[viewMode] || [];


  const getUtilizationColor = (utilization) => {
    if (utilization >= 90) return 'bg-railway-danger';
    if (utilization >= 75) return 'bg-railway-caution';
    if (utilization >= 50) return 'bg-yellow-400';
    if (utilization >= 25) return 'bg-railway-safe';
    return 'bg-gray-300';
  };

  const getUtilizationIntensity = (utilization) => {
    const intensity = Math.floor(utilization / 10);
    return `opacity-${Math.max(20, Math.min(100, intensity * 10))}`;
  };

  const handleCellClick = (cellData) => {
    setSelectedHour(cellData);
  };

  const renderHourlyHeatmap = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
      <div className="space-y-2">
        {/* Hour labels */}
        <div className="grid grid-cols-25 gap-1">
          <div className="w-12"></div>
          {hours?.map(hour => (
            <div key={hour} className="text-xs text-center text-muted-foreground w-6">
              {hour?.toString()?.padStart(2, '0')}
            </div>
          ))}
        </div>
        {/* Heatmap grid */}
        {days?.map((dayName, dayIndex) => (
          <div key={dayName} className="grid grid-cols-25 gap-1 items-center">
            <div className="text-xs font-medium text-muted-foreground w-12">
              {dayName}
            </div>
            {hours?.map(hour => {
              const cellData = Array.isArray(heatmapData) ? heatmapData.find(d => d?.hour === hour && d?.day === dayIndex) : undefined;
              const utilization = cellData?.utilization || 0;
              
              return (
                <button
                  key={`${dayIndex}-${hour}`}
                  onClick={() => handleCellClick(cellData)}
                  className={`w-6 h-6 rounded-sm ${getUtilizationColor(utilization)} ${getUtilizationIntensity(utilization)} hover:ring-2 hover:ring-primary transition-all duration-150`}
                  title={`${dayName} ${hour}:00 - ${utilization}% utilization`}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const renderDailyHeatmap = () => {
    return (
      <div className="grid grid-cols-10 gap-2">
        {heatmapData?.map((dayData, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(dayData)}
            className={`aspect-square rounded-lg ${getUtilizationColor(dayData?.utilization)} ${getUtilizationIntensity(dayData?.utilization)} hover:ring-2 hover:ring-primary transition-all duration-150 flex items-center justify-center`}
            title={`Day ${dayData?.day} - ${dayData?.utilization}% utilization`}
          >
            <span className="text-xs font-medium text-white">{dayData?.day}</span>
          </button>
        ))}
      </div>
    );
  };

  const renderWeeklyHeatmap = () => {
    return (
      <div className="grid grid-cols-6 gap-3">
        {heatmapData?.map((weekData, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(weekData)}
            className={`aspect-square rounded-lg ${getUtilizationColor(weekData?.utilization)} ${getUtilizationIntensity(weekData?.utilization)} hover:ring-2 hover:ring-primary transition-all duration-150 flex items-center justify-center`}
            title={`Week ${weekData?.week} - ${weekData?.utilization}% utilization`}
          >
            <span className="text-sm font-medium text-white">W{weekData?.week}</span>
          </button>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-48 h-6 bg-muted rounded animate-pulse"></div>
          <div className="w-32 h-8 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="w-full h-64 bg-muted rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Track Utilization Heatmap</h3>
            <p className="text-sm text-muted-foreground">
              {viewMode === 'hourly' && 'Hourly utilization patterns across the week'}
              {viewMode === 'daily' && 'Daily utilization over the past month'}
              {viewMode === 'weekly' && 'Weekly utilization trends'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'hourly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('hourly')}
          >
            Hourly
          </Button>
          <Button
            variant={viewMode === 'daily' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('daily')}
          >
            Daily
          </Button>
          <Button
            variant={viewMode === 'weekly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('weekly')}
          >
            Weekly
          </Button>
        </div>
      </div>
      {/* Heatmap */}
      <div className="mb-6">
        {viewMode === 'hourly' && renderHourlyHeatmap()}
        {viewMode === 'daily' && renderDailyHeatmap()}
        {viewMode === 'weekly' && renderWeeklyHeatmap()}
      </div>
      {/* Legend */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-foreground">Utilization:</span>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
            <span className="text-xs text-muted-foreground">0-25%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-railway-safe rounded-sm"></div>
            <span className="text-xs text-muted-foreground">25-50%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
            <span className="text-xs text-muted-foreground">50-75%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-railway-caution rounded-sm"></div>
            <span className="text-xs text-muted-foreground">75-90%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-railway-danger rounded-sm"></div>
            <span className="text-xs text-muted-foreground">90%+</span>
          </div>
        </div>

        {selectedHour && (
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-sm font-medium text-foreground">
              {viewMode === 'hourly' && `${selectedHour?.dayName} ${selectedHour?.hour}:00`}
              {viewMode === 'daily' && `Day ${selectedHour?.day}`}
              {viewMode === 'weekly' && `Week ${selectedHour?.week}`}
            </div>
            <div className="text-xs text-muted-foreground">
              {selectedHour?.utilization}% utilization • {selectedHour?.trainCount} trains
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UtilizationHeatmap;