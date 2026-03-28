import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserProfileCard = ({ isCollapsed }) => {
  const [isOnline, setIsOnline] = useState(true);

  // Mock user data
  const user = {
    name: 'Sarah Johnson',
    role: 'Senior Traffic Controller',
    department: 'Operations Control',
    avatar: null,
    email: 'sarah.johnson@railway.com',
    employeeId: 'EMP-2024-001',
    shift: 'Day Shift (06:00 - 14:00)',
    location: 'Control Center A',
    certifications: ['Level 3 Controller', 'Safety Certified', 'Emergency Response'],
    experience: '8 years',
    lastLogin: new Date(Date.now() - 1800000), // 30 minutes ago
    stats: {
      trainsHandled: 127,
      incidentsResolved: 3,
      efficiency: 96.8,
      safetyScore: 100
    }
  };

  const formatLastLogin = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ago`;
  };

  const renderCollapsedView = () => (
    <div className="p-3 border-b border-border">
      <div className="flex flex-col items-center space-y-2">
        <div className="relative">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            {user?.avatar ? (
              <img 
                src={user?.avatar} 
                alt={user?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <Icon name="User" size={20} color="white" />
            )}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-surface ${
            isOnline ? 'bg-railway-safe' : 'bg-muted-foreground'
          }`}></div>
        </div>
        
        <div className="text-center">
          <div className="text-xs font-medium text-foreground truncate max-w-12">
            {user?.name?.split(' ')?.[0]}
          </div>
          <div className="text-xs text-muted-foreground">
            {user?.stats?.trainsHandled}
          </div>
        </div>
      </div>
    </div>
  );

  const renderExpandedView = () => (
    <div className="p-4 border-b border-border">
      {/* User Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="relative">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            {user?.avatar ? (
              <img 
                src={user?.avatar} 
                alt={user?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <Icon name="User" size={24} color="white" />
            )}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface ${
            isOnline ? 'bg-railway-safe' : 'bg-muted-foreground'
          }`}></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground truncate">
            {user?.name}
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            {user?.role}
          </p>
          <p className="text-xs text-muted-foreground">
            {user?.department}
          </p>
        </div>
        
        <Button
          variant="ghost"
          size="xs"
          iconName="Settings"
          iconSize={14}
          className="p-1"
        />
      </div>

      {/* Status Info */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Status</span>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-railway-safe' : 'bg-muted-foreground'}`}></div>
            <span className="text-foreground font-medium">
              {isOnline ? 'On Duty' : 'Off Duty'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Shift</span>
          <span className="text-foreground font-mono">{user?.shift?.split(' ')?.[0]} {user?.shift?.split(' ')?.[1]}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Location</span>
          <span className="text-foreground">{user?.location}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Last Login</span>
          <span className="text-foreground">{formatLastLogin(user?.lastLogin)}</span>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="space-y-3 mb-4">
        <h4 className="text-xs font-semibold text-foreground">Today's Performance</h4>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 rounded-lg p-2">
            <div className="flex items-center space-x-1 mb-1">
              <Icon name="Train" size={12} className="text-primary" />
              <span className="text-xs text-muted-foreground">Trains</span>
            </div>
            <div className="text-lg font-bold text-foreground">{user?.stats?.trainsHandled}</div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-2">
            <div className="flex items-center space-x-1 mb-1">
              <Icon name="CheckCircle" size={12} className="text-railway-safe" />
              <span className="text-xs text-muted-foreground">Resolved</span>
            </div>
            <div className="text-lg font-bold text-foreground">{user?.stats?.incidentsResolved}</div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-2">
            <div className="flex items-center space-x-1 mb-1">
              <Icon name="TrendingUp" size={12} className="text-railway-safe" />
              <span className="text-xs text-muted-foreground">Efficiency</span>
            </div>
            <div className="text-lg font-bold text-foreground">{user?.stats?.efficiency}%</div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-2">
            <div className="flex items-center space-x-1 mb-1">
              <Icon name="Shield" size={12} className="text-railway-safe" />
              <span className="text-xs text-muted-foreground">Safety</span>
            </div>
            <div className="text-lg font-bold text-foreground">{user?.stats?.safetyScore}%</div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="space-y-2 mb-4">
        <h4 className="text-xs font-semibold text-foreground">Certifications</h4>
        <div className="flex flex-wrap gap-1">
          {user?.certifications?.map((cert, index) => (
            <span 
              key={index}
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-foreground">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="xs"
            iconName="MessageSquare"
            iconPosition="left"
            iconSize={12}
            className="justify-start"
          >
            Messages
          </Button>
          <Button
            variant="outline"
            size="xs"
            iconName="Calendar"
            iconPosition="left"
            iconSize={12}
            className="justify-start"
          >
            Schedule
          </Button>
          <Button
            variant="outline"
            size="xs"
            iconName="FileText"
            iconPosition="left"
            iconSize={12}
            className="justify-start"
          >
            Reports
          </Button>
          <Button
            variant="outline"
            size="xs"
            iconName="HelpCircle"
            iconPosition="left"
            iconSize={12}
            className="justify-start"
          >
            Help
          </Button>
        </div>
      </div>
    </div>
  );

  return isCollapsed ? renderCollapsedView() : renderExpandedView();
};

export default UserProfileCard;