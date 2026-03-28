import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ScenarioConfigPanel from './components/ScenarioConfigPanel';
import SimulationMap from './components/SimulationMap';
import ImpactAnalysisPanel from './components/ImpactAnalysisPanel';
import SimulationControls from './components/SimulationControls';
import ResultsComparison from './components/ResultsComparison';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const WhatIfSimulationInterface = () => {
  const navigate = useNavigate();
  const [activeScenario, setActiveScenario] = useState(null);
  const [simulationState, setSimulationState] = useState({
    isRunning: false,
    isPaused: false,
    currentTime: '10:30:00',
    progress: 0,
    canUndo: false,
    canRedo: false
  });
  const [simulationResults, setSimulationResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);

  // Initialize simulation state
  useEffect(() => {
    // Set up any initial simulation parameters
    const initializeSimulation = () => {
      setSimulationState(prev => ({
        ...prev,
        currentTime: new Date()?.toLocaleTimeString('en-US', { hour12: false })
      }));
    };

    initializeSimulation();
  }, []);

  const handleScenarioChange = (type, config) => {
    switch (type) {
      case 'apply':
        setActiveScenario(config);
        setSimulationState(prev => ({ ...prev, canUndo: true }));
        break;
      case 'reset':
        setActiveScenario(null);
        setSimulationResults(null);
        setShowResults(false);
        setSimulationState(prev => ({
          ...prev,
          isRunning: false,
          isPaused: false,
          progress: 0,
          canUndo: false,
          canRedo: false
        }));
        break;
      default:
        // Handle delay, closure, unscheduled configurations
        setActiveScenario({ type, config });
        break;
    }
  };

  const handleSimulationControl = (action, value) => {
    switch (action) {
      case 'play':
        setSimulationState(prev => ({
          ...prev,
          isRunning: true,
          isPaused: false
        }));
        break;
      case 'pause':
        setSimulationState(prev => ({
          ...prev,
          isRunning: false,
          isPaused: true
        }));
        break;
      case 'stop':
        setSimulationState(prev => ({
          ...prev,
          isRunning: false,
          isPaused: false,
          progress: 0
        }));
        break;
      case 'reset':
        setSimulationState(prev => ({
          ...prev,
          isRunning: false,
          isPaused: false,
          progress: 0,
          currentTime: '10:30:00'
        }));
        setSimulationResults(null);
        setShowResults(false);
        break;
      case 'speed':
        // Handle speed change
        console.log('Speed changed to:', value);
        break;
      case 'seek':
        setSimulationState(prev => ({
          ...prev,
          progress: value
        }));
        break;
      case 'step':
        // Handle step forward/backward
        console.log('Step:', value);
        break;
      case 'record':
        // Handle recording toggle
        console.log('Recording:', value);
        break;
      case 'quickAction':
        // Handle quick action scenarios
        handleQuickScenario(value);
        break;
      default:
        console.log('Simulation control:', action, value);
    }
  };

  const handleQuickScenario = (scenarioType) => {
    const quickScenarios = {
      'morning-rush': {
        type: 'delay',
        config: {
          trainId: 'T001',
          delayDuration: 20,
          startTime: '08:30',
          reason: 'passenger'
        }
      },
      'evening-peak': {
        type: 'delay',
        config: {
          trainId: 'T002',
          delayDuration: 15,
          startTime: '18:00',
          reason: 'signal'
        }
      },
      'maintenance-window': {
        type: 'closure',
        config: {
          trackSection: 'SEC001',
          startTime: '02:00',
          duration: 240,
          reason: 'maintenance'
        }
      },
      'emergency-response': {
        type: 'unscheduled',
        config: {
          trainType: 'emergency',
          origin: 'MUM',
          destination: 'DEL',
          departureTime: '10:45',
          priority: 'high'
        }
      }
    };

    const scenario = quickScenarios?.[scenarioType];
    if (scenario) {
      setActiveScenario(scenario);
    }
  };

  const handleSaveScenario = (scenario) => {
    // In real app, this would save to backend
    console.log('Saving scenario:', scenario);
    // Show success notification
  };

  const handleLoadScenario = (scenario) => {
    // In real app, this would load from backend
    console.log('Loading scenario:', scenario);
    setActiveScenario(scenario);
  };

  const handleRunSimulation = () => {
    if (!activeScenario) {
      alert('Please configure a scenario first');
      return;
    }

    setSimulationState(prev => ({
      ...prev,
      isRunning: true,
      isPaused: false
    }));

    // Simulate running the scenario
    setTimeout(() => {
      setSimulationResults({
        scenario: activeScenario,
        timestamp: new Date()?.toISOString(),
        impact: {
          delayIncrease: 45,
          throughputDecrease: 15,
          costIncrease: 23000
        }
      });
      setShowResults(true);
      setSimulationState(prev => ({
        ...prev,
        isRunning: false,
        isPaused: false,
        progress: 100
      }));
    }, 3000);
  };

  const handleExportResults = (exportData) => {
    // In real app, this would generate and download the file
    console.log('Exporting results:', exportData);
    
    if (exportData?.format === 'pdf') {
      // Generate PDF report
      alert('PDF report would be generated and downloaded');
    } else if (exportData?.format === 'csv') {
      // Generate CSV data
      alert('CSV data would be generated and downloaded');
    }
  };

  const toggleLeftPanel = () => {
    setIsLeftPanelCollapsed(!isLeftPanelCollapsed);
  };

  const toggleRightPanel = () => {
    setIsRightPanelCollapsed(!isRightPanelCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="main-content">
        <div className="flex h-screen pt-16">
          {/* Left Panel - Scenario Configuration */}
          <div className={`transition-all duration-300 ${
            isLeftPanelCollapsed ? 'w-12' : 'w-80'
          }`}>
            {isLeftPanelCollapsed ? (
              <div className="h-full bg-surface border-r border-border flex flex-col items-center py-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLeftPanel}
                  iconName="ChevronRight"
                  iconSize={16}
                />
                <div className="flex flex-col space-y-2 mt-4">
                  <Icon name="Settings" size={20} className="text-muted-foreground" />
                  <Icon name="Clock" size={20} className="text-railway-caution" />
                  <Icon name="XCircle" size={20} className="text-railway-danger" />
                  <Icon name="Plus" size={20} className="text-primary" />
                </div>
              </div>
            ) : (
              <ScenarioConfigPanel
                onScenarioChange={handleScenarioChange}
                activeScenario={activeScenario}
              />
            )}
          </div>

          {/* Center Panel - Simulation Map */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <SimulationMap
                activeScenario={activeScenario}
                simulationState={simulationState}
                onSimulationControl={handleSimulationControl}
              />
            </div>

            {/* Bottom Controls */}
            <SimulationControls
              onSimulationControl={handleSimulationControl}
              simulationState={simulationState}
              onSaveScenario={handleSaveScenario}
              onLoadScenario={handleLoadScenario}
            />
          </div>

          {/* Right Panel - Impact Analysis */}
          <div className={`transition-all duration-300 ${
            isRightPanelCollapsed ? 'w-12' : 'w-80'
          }`}>
            {isRightPanelCollapsed ? (
              <div className="h-full bg-surface border-l border-border flex flex-col items-center py-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleRightPanel}
                  iconName="ChevronLeft"
                  iconSize={16}
                />
                <div className="flex flex-col space-y-2 mt-4">
                  <Icon name="TrendingUp" size={20} className="text-primary" />
                  <Icon name="BarChart3" size={20} className="text-muted-foreground" />
                  <Icon name="AlertTriangle" size={20} className="text-railway-caution" />
                  <Icon name="DollarSign" size={20} className="text-muted-foreground" />
                </div>
              </div>
            ) : (
              <ImpactAnalysisPanel
                activeScenario={activeScenario}
                simulationResults={simulationResults}
              />
            )}
          </div>
        </div>

        {/* Results Modal/Overlay */}
        {showResults && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-surface rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">Simulation Results</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowResults(false)}
                  iconName="X"
                  iconSize={16}
                />
              </div>
              
              <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                <ResultsComparison
                  currentResults={{}}
                  simulatedResults={simulationResults}
                  onExport={handleExportResults}
                />
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        {activeScenario && !simulationState?.isRunning && (
          <div className="fixed bottom-6 right-6 z-40">
            <Button
              variant="default"
              size="lg"
              onClick={handleRunSimulation}
              iconName="Play"
              iconPosition="left"
              className="shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              Run Simulation
            </Button>
          </div>
        )}

        {/* Status Indicator */}
        {simulationState?.isRunning && (
          <div className="fixed top-20 right-6 z-40 bg-primary/10 border border-primary rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">
                Simulation in Progress...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatIfSimulationInterface;