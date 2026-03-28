import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SimulationControls = ({ onSimulationControl, simulationState, onSaveScenario, onLoadScenario }) => {
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState('10:30:00');
  const [timelinePosition, setTimelinePosition] = useState(30);
  const [isRecording, setIsRecording] = useState(false);
  const [savedScenarios, setSavedScenarios] = useState([]);

  // Mock saved scenarios
  useEffect(() => {
    setSavedScenarios([
      { id: 'S001', name: 'Morning Rush Delay', type: 'delay', created: '2025-09-01 09:15:00' },
      { id: 'S002', name: 'Track Maintenance', type: 'closure', created: '2025-08-31 14:30:00' },
      { id: 'S003', name: 'Emergency Service', type: 'unscheduled', created: '2025-08-30 11:45:00' }
    ]);
  }, []);

  const speedOptions = [
    { value: 0.25, label: '0.25x' },
    { value: 0.5, label: '0.5x' },
    { value: 1, label: '1x' },
    { value: 2, label: '2x' },
    { value: 4, label: '4x' },
    { value: 8, label: '8x' }
  ];

  const scenarioOptions = savedScenarios?.map(scenario => ({
    value: scenario?.id,
    label: scenario?.name,
    description: `${scenario?.type} - ${new Date(scenario.created)?.toLocaleDateString()}`
  }));

  const handlePlay = () => {
    onSimulationControl('play');
  };

  const handlePause = () => {
    onSimulationControl('pause');
  };

  const handleStop = () => {
    onSimulationControl('stop');
    setTimelinePosition(0);
    setCurrentTime('10:30:00');
  };

  const handleReset = () => {
    onSimulationControl('reset');
    setTimelinePosition(0);
    setCurrentTime('10:30:00');
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    onSimulationControl('speed', speed);
  };

  const handleTimelineChange = (e) => {
    const position = parseInt(e?.target?.value);
    setTimelinePosition(position);
    
    // Calculate time based on position (0-100 represents 10:30-12:30)
    const startTime = new Date('2025-09-01 10:30:00');
    const endTime = new Date('2025-09-01 12:30:00');
    const totalDuration = endTime - startTime;
    const currentTimeMs = startTime?.getTime() + (totalDuration * position / 100);
    const newTime = new Date(currentTimeMs)?.toLocaleTimeString('en-US', { hour12: false });
    
    setCurrentTime(newTime);
    onSimulationControl('seek', position);
  };

  const handleSave = () => {
    const scenarioName = prompt('Enter scenario name:');
    if (scenarioName) {
      const newScenario = {
        id: `S${String(savedScenarios?.length + 1)?.padStart(3, '0')}`,
        name: scenarioName,
        type: 'custom',
        created: new Date()?.toISOString()
      };
      setSavedScenarios([...savedScenarios, newScenario]);
      onSaveScenario(newScenario);
    }
  };

  const handleLoad = (scenarioId) => {
    const scenario = savedScenarios?.find(s => s?.id === scenarioId);
    if (scenario) {
      onLoadScenario(scenario);
    }
  };

  const handleStepForward = () => {
    const newPosition = Math.min(timelinePosition + 5, 100);
    setTimelinePosition(newPosition);
    onSimulationControl('step', 'forward');
  };

  const handleStepBackward = () => {
    const newPosition = Math.max(timelinePosition - 5, 0);
    setTimelinePosition(newPosition);
    onSimulationControl('step', 'backward');
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    onSimulationControl('record', !isRecording);
  };

  const formatTime = (timeString) => {
    return new Date(`2025-09-01 ${timeString}`)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="bg-surface border-t border-border p-4">
      {/* Main Controls Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Playback Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleStepBackward}
            disabled={timelinePosition === 0}
            iconName="SkipBack"
            iconSize={16}
          />
          
          {simulationState?.isRunning ? (
            <Button
              variant="default"
              size="sm"
              onClick={handlePause}
              iconName="Pause"
              iconSize={16}
            />
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={handlePlay}
              iconName="Play"
              iconSize={16}
            />
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleStop}
            iconName="Square"
            iconSize={16}
          />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleStepForward}
            disabled={timelinePosition === 100}
            iconName="SkipForward"
            iconSize={16}
          />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            iconName="RotateCcw"
            iconSize={16}
          />
        </div>

        {/* Speed Control */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Speed:</span>
          <Select
            options={speedOptions}
            value={playbackSpeed}
            onChange={handleSpeedChange}
            className="w-20"
          />
        </div>

        {/* Recording and Save/Load */}
        <div className="flex items-center space-x-2">
          <Button
            variant={isRecording ? "destructive" : "ghost"}
            size="sm"
            onClick={toggleRecording}
            iconName="Circle"
            iconSize={16}
          >
            {isRecording ? 'Recording' : 'Record'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            iconName="Save"
            iconSize={16}
          >
            Save
          </Button>
          
          <Select
            options={scenarioOptions}
            value=""
            onChange={handleLoad}
            placeholder="Load scenario..."
            className="w-40"
          />
        </div>
      </div>
      {/* Timeline Scrubber */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Timeline</span>
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">Current Time:</span>
            <span className="font-mono text-foreground">{formatTime(currentTime)}</span>
            <div className={`flex items-center space-x-1 ${
              simulationState?.isRunning ? 'text-primary' : 'text-muted-foreground'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                simulationState?.isRunning ? 'bg-primary animate-pulse' : 'bg-muted-foreground'
              }`}></div>
              <span className="text-xs">
                {simulationState?.isRunning ? 'Running' : 'Paused'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={timelinePosition}
            onChange={handleTimelineChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${timelinePosition}%, #E5E7EB ${timelinePosition}%, #E5E7EB 100%)`
            }}
          />
          
          {/* Timeline Markers */}
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>10:30</span>
            <span>11:00</span>
            <span>11:30</span>
            <span>12:00</span>
            <span>12:30</span>
          </div>
        </div>
      </div>
      {/* Status Information */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Duration: {Math.floor(timelinePosition * 1.2)}min
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Speed: {playbackSpeed}x
            </span>
          </div>
          
          {isRecording && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-red-600">Recording session</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            iconName="Undo"
            iconSize={16}
            disabled={!simulationState?.canUndo}
          >
            Undo
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Redo"
            iconSize={16}
            disabled={!simulationState?.canRedo}
          >
            Redo
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            iconSize={16}
          >
            Settings
          </Button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex items-center justify-center space-x-2 mt-4 pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onSimulationControl('quickAction', 'morning-rush')}
        >
          Morning Rush
        </Button>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onSimulationControl('quickAction', 'evening-peak')}
        >
          Evening Peak
        </Button>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onSimulationControl('quickAction', 'maintenance-window')}
        >
          Maintenance
        </Button>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onSimulationControl('quickAction', 'emergency-response')}
        >
          Emergency
        </Button>
      </div>
    </div>
  );
};

export default SimulationControls;