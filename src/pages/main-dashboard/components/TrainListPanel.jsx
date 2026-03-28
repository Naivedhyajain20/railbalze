import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TrainListPanel = ({ isCollapsed, onToggleCollapse, onTrainSelect, selectedTrainId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('number');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'card'

  // Valid Indian Railways train data
  const trains = [
    {
      id: 'T001',
      number: '12267',
      name: 'Mumbai Central - Ahmedabad AC Duronto Express',
      status: 'on-time',
      delay: 0,
      location: 'Platform 3, Mumbai Central',
      destination: 'Ahmedabad Junction',
      departure: '23:25',
      priority: 'high',
      track: 'PF-3',
      speed: 120,
      passengers: 654
    },
    {
      id: 'T002',
      number: '12951',
      name: 'Mumbai Central - New Delhi Rajdhani Express',
      status: 'delayed',
      delay: 25,
      location: 'En Route - Ratlam Junction',
      destination: 'New Delhi',
      departure: '16:35',
      priority: 'high',
      track: 'MAIN-1',
      speed: 95,
      passengers: 1128
    },
    {
      id: 'T003',
      number: '12019',
      name: 'Howrah - Ranchi Shatabdi Express',
      status: 'cancelled',
      delay: 0,
      location: 'Howrah Junction',
      destination: 'Ranchi',
      departure: '06:05',
      priority: 'medium',
      track: 'PF-12',
      speed: 0,
      passengers: 0
    },
    {
      id: 'T004',
      number: '22691',
      name: 'New Delhi - Chennai Central Rajdhani Express',
      status: 'on-time',
      delay: 0,
      location: 'Platform 16, New Delhi',
      destination: 'Chennai Central',
      departure: '15:30',
      priority: 'high',
      track: 'PF-16',
      speed: 130,
      passengers: 892
    },
    {
      id: 'T005',
      number: '12859',
      name: 'Mumbai CST - Howrah Gitanjali SF Express',
      status: 'delayed',
      delay: 45,
      location: 'En Route - Nagpur Junction',
      destination: 'Howrah Junction',
      departure: '06:00',
      priority: 'high',
      track: 'MAIN-2',
      speed: 85,
      passengers: 1246
    },
    {
      id: 'T006',
      number: '12050',
      name: 'Delhi H Nizamuddin - Agra Cantt Gatimaan Express',
      status: 'on-time',
      delay: 0,
      location: 'Platform 4, Hazrat Nizamuddin',
      destination: 'Agra Cantt',
      departure: '08:10',
      priority: 'high',
      track: 'PF-4',
      speed: 160,
      passengers: 756
    },
    {
      id: 'T007',
      number: '12506',
      name: 'Delhi Anand Vihar - Guwahati North East Express',
      status: 'delayed',
      delay: 90,
      location: 'En Route - New Jalpaiguri',
      destination: 'Guwahati',
      departure: '06:45',
      priority: 'medium',
      track: 'LOOP-1',
      speed: 75,
      passengers: 1456
    },
    {
      id: 'T008',
      number: '22626',
      name: 'Chennai Central - New Delhi Tamil Nadu Express',
      status: 'on-time',
      delay: 0,
      location: 'Platform 9, Chennai Central',
      destination: 'New Delhi',
      departure: '22:30',
      priority: 'high',
      track: 'PF-9',
      speed: 110,
      passengers: 1324
    },
    {
      id: 'T009',
      number: '12424',
      name: 'New Delhi - Dibrugarh Town Rajdhani Express',
      status: 'delayed',
      delay: 35,
      location: 'En Route - Guwahati',
      destination: 'Dibrugarh Town',
      departure: '13:55',
      priority: 'high',
      track: 'MAIN-3',
      speed: 100,
      passengers: 892
    },
    {
      id: 'T010',
      number: '12138',
      name: 'Firozpur Cantt - Mumbai CST Punjab Mail SF Express',
      status: 'on-time',
      delay: 0,
      location: 'Platform 2, Firozpur Cantt',
      destination: 'Mumbai CST',
      departure: '21:40',
      priority: 'medium',
      track: 'PF-2',
      speed: 105,
      passengers: 1156
    }
  ];

  const sortOptions = [
    { value: 'number', label: 'Train Number' },
    { value: 'departure', label: 'Departure Time' },
    { value: 'delay', label: 'Delay Duration' },
    { value: 'priority', label: 'Priority Level' },
    { value: 'track', label: 'Track Section' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Trains' },
    { value: 'on-time', label: 'On Time' },
    { value: 'delayed', label: 'Delayed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  // Filter and sort trains
  const filteredTrains = useMemo(() => {
    return trains?.filter(train => {
        const matchesSearch = train?.number?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                             train?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                             train?.destination?.toLowerCase()?.includes(searchQuery?.toLowerCase());
        const matchesStatus = filterStatus === 'all' || train?.status === filterStatus;
        return matchesSearch && matchesStatus;
      })?.sort((a, b) => {
        switch (sortBy) {
          case 'number':
            return a?.number?.localeCompare(b?.number);
          case 'departure':
            return a?.departure?.localeCompare(b?.departure);
          case 'delay':
            return b?.delay - a?.delay;
          case 'priority':
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
          case 'track':
            return a?.track?.localeCompare(b?.track);
          default:
            return 0;
        }
      });
  }, [trains, searchQuery, sortBy, filterStatus]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time':
        return 'text-railway-safe';
      case 'delayed':
        return 'text-railway-caution';
      case 'cancelled':
        return 'text-railway-danger';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-time':
        return 'CheckCircle';
      case 'delayed':
        return 'Clock';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'Minus';
      case 'low':
        return 'ArrowDown';
      default:
        return 'Circle';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-railway-danger';
      case 'medium':
        return 'text-railway-caution';
      case 'low':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const renderTrainCard = (train) => (
    <button
      key={train?.id}
      onClick={() => onTrainSelect(train)}
      className={`w-full p-3 rounded-md border transition-all duration-200 text-left hover:shadow-md hover:scale-[1.01] ${
        selectedTrainId === train?.id
          ? 'border-primary bg-primary/5' :'border-border bg-card hover:bg-muted/50'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon 
            name={getStatusIcon(train?.status)} 
            size={16} 
            className={getStatusColor(train?.status)} 
          />
          <span className="font-mono text-sm font-medium text-foreground">
            {train?.number}
          </span>
          <Icon 
            name={getPriorityIcon(train?.priority)} 
            size={12} 
            className={getPriorityColor(train?.priority)} 
          />
        </div>
        {train?.delay > 0 && (
          <span className="text-xs bg-railway-caution/10 text-railway-caution px-2 py-1 rounded">
            +{train?.delay}m
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-foreground truncate">
          {train?.name}
        </h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="truncate">{train?.destination}</span>
          <span className="font-mono">{train?.departure}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={12} />
            <span>{train?.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Route" size={12} />
            <span>Track {train?.track}</span>
          </div>
        </div>
        {viewMode === 'card' && (
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <div className="flex items-center space-x-1">
              <Icon name="Gauge" size={12} />
              <span>{train?.speed} km/h</span>
            </div>
            {train?.passengers > 0 && (
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={12} />
                <span>{train?.passengers}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </button>
  );

  const renderCollapsedView = () => (
    <div className="p-2 space-y-2">
      {filteredTrains?.slice(0, 8)?.map((train) => (
        <button
          key={train?.id}
          onClick={() => onTrainSelect(train)}
          className="w-full p-2 rounded-md hover:bg-muted transition-colors duration-150 flex items-center justify-center group relative"
          title={`${train?.number} - ${train?.name}`}
        >
          <Icon 
            name={getStatusIcon(train?.status)} 
            size={20} 
            className={getStatusColor(train?.status)} 
          />
          
          {/* Tooltip */}
          <div className="absolute left-full ml-2 px-2 py-1 bg-popover border border-border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-tooltip whitespace-nowrap">
            <div className="text-xs font-medium">{train?.number}</div>
            <div className="text-xs text-muted-foreground">{train?.name}</div>
            <div className="text-xs text-muted-foreground">Track {train?.track}</div>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <aside className={`fixed left-0 top-16 bottom-0 bg-surface border-r border-border transition-all duration-300 z-[900] ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <Icon name="Train" size={20} className="text-primary" />
              <h2 className="font-semibold text-foreground">Active Trains</h2>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {filteredTrains?.length}
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            iconSize={16}
            className="p-2"
          />
        </div>

        {/* Controls */}
        {!isCollapsed && (
          <div className="p-4 space-y-3 border-b border-border">
            <Input
              type="search"
              placeholder="Search trains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full"
            />
            
            <div className="grid grid-cols-2 gap-2">
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
                placeholder="Sort by..."
                className="w-full"
              />
              
              <Select
                options={statusOptions}
                value={filterStatus}
                onChange={setFilterStatus}
                placeholder="Filter..."
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">View Mode</span>
              <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="xs"
                  iconName="List"
                  iconSize={14}
                  onClick={() => setViewMode('list')}
                  className="px-2 py-1"
                />
                <Button
                  variant={viewMode === 'card' ? 'default' : 'ghost'}
                  size="xs"
                  iconName="LayoutGrid"
                  iconSize={14}
                  onClick={() => setViewMode('card')}
                  className="px-2 py-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Train List */}
        <div className="flex-1 overflow-y-auto">
          {isCollapsed ? (
            renderCollapsedView()
          ) : (
            <div className="p-2 space-y-2">
              {filteredTrains?.map(renderTrainCard)}
              
              {filteredTrains?.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                  <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No trains found</p>
                  <p className="text-xs">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>{filteredTrains?.length} of {trains?.length} trains</span>
              <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-railway-safe rounded-full"></div>
                  <span className="text-xs">On Time</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-railway-caution rounded-full"></div>
                  <span className="text-xs">Delayed</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-railway-danger rounded-full"></div>
                  <span className="text-xs">Issues</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default TrainListPanel;
