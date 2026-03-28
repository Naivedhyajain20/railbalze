import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RouteVisualization = ({ train, route }) => {
  const [selectedStation, setSelectedStation] = useState(null);

  const getStationStatus = (station, currentLocation) => {
    if (station?.name === currentLocation) {
      return 'current';
    } else if (station?.passed) {
      return 'passed';
    } else if (station?.hasConflict) {
      return 'conflict';
    } else {
      return 'upcoming';
    }
  };

  const getStationColor = (status) => {
    switch (status) {
      case 'current':
        return 'bg-blue-600 border-blue-600 text-white';
      case 'passed':
        return 'bg-green-600 border-green-600 text-white';
      case 'conflict':
        return 'bg-red-600 border-red-600 text-white';
      case 'upcoming':
        return 'bg-gray-400 border-gray-400 text-white';
      default:
        return 'bg-gray-400 border-gray-400 text-white';
    }
  };

  // Updated Indian Railways route data
  const defaultRoute = route || {
    trainNumber: '12267',
    trainName: 'Mumbai Central - Ahmedabad AC Duronto Express',
    totalDistance: 492,
    estimatedDuration: '6h 45m',
    stations: [
      {
        id: 'ST001',
        name: 'Mumbai Central',
        code: 'MMCT',
        platform: 'PF-3',
        scheduledTime: '23:25',
        estimatedTime: '23:25',
        distance: 0,
        passed: true,
        hasConflict: false,
        notes: 'Departure station'
      },
      {
        id: 'ST002',
        name: 'Borivali',
        code: 'BVI',
        platform: 'PF-1',
        scheduledTime: '23:50',
        estimatedTime: '23:50',
        distance: 28,
        passed: true,
        hasConflict: false,
        delay: 0
      },
      {
        id: 'ST003',
        name: 'Virar',
        code: 'VR',
        platform: 'MAIN',
        scheduledTime: '00:08',
        estimatedTime: '00:08',
        distance: 58,
        passed: true,
        hasConflict: false,
        delay: 0
      },
      {
        id: 'ST004',
        name: 'Vapi',
        code: 'VAPI',
        platform: 'PF-2',
        scheduledTime: '01:15',
        estimatedTime: '01:20',
        distance: 123,
        passed: false,
        hasConflict: true,
        delay: 5,
        conflictReason: 'Signal clearance delayed due to freight train crossing',
        notes: 'Technical halt - Signal check in progress'
      },
      {
        id: 'ST005',
        name: 'Surat',
        code: 'ST',
        platform: 'PF-4',
        scheduledTime: '02:15',
        estimatedTime: '02:22',
        distance: 198,
        passed: false,
        hasConflict: false,
        delay: 7,
        notes: 'Commercial halt - 2 min stop'
      },
      {
        id: 'ST006',
        name: 'Bharuch Junction',
        code: 'BH',
        platform: 'MAIN-1',
        scheduledTime: '02:55',
        estimatedTime: '03:04',
        distance: 245,
        passed: false,
        hasConflict: false,
        delay: 9
      },
      {
        id: 'ST007',
        name: 'Vadodara Junction',
        code: 'BRC',
        platform: 'PF-6',
        scheduledTime: '03:40',
        estimatedTime: '03:52',
        distance: 312,
        passed: false,
        hasConflict: false,
        delay: 12,
        notes: 'Major junction - Crew change point'
      },
      {
        id: 'ST008',
        name: 'Anand Junction',
        code: 'ANND',
        platform: 'PF-1',
        scheduledTime: '04:15',
        estimatedTime: '04:29',
        distance: 356,
        passed: false,
        hasConflict: false,
        delay: 14
      },
      {
        id: 'ST009',
        name: 'Nadiad Junction',
        code: 'ND',
        platform: 'PF-3',
        scheduledTime: '04:35',
        estimatedTime: '04:51',
        distance: 378,
        passed: false,
        hasConflict: false,
        delay: 16
      },
      {
        id: 'ST010',
        name: 'Ahmedabad Junction',
        code: 'ADI',
        platform: 'PF-8',
        scheduledTime: '06:10',
        estimatedTime: '06:28',
        distance: 492,
        passed: false,
        hasConflict: false,
        delay: 18,
        notes: 'Destination station'
      }
    ]
  };

  const defaultTrain = train || {
    number: '12267',
    name: 'Mumbai Central - Ahmedabad AC Duronto Express',
    currentLocation: 'Vapi',
    routeProgress: 25,
    status: 'delayed',
    delay: 5
  };

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Icon name="Route" size={20} />
          <span>Route Visualization</span>
        </h2>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span className="text-gray-600">Passed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span className="text-gray-600">Current</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span className="text-gray-600">Conflict</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-gray-600">Upcoming</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Progress bar */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${defaultTrain?.routeProgress}%` }}
          ></div>
        </div>

        {/* Stations */}
        <div className="flex justify-between items-start relative z-10 overflow-x-auto pb-4">
          {defaultRoute?.stations?.map((station, index) => {
            const status = getStationStatus(station, defaultTrain?.currentLocation);
            const isSelected = selectedStation?.id === station?.id;
            
            return (
              <div key={station?.id} className="flex flex-col items-center space-y-2 relative min-w-0 flex-shrink-0 mx-1">
                {/* Station circle */}
                <button
                  onClick={() => setSelectedStation(isSelected ? null : station)}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-200 hover:scale-110 ${getStationColor(status)} ${
                    isSelected ? 'ring-2 ring-blue-400 ring-offset-2' : ''
                  }`}
                >
                  {status === 'current' && (
                    <Icon name="Train" size={12} className="mx-auto text-white" />
                  )}
                  {status === 'conflict' && (
                    <Icon name="AlertTriangle" size={12} className="mx-auto text-white" />
                  )}
                </button>
                
                {/* Station info */}
                <div className="text-center min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate max-w-20">
                    {station?.name}
                  </p>
                  <p className="text-xs text-gray-500 font-mono">
                    {station?.code}
                  </p>
                  <p className="text-xs text-gray-500">
                    {station?.scheduledTime}
                  </p>
                  {station?.delay > 0 && (
                    <p className="text-xs text-orange-600">
                      +{station?.delay}min
                    </p>
                  )}
                </div>

                {/* Popup details */}
                {isSelected && (
                  <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-20 min-w-64">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{station?.name}</h3>
                        <p className="text-sm text-gray-500 font-mono">{station?.code}</p>
                      </div>
                      <button
                        onClick={() => setSelectedStation(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Platform:</span>
                        <span className="text-gray-900">{station?.platform}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Scheduled:</span>
                        <span className="text-gray-900 font-mono">{station?.scheduledTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Estimated:</span>
                        <span className="text-gray-900 font-mono">{station?.estimatedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Distance:</span>
                        <span className="text-gray-900">{station?.distance} km</span>
                      </div>
                      
                      {station?.hasConflict && (
                        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
                          <div className="flex items-center space-x-2">
                            <Icon name="AlertTriangle" size={16} className="text-red-600" />
                            <span className="text-sm text-red-700 font-medium">
                              Track Conflict Detected
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {station?.conflictReason}
                          </p>
                        </div>
                      )}
                      
                      {station?.notes && (
                        <div className="mt-3 p-2 bg-gray-50 rounded">
                          <p className="text-xs text-gray-600">{station?.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MapPin" size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-500">Total Distance</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{defaultRoute?.totalDistance} km</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-500">Journey Time</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">{defaultRoute?.estimatedDuration}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Building" size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-500">Stations</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {defaultRoute?.stations?.filter(s => s?.passed)?.length} / {defaultRoute?.stations?.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteVisualization;
