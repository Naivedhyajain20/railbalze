import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const GlobalSearch = ({ className = '' }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  // Mock search data - in real app this would come from API
  const searchData = [
    // Trains
    { id: 'T001', type: 'train', title: '12345 - Express Mumbai', subtitle: 'Platform 3, On Time', path: '/train-detail-view', icon: 'Train' },
    { id: 'T002', type: 'train', title: '67890 - Delhi Express', subtitle: 'En Route, Delayed 15min', path: '/train-detail-view', icon: 'Train' },
    { id: 'T003', type: 'train', title: '11111 - Local Service', subtitle: 'Depot, Cancelled', path: '/train-detail-view', icon: 'Train' },
    
    // Routes
    { id: 'R001', type: 'route', title: 'Mumbai-Delhi Route', subtitle: 'Main corridor, 5 active trains', path: '/main-dashboard', icon: 'Route' },
    { id: 'R002', type: 'route', title: 'Chennai-Bangalore Route', subtitle: 'Secondary line, 3 active trains', path: '/main-dashboard', icon: 'Route' },
    
    // Stations
    { id: 'S001', type: 'station', title: 'Mumbai Central', subtitle: '12 platforms, High traffic', path: '/main-dashboard', icon: 'Building' },
    { id: 'S002', type: 'station', title: 'New Delhi', subtitle: '16 platforms, Very high traffic', path: '/main-dashboard', icon: 'Building' },
    
    // Analytics
    { id: 'A001', type: 'analytics', title: 'Performance Dashboard', subtitle: 'KPIs and metrics', path: '/analytics-and-kpi-dashboard', icon: 'BarChart3' },
    { id: 'A002', type: 'analytics', title: 'Delay Analysis', subtitle: 'Historical delay patterns', path: '/analytics-and-kpi-dashboard', icon: 'TrendingUp' },
    
    // Simulations
    { id: 'SIM001', type: 'simulation', title: 'Route Optimization', subtitle: 'What-if scenario planning', path: '/what-if-simulation-interface', icon: 'PlayCircle' },
    { id: 'SIM002', type: 'simulation', title: 'Capacity Planning', subtitle: 'Traffic flow simulation', path: '/what-if-simulation-interface', icon: 'Zap' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      switch (event?.key) {
        case 'ArrowDown':
          event?.preventDefault();
          setSelectedIndex(prev => 
            prev < results?.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          event?.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          event?.preventDefault();
          if (selectedIndex >= 0 && results?.[selectedIndex]) {
            handleResultClick(results?.[selectedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSelectedIndex(-1);
          searchRef?.current?.blur();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  useEffect(() => {
    if (query?.trim()) {
      const filtered = searchData?.filter(item =>
        item?.title?.toLowerCase()?.includes(query?.toLowerCase()) ||
        item?.subtitle?.toLowerCase()?.includes(query?.toLowerCase())
      )?.slice(0, 8);
      setResults(filtered);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e?.target?.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    if (query?.trim()) {
      // Show recent searches or popular items when focused with existing query
    }
  };

  const handleResultClick = (result) => {
    navigate(result?.path, { state: { searchQuery: query, resultId: result?.id } });
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'train':
        return 'text-primary';
      case 'route':
        return 'text-accent';
      case 'station':
        return 'text-secondary';
      case 'analytics':
        return 'text-success';
      case 'simulation':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'train':
        return 'Train';
      case 'route':
        return 'Route';
      case 'station':
        return 'Station';
      case 'analytics':
        return 'Analytics';
      case 'simulation':
        return 'Simulation';
      default:
        return 'Item';
    }
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative">
        <Icon 
          name="Search" 
          size={16} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
        />
        <input
          type="text"
          placeholder="Search trains, routes, stations..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="w-full pl-10 pr-4 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 focus:bg-background"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <Icon name="X" size={14} />
          </button>
        )}
      </div>
      {/* Search Results Dropdown */}
      {isOpen && (query?.trim() || results?.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-dropdown max-h-96 overflow-y-auto animate-fade-in">
          {results?.length > 0 ? (
            <div className="py-1">
              {results?.map((result, index) => (
                <button
                  key={result?.id}
                  onClick={() => handleResultClick(result)}
                  className={`w-full text-left px-4 py-3 hover:bg-muted transition-colors duration-150 flex items-start space-x-3 ${
                    index === selectedIndex ? 'bg-muted' : ''
                  }`}
                >
                  <Icon 
                    name={result?.icon} 
                    size={16} 
                    className={`mt-0.5 ${getTypeColor(result?.type)}`} 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground truncate">
                        {result?.title}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full bg-muted ${getTypeColor(result?.type)}`}>
                        {getTypeLabel(result?.type)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {result?.subtitle}
                    </p>
                  </div>
                  <Icon 
                    name="ArrowUpRight" 
                    size={12} 
                    className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-150" 
                  />
                </button>
              ))}
            </div>
          ) : query?.trim() ? (
            <div className="px-4 py-6 text-center text-muted-foreground">
              <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs mt-1">Try searching for trains, routes, or stations</p>
            </div>
          ) : (
            <div className="px-4 py-3">
              <p className="text-xs text-muted-foreground mb-2">Quick Access</p>
              <div className="space-y-1">
                <button
                  onClick={() => navigate('/main-dashboard')}
                  className="w-full text-left px-2 py-2 text-sm text-foreground hover:bg-muted rounded-sm transition-colors duration-150 flex items-center space-x-2"
                >
                  <Icon name="LayoutDashboard" size={14} />
                  <span>Main Dashboard</span>
                </button>
                <button
                  onClick={() => navigate('/analytics-and-kpi-dashboard')}
                  className="w-full text-left px-2 py-2 text-sm text-foreground hover:bg-muted rounded-sm transition-colors duration-150 flex items-center space-x-2"
                >
                  <Icon name="BarChart3" size={14} />
                  <span>Analytics</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;