import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrainHeader = ({ train, onNavigateTrain }) => {
  // Default Indian Railways train data if no train prop is provided
  const defaultTrain = train || {
    number: '12267',
    name: 'Mumbai Central - Ahmedabad AC Duronto Express',
    status: 'delayed',
    delay: 25,
    priority: 'high',
    currentLocation: 'En Route - Ratlam Junction',
    destination: 'Ahmedabad Junction',
    scheduledDeparture: '16:35',
    estimatedArrival: '23:28',
    platform: 'PF-16',
    currentSpeed: 95,
    maxSpeed: 130,
    passengerCount: 892,
    maxCapacity: 1128,
    hasPrevious: true,
    hasNext: true
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time':
        return 'text-railway-safe bg-railway-safe/10 border-railway-safe/20';
      case 'delayed':
        return 'text-railway-caution bg-railway-caution/10 border-railway-caution/20';
      case 'cancelled':
        return 'text-railway-danger bg-railway-danger/10 border-railway-danger/20';
      case 'maintenance':
        return 'text-secondary bg-secondary/10 border-secondary/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
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
      case 'maintenance':
        return 'Wrench';
      default:
        return 'Circle';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-railway-danger bg-railway-danger/10';
      case 'medium':
        return 'text-railway-caution bg-railway-caution/10';
      case 'low':
        return 'text-railway-safe bg-railway-safe/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Train" size={24} color="white" />
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-2xl font-semibold text-foreground">
                Train {defaultTrain?.number}
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(defaultTrain?.priority)}`}>
                {defaultTrain?.priority?.toUpperCase()} PRIORITY
              </span>
            </div>
            <p className="text-lg text-muted-foreground">{defaultTrain?.name}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{defaultTrain?.currentLocation}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Navigation" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{defaultTrain?.destination}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className={`px-4 py-2 rounded-lg border flex items-center space-x-2 ${getStatusColor(defaultTrain?.status)}`}>
            <Icon name={getStatusIcon(defaultTrain?.status)} size={16} />
            <span className="font-medium capitalize">{defaultTrain?.status?.replace('-', ' ')}</span>
            {defaultTrain?.delay > 0 && (
              <span className="text-sm">+{defaultTrain?.delay}min</span>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              onClick={() => onNavigateTrain('previous')}
              disabled={!defaultTrain?.hasPrevious}
            />
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              onClick={() => onNavigateTrain('next')}
              disabled={!defaultTrain?.hasNext}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Departure</span>
          </div>
          <p className="text-lg font-semibold text-foreground">{defaultTrain?.scheduledDeparture}</p>
          <p className="text-sm text-muted-foreground">Platform {defaultTrain?.platform}</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">ETA</span>
          </div>
          <p className="text-lg font-semibold text-foreground">{defaultTrain?.estimatedArrival}</p>
          <p className="text-sm text-muted-foreground">
            {defaultTrain?.delay > 0 ? `${defaultTrain?.delay}min late` : 'On schedule'}
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Gauge" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Speed</span>
          </div>
          <p className="text-lg font-semibold text-foreground">{defaultTrain?.currentSpeed} km/h</p>
          <p className="text-sm text-muted-foreground">Max: {defaultTrain?.maxSpeed} km/h</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Capacity</span>
          </div>
          <p className="text-lg font-semibold text-foreground">{defaultTrain?.passengerCount}</p>
          <p className="text-sm text-muted-foreground">of {defaultTrain?.maxCapacity} passengers</p>
        </div>
      </div>
    </div>
  );
};

export default TrainHeader;
