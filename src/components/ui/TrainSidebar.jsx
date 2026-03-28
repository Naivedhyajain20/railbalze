import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';

const TrainSidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('number');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTrain, setSelectedTrain] = useState(null);

  // Indian Railways train data - in real app this would come from API
  const [trains] = useState([
    {
      id: 'T001',
      number: '12267',
      name: 'Mumbai Central - Ahmedabad AC Duronto Express',
      status: 'on-time',
      delay: 0,
      location: 'Platform 3, Mumbai Central',
      destination: 'Ahmedabad Junction',
      departure: '23:25',
      priority: 'high'
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
      priority: 'high'
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
      priority: 'medium'
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
      priority: 'high'
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
      priority: 'high'
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
      priority: 'high'
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
      priority: 'medium'
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
      priority: 'high'
    }
  ]);

  const sortOptions = [
    { value: 'number', label: 'Train Number' },
    { value: 'departure', label: 'Departure Time' },
    { value: 'delay', label: 'Delay Status' },
    { value: 'priority', label: 'Priority' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Trains' },
    { value: 'on-time', label: 'On Time' },
    { value: 'delayed', label: 'Delayed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  // Filter and sort trains
  const filteredTrains = trains?.filter(train => {
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
        default:
          return 0;
      }
    });

  const handleTrainSelect = (train) => {
    setSelectedTrain(train);
    navigate('/train-detail-view', { state: { trainId: train?.id } });
  };

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

  return (
    <aside className={`nav-sidebar bg-surface border-r border-border transition-all duration-300 ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
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

        {/* Search and Filters */}
        {!isCollapsed && (
          <div className="p-4 space-y-3 border-b border-border">
            <Input
              type="search"
              placeholder="Search trains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full"
            />
            
            <div className="grid grid-cols-1 gap-2">
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
                placeholder="Filter status..."
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Train List */}
        <div className="flex-1 overflow-y-auto">
          {isCollapsed ? (
            // Collapsed view - show only icons
            (<div className="p-2 space-y-2">
              {filteredTrains?.slice(0, 8)?.map((train) => (
                <button
                  key={train?.id}
                  onClick={() => handleTrainSelect(train)}
                  className="w-full p-2 rounded-md hover:bg-muted transition-colors duration-150 flex items-center justify-center group relative"
                  title={`${train?.number} - ${train?.name}`}
                >
                  <Icon 
                    name={getStatusIcon(train?.status)} 
                    size={20} 
                    className={getStatusColor(train?.status)} 
                  />
                  
                  {/* Tooltip on hover */}
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover border border-border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-tooltip whitespace-nowrap">
                    <div className="text-xs font-medium">{train?.number}</div>
                    <div className="text-xs text-muted-foreground">{train?.name}</div>
                    <div className="text-xs text-muted-foreground">{train?.location}</div>
                  </div>
                </button>
              ))}
            </div>)
          ) : (
            // Expanded view - show full train cards
            (<div className="p-2 space-y-2">
              {filteredTrains?.map((train) => (
                <button
                  key={train?.id}
                  onClick={() => handleTrainSelect(train)}
                  className={`w-full p-3 rounded-md border transition-all duration-200 text-left hover:shadow-md hover:scale-[1.01] ${
                    selectedTrain?.id === train?.id
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
                        className="text-muted-foreground" 
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
                    <div className="text-xs text-muted-foreground">
                      <Icon name="MapPin" size={12} className="inline mr-1" />
                      {train?.location}
                    </div>
                  </div>
                </button>
              ))}
              {filteredTrains?.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                  <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No trains found</p>
                  <p className="text-xs">Try adjusting your search or filters</p>
                </div>
              )}
            </div>)
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
                  <span>On Time</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-railway-caution rounded-full"></div>
                  <span>Delayed</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-railway-danger rounded-full"></div>
                  <span>Issues</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default TrainSidebar;
