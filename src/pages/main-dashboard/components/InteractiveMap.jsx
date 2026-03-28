import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveMap = ({ selectedTrain, onTrainSelect, showConflictHeatmap }) => {
  const [mapView, setMapView] = useState('overview'); // 'overview', 'detailed', 'satellite'
  const [showTrackLabels, setShowTrackLabels] = useState(true);
  const [animationEnabled, setAnimationEnabled] = useState(true);

  // Mock track data with coordinates
  const tracks = [
    {
      id: 'A1',
      name: 'Main Line A1',
      status: 'occupied',
      coordinates: { x: 100, y: 150, width: 300, height: 8 },
      direction: 'horizontal',
      trains: ['T001']
    },
    {
      id: 'A2',
      name: 'Main Line A2',
      status: 'occupied',
      coordinates: { x: 100, y: 200, width: 300, height: 8 },
      direction: 'horizontal',
      trains: ['T005']
    },
    {
      id: 'B1',
      name: 'Branch B1',
      status: 'free',
      coordinates: { x: 450, y: 150, width: 200, height: 8 },
      direction: 'horizontal',
      trains: []
    },
    {
      id: 'B2',
      name: 'Branch B2',
      status: 'conflict',
      coordinates: { x: 450, y: 200, width: 200, height: 8 },
      direction: 'horizontal',
      trains: ['T002']
    },
    {
      id: 'C1',
      name: 'Junction C1',
      status: 'free',
      coordinates: { x: 400, y: 120, width: 8, height: 120 },
      direction: 'vertical',
      trains: []
    },
    {
      id: 'D1',
      name: 'Freight D1',
      status: 'occupied',
      coordinates: { x: 100, y: 300, width: 250, height: 8 },
      direction: 'horizontal',
      trains: ['T004']
    }
  ];

  // Mock train positions
  const trainPositions = [
    {
      id: 'T001',
      number: '12345',
      name: 'Express Mumbai',
      x: 250,
      y: 146,
      direction: 90,
      speed: 85,
      status: 'on-time',
      track: 'A1'
    },
    {
      id: 'T002',
      number: '67890',
      name: 'Delhi Express',
      x: 550,
      y: 196,
      direction: 90,
      speed: 0,
      status: 'delayed',
      track: 'B2'
    },
    {
      id: 'T004',
      number: '22222',
      name: 'Freight 001',
      x: 200,
      y: 296,
      direction: 90,
      speed: 45,
      status: 'on-time',
      track: 'D1'
    },
    {
      id: 'T005',
      number: '33333',
      name: 'Night Express',
      x: 300,
      y: 196,
      direction: 90,
      speed: 75,
      status: 'delayed',
      track: 'A2'
    },
    {
      id: 'T006',
      number: '44444',
      name: 'Regional Fast',
      x: 150,
      y: 100,
      direction: 45,
      speed: 90,
      status: 'on-time',
      track: 'Platform'
    }
  ];

  // Mock stations
  const stations = [
    { id: 'ST001', name: 'Central Station', x: 80, y: 180, platforms: 8 },
    { id: 'ST002', name: 'Junction North', x: 400, y: 100, platforms: 4 },
    { id: 'ST003', name: 'Terminal East', x: 650, y: 180, platforms: 6 },
    { id: 'ST004', name: 'Freight Yard', x: 80, y: 320, platforms: 2 }
  ];

  // Mock conflict zones for heatmap
  const conflictZones = [
    { x: 380, y: 140, radius: 40, intensity: 0.8, type: 'high' },
    { x: 520, y: 180, radius: 30, intensity: 0.6, type: 'medium' },
    { x: 200, y: 280, radius: 25, intensity: 0.4, type: 'low' }
  ];

  const getTrackColor = (status) => {
    switch (status) {
      case 'free':
        return '#059669'; // railway-safe
      case 'occupied':
        return '#D97706'; // railway-caution
      case 'conflict':
        return '#DC2626'; // railway-danger
      default:
        return '#64748B'; // slate-500
    }
  };

  const getTrainColor = (status) => {
    switch (status) {
      case 'on-time':
        return '#059669';
      case 'delayed':
        return '#D97706';
      case 'cancelled':
        return '#DC2626';
      default:
        return '#64748B';
    }
  };

  const handleTrainClick = (train) => {
    onTrainSelect(train);
  };

  const renderTrack = (track) => (
    <g key={track?.id}>
      <rect
        x={track?.coordinates?.x}
        y={track?.coordinates?.y}
        width={track?.coordinates?.width}
        height={track?.coordinates?.height}
        fill={getTrackColor(track?.status)}
        stroke="#374151"
        strokeWidth="1"
        rx="2"
      />
      {showTrackLabels && (
        <text
          x={track?.coordinates?.x + track?.coordinates?.width / 2}
          y={track?.coordinates?.y - 10}
          textAnchor="middle"
          fontSize="10"
          fill="#6B7280"
          className="font-mono"
        >
          {track?.name}
        </text>
      )}
    </g>
  );

  const renderTrain = (train) => {
    const isSelected = selectedTrain?.id === train?.id;
    const trainColor = getTrainColor(train?.status);
    
    return (
      <g key={train?.id} className="cursor-pointer" onClick={() => handleTrainClick(train)}>
        {/* Train body */}
        <rect
          x={train?.x - 12}
          y={train?.y - 6}
          width="24"
          height="12"
          fill={trainColor}
          stroke={isSelected ? "#1E40AF" : "#374151"}
          strokeWidth={isSelected ? "2" : "1"}
          rx="2"
          className={animationEnabled ? "transition-all duration-300" : ""}
        />
        {/* Train direction indicator */}
        <polygon
          points={`${train?.x + 8},${train?.y - 2} ${train?.x + 12},${train?.y} ${train?.x + 8},${train?.y + 2}`}
          fill="#FFFFFF"
        />
        {/* Speed indicator */}
        {train?.speed > 0 && (
          <circle
            cx={train?.x}
            cy={train?.y - 15}
            r="3"
            fill={train?.speed > 60 ? "#059669" : "#D97706"}
            className={animationEnabled ? "animate-pulse" : ""}
          />
        )}
        {/* Train label */}
        <text
          x={train?.x}
          y={train?.y + 20}
          textAnchor="middle"
          fontSize="8"
          fill="#374151"
          className="font-mono font-medium"
        >
          {train?.number}
        </text>
        {/* Selection highlight */}
        {isSelected && (
          <circle
            cx={train?.x}
            cy={train?.y}
            r="20"
            fill="none"
            stroke="#1E40AF"
            strokeWidth="2"
            strokeDasharray="4,4"
            className="animate-pulse"
          />
        )}
      </g>
    );
  };

  const renderStation = (station) => (
    <g key={station?.id}>
      <rect
        x={station?.x - 15}
        y={station?.y - 15}
        width="30"
        height="30"
        fill="#F8FAFC"
        stroke="#64748B"
        strokeWidth="2"
        rx="4"
      />
      <rect
        x={station?.x - 8}
        y={station?.y - 8}
        width="16"
        height="16"
        fill="#1E40AF"
        rx="2"
      />
      <text
        x={station?.x}
        y={station?.y + 25}
        textAnchor="middle"
        fontSize="9"
        fill="#374151"
        className="font-medium"
      >
        {station?.name}
      </text>
      <text
        x={station?.x}
        y={station?.y + 35}
        textAnchor="middle"
        fontSize="7"
        fill="#6B7280"
      >
        {station?.platforms} platforms
      </text>
    </g>
  );

  const renderConflictHeatmap = () => {
    if (!showConflictHeatmap) return null;
    
    return (
      <g className="conflict-heatmap">
        <defs>
          <radialGradient id="conflictGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        {conflictZones?.map((zone, index) => (
          <circle
            key={index}
            cx={zone?.x}
            cy={zone?.y}
            r={zone?.radius}
            fill="url(#conflictGradient)"
            className="animate-pulse"
          />
        ))}
      </g>
    );
  };

  return (
    <div className="flex-1 bg-surface border border-border rounded-lg overflow-hidden">
      {/* Map Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-2">
          <Icon name="Map" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Network Overview</h3>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            Live
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-background rounded-md p-1">
            <Button
              variant={mapView === 'overview' ? 'default' : 'ghost'}
              size="xs"
              onClick={() => setMapView('overview')}
              className="px-2 py-1"
            >
              Overview
            </Button>
            <Button
              variant={mapView === 'detailed' ? 'default' : 'ghost'}
              size="xs"
              onClick={() => setMapView('detailed')}
              className="px-2 py-1"
            >
              Detailed
            </Button>
          </div>
          
          <Button
            variant={showTrackLabels ? 'default' : 'ghost'}
            size="xs"
            iconName="Tag"
            iconSize={14}
            onClick={() => setShowTrackLabels(!showTrackLabels)}
            className="px-2 py-1"
          />
          
          <Button
            variant={animationEnabled ? 'default' : 'ghost'}
            size="xs"
            iconName="Play"
            iconSize={14}
            onClick={() => setAnimationEnabled(!animationEnabled)}
            className="px-2 py-1"
          />
        </div>
      </div>
      {/* Map Canvas */}
      <div className="relative h-96 bg-slate-50 overflow-hidden">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 400"
          className="absolute inset-0"
        >
          {/* Grid background */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Conflict heatmap (rendered first, behind everything) */}
          {renderConflictHeatmap()}
          
          {/* Tracks */}
          {tracks?.map(renderTrack)}
          
          {/* Stations */}
          {stations?.map(renderStation)}
          
          {/* Trains */}
          {trainPositions?.map(renderTrain)}
        </svg>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <h4 className="text-xs font-semibold text-foreground mb-2">Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-2 bg-railway-safe rounded"></div>
              <span className="text-muted-foreground">Free Track</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-2 bg-railway-caution rounded"></div>
              <span className="text-muted-foreground">Occupied</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-2 bg-railway-danger rounded"></div>
              <span className="text-muted-foreground">Conflict</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-primary rounded border border-slate-400"></div>
              <span className="text-muted-foreground">Station</span>
            </div>
          </div>
        </div>

        {/* Real-time Status */}
        <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-railway-safe rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-foreground">System Online</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Last update: {new Date()?.toLocaleTimeString()}
          </div>
          <div className="text-xs text-muted-foreground">
            {trainPositions?.length} active trains
          </div>
        </div>
      </div>
      {/* Map Footer */}
      <div className="flex items-center justify-between p-3 border-t border-border bg-muted/30">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Route" size={12} />
            <span>{tracks?.length} tracks</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Building" size={12} />
            <span>{stations?.length} stations</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Train" size={12} />
            <span>{trainPositions?.length} trains</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Zoom:</span>
          <Button variant="ghost" size="xs" iconName="ZoomOut" iconSize={12} />
          <span className="text-xs font-mono">100%</span>
          <Button variant="ghost" size="xs" iconName="ZoomIn" iconSize={12} />
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;