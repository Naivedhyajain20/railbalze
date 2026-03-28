import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SimulationMap = ({ activeScenario, simulationState, onSimulationControl }) => {
  const [mapView, setMapView] = useState('network');
  const [showConflicts, setShowConflicts] = useState(true);
  const [showAlternativeRoutes, setShowAlternativeRoutes] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  // Mock train positions and routes
  const [trainPositions] = useState([
    { id: 'T001', x: 15, y: 25, status: 'moving', route: 'primary', delayed: false },
    { id: 'T002', x: 45, y: 35, status: 'delayed', route: 'primary', delayed: true },
    { id: 'T003', x: 75, y: 45, status: 'stopped', route: 'secondary', delayed: false },
    { id: 'T004', x: 25, y: 65, status: 'moving', route: 'freight', delayed: false },
    { id: 'T005', x: 85, y: 25, status: 'moving', route: 'express', delayed: true }
  ]);

  const [trackSections] = useState([
    { id: 'SEC001', path: 'M 10,30 Q 30,20 50,30 T 90,30', status: 'free', type: 'primary' },
    { id: 'SEC002', path: 'M 10,40 Q 40,50 70,40 T 90,40', status: 'occupied', type: 'secondary' },
    { id: 'SEC003', path: 'M 10,70 Q 50,60 90,70', status: 'conflict', type: 'freight' },
    { id: 'SEC004', path: 'M 10,20 L 90,20', status: 'closed', type: 'express' }
  ]);

  const [conflictZones] = useState([
    { id: 'C001', x: 45, y: 35, severity: 'high', radius: 8 },
    { id: 'C002', x: 75, y: 45, severity: 'medium', radius: 6 },
    { id: 'C003', x: 25, y: 65, severity: 'low', radius: 4 }
  ]);

  const getTrackColor = (status) => {
    switch (status) {
      case 'free':
        return '#059669'; // railway-safe
      case 'occupied':
        return '#D97706'; // railway-caution
      case 'conflict':
        return '#DC2626'; // railway-danger
      case 'closed':
        return '#6B7280'; // gray
      default:
        return '#6B7280';
    }
  };

  const getTrainColor = (status, delayed) => {
    if (delayed) return '#DC2626';
    switch (status) {
      case 'moving':
        return '#059669';
      case 'delayed':
        return '#D97706';
      case 'stopped':
        return '#6B7280';
      default:
        return '#059669';
    }
  };

  const getConflictColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'rgba(220, 38, 38, 0.3)';
      case 'medium':
        return 'rgba(217, 119, 6, 0.3)';
      case 'low':
        return 'rgba(107, 114, 128, 0.3)';
      default:
        return 'rgba(107, 114, 128, 0.3)';
    }
  };

  const handleMapViewChange = (view) => {
    setMapView(view);
  };

  const handleSpeedChange = (speed) => {
    setAnimationSpeed(speed);
    onSimulationControl('speed', speed);
  };

  return (
    <div className="h-full bg-surface flex flex-col">
      {/* Map Controls Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Map" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Simulation Map</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={mapView === 'network' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleMapViewChange('network')}
            >
              Network
            </Button>
            <Button
              variant={mapView === 'satellite' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleMapViewChange('satellite')}
            >
              Satellite
            </Button>
          </div>
        </div>

        {/* Toggle Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={showConflicts}
                onChange={(e) => setShowConflicts(e?.target?.checked)}
                className="rounded border-border"
              />
              <span className="text-foreground">Show Conflicts</span>
            </label>
            
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={showAlternativeRoutes}
                onChange={(e) => setShowAlternativeRoutes(e?.target?.checked)}
                className="rounded border-border"
              />
              <span className="text-foreground">Alternative Routes</span>
            </label>
          </div>

          {/* Animation Speed */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Speed:</span>
            <div className="flex items-center space-x-1">
              {[0.5, 1, 2, 4]?.map((speed) => (
                <Button
                  key={speed}
                  variant={animationSpeed === speed ? 'default' : 'ghost'}
                  size="xs"
                  onClick={() => handleSpeedChange(speed)}
                >
                  {speed}x
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Map Visualization */}
      <div className="flex-1 relative overflow-hidden">
        <svg
          viewBox="0 0 100 80"
          className="w-full h-full bg-muted/20"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid Background */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#E5E7EB" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="80" fill="url(#grid)" />

          {/* Track Sections */}
          {trackSections?.map((track) => (
            <g key={track?.id}>
              <path
                d={track?.path}
                fill="none"
                stroke={getTrackColor(track?.status)}
                strokeWidth="2"
                strokeDasharray={track?.status === 'closed' ? '5,5' : 'none'}
              />
              {/* Track Labels */}
              <text
                x={track?.id === 'SEC001' ? 50 : track?.id === 'SEC002' ? 50 : track?.id === 'SEC003' ? 50 : 50}
                y={track?.id === 'SEC001' ? 25 : track?.id === 'SEC002' ? 35 : track?.id === 'SEC003' ? 65 : 15}
                fontSize="2"
                fill="#6B7280"
                textAnchor="middle"
              >
                {track?.id}
              </text>
            </g>
          ))}

          {/* Alternative Routes */}
          {showAlternativeRoutes && (
            <g>
              <path
                d="M 10,50 Q 30,55 50,50 T 90,50"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="1.5"
                strokeDasharray="3,3"
                opacity="0.7"
              />
              <text x="50" y="55" fontSize="2" fill="#8B5CF6" textAnchor="middle">
                Alternative Route
              </text>
            </g>
          )}

          {/* Conflict Zones */}
          {showConflicts && conflictZones?.map((conflict) => (
            <circle
              key={conflict?.id}
              cx={conflict?.x}
              cy={conflict?.y}
              r={conflict?.radius}
              fill={getConflictColor(conflict?.severity)}
              stroke={conflict?.severity === 'high' ? '#DC2626' : conflict?.severity === 'medium' ? '#D97706' : '#6B7280'}
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          ))}

          {/* Train Positions */}
          {trainPositions?.map((train) => (
            <g key={train?.id}>
              <circle
                cx={train?.x}
                cy={train?.y}
                r="2"
                fill={getTrainColor(train?.status, train?.delayed)}
                stroke="white"
                strokeWidth="0.5"
              />
              {/* Train ID Labels */}
              <text
                x={train?.x}
                y={train?.y - 4}
                fontSize="2"
                fill="#374151"
                textAnchor="middle"
                fontWeight="bold"
              >
                {train?.id}
              </text>
              
              {/* Movement Indicators */}
              {train?.status === 'moving' && (
                <circle
                  cx={train?.x}
                  cy={train?.y}
                  r="3"
                  fill="none"
                  stroke={getTrainColor(train?.status, train?.delayed)}
                  strokeWidth="0.5"
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    values="2;4;2"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.5;0;0.5"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          ))}

          {/* Stations */}
          <g>
            <rect x="8" y="28" width="4" height="4" fill="#374151" rx="1" />
            <text x="10" y="36" fontSize="2" fill="#374151" textAnchor="middle">Mumbai</text>
            
            <rect x="88" y="28" width="4" height="4" fill="#374151" rx="1" />
            <text x="90" y="36" fontSize="2" fill="#374151" textAnchor="middle">Delhi</text>
            
            <rect x="48" y="68" width="4" height="4" fill="#374151" rx="1" />
            <text x="50" y="76" fontSize="2" fill="#374151" textAnchor="middle">Junction</text>
          </g>

          {/* Scenario Overlay */}
          {activeScenario && (
            <g>
              <rect
                x="2"
                y="2"
                width="30"
                height="12"
                fill="rgba(59, 130, 246, 0.1)"
                stroke="#3B82F6"
                strokeWidth="0.5"
                rx="1"
              />
              <text x="17" y="6" fontSize="2" fill="#3B82F6" textAnchor="middle" fontWeight="bold">
                SIMULATION ACTIVE
              </text>
              <text x="17" y="9" fontSize="1.5" fill="#3B82F6" textAnchor="middle">
                {activeScenario?.type?.toUpperCase()} SCENARIO
              </text>
            </g>
          )}
        </svg>

        {/* Simulation Status Overlay */}
        {simulationState?.isRunning && (
          <div className="absolute top-4 right-4 bg-primary/10 border border-primary rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">
                Simulation Running
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Time: {simulationState?.currentTime || '10:30:00'}
            </div>
          </div>
        )}
      </div>
      {/* Map Legend */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Track Status</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-1 bg-railway-safe rounded"></div>
                <span className="text-xs text-muted-foreground">Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-1 bg-railway-caution rounded"></div>
                <span className="text-xs text-muted-foreground">Occupied</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-1 bg-railway-danger rounded"></div>
                <span className="text-xs text-muted-foreground">Conflict</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Train Status</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-railway-safe rounded-full"></div>
                <span className="text-xs text-muted-foreground">On Time</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-railway-caution rounded-full"></div>
                <span className="text-xs text-muted-foreground">Delayed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-railway-danger rounded-full"></div>
                <span className="text-xs text-muted-foreground">Critical</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationMap;