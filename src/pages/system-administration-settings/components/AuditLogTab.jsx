import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AuditLogTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [dateRange, setDateRange] = useState('7days');

  const auditLogs = [
    {
      id: 'AL001',
      timestamp: '2025-09-01 10:00:15',
      user: 'Emily Davis',
      userId: 'U004',
      action: 'User Created',
      category: 'User Management',
      details: 'Created new user account for Robert Brown (robert.brown@railway.com)',
      ipAddress: '192.168.1.45',
      severity: 'info',
      affected: 'User: robert.brown@railway.com'
    },
    {
      id: 'AL002',
      timestamp: '2025-09-01 09:45:32',
      user: 'John Smith',
      userId: 'U001',
      action: 'Safety Parameter Modified',
      category: 'Safety Configuration',
      details: 'Changed minimum safe distance from 450m to 500m',
      ipAddress: '192.168.1.23',
      severity: 'warning',
      affected: 'Safety Parameter: minSafeDistance'
    },
    {
      id: 'AL003',
      timestamp: '2025-09-01 09:30:18',
      user: 'Sarah Johnson',
      userId: 'U002',
      action: 'Priority Level Changed',
      category: 'Train Priority',
      details: 'Moved Express Passenger from level 3 to level 2',
      ipAddress: '192.168.1.67',
      severity: 'info',
      affected: 'Priority: Express Passenger'
    },
    {
      id: 'AL004',
      timestamp: '2025-09-01 09:15:44',
      user: 'Emily Davis',
      userId: 'U004',
      action: 'User Role Updated',
      category: 'User Management',
      details: 'Changed Mike Wilson role from Traffic Controller to Safety Supervisor',
      ipAddress: '192.168.1.45',
      severity: 'warning',
      affected: 'User: mike.wilson@railway.com'
    },
    {
      id: 'AL005',
      timestamp: '2025-09-01 08:55:12',
      user: 'John Smith',
      userId: 'U001',
      action: 'System Preferences Updated',
      category: 'System Configuration',
      details: 'Changed data refresh interval from 60s to 30s',
      ipAddress: '192.168.1.23',
      severity: 'info',
      affected: 'System Setting: refreshInterval'
    },
    {
      id: 'AL006',
      timestamp: '2025-09-01 08:30:05',
      user: 'Emily Davis',
      userId: 'U004',
      action: 'User Deactivated',
      category: 'User Management',
      details: 'Deactivated user account for temporary leave',
      ipAddress: '192.168.1.45',
      severity: 'warning',
      affected: 'User: temp.user@railway.com'
    },
    {
      id: 'AL007',
      timestamp: '2025-09-01 08:00:33',
      user: 'System',
      userId: 'SYSTEM',
      action: 'Automated Backup',
      category: 'System Maintenance',
      details: 'Daily configuration backup completed successfully',
      ipAddress: 'localhost',
      severity: 'info',
      affected: 'System Configuration'
    },
    {
      id: 'AL008',
      timestamp: '2025-08-31 23:45:21',
      user: 'John Smith',
      userId: 'U001',
      action: 'Emergency Override',
      category: 'Safety Configuration',
      details: 'Applied emergency safety override for track section A-7',
      ipAddress: '192.168.1.23',
      severity: 'critical',
      affected: 'Track Section: A-7'
    }
  ];

  const actionOptions = [
    { value: 'all', label: 'All Actions' },
    { value: 'User Created', label: 'User Created' },
    { value: 'User Role Updated', label: 'User Role Updated' },
    { value: 'User Deactivated', label: 'User Deactivated' },
    { value: 'Safety Parameter Modified', label: 'Safety Parameter Modified' },
    { value: 'Priority Level Changed', label: 'Priority Level Changed' },
    { value: 'System Preferences Updated', label: 'System Preferences Updated' },
    { value: 'Emergency Override', label: 'Emergency Override' }
  ];

  const userOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'U001', label: 'John Smith' },
    { value: 'U002', label: 'Sarah Johnson' },
    { value: 'U004', label: 'Emily Davis' },
    { value: 'SYSTEM', label: 'System' }
  ];

  const dateRangeOptions = [
    { value: '1day', label: 'Last 24 hours' },
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' }
  ];

  const filteredLogs = auditLogs?.filter(log => {
    const matchesSearch = log?.action?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         log?.details?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         log?.user?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesAction = filterAction === 'all' || log?.action === filterAction;
    const matchesUser = filterUser === 'all' || log?.userId === filterUser;
    return matchesSearch && matchesAction && matchesUser;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-railway-danger';
      case 'warning':
        return 'text-railway-caution';
      case 'info':
        return 'text-railway-safe';
      default:
        return 'text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      default:
        return 'Circle';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'User Management':
        return 'Users';
      case 'Safety Configuration':
        return 'Shield';
      case 'Train Priority':
        return 'ArrowUpDown';
      case 'System Configuration':
        return 'Settings';
      case 'System Maintenance':
        return 'Wrench';
      default:
        return 'FileText';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleExportLogs = () => {
    console.log('Exporting audit logs...');
    // In real app, this would generate and download a CSV/PDF file
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Audit Log</h3>
          <p className="text-sm text-muted-foreground">
            Track administrative actions and system changes
          </p>
        </div>
        <Button
          variant="outline"
          iconName="Download"
          onClick={handleExportLogs}
        >
          Export Logs
        </Button>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          type="search"
          placeholder="Search logs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
        />
        <Select
          options={actionOptions}
          value={filterAction}
          onChange={setFilterAction}
          placeholder="Filter by action"
        />
        <Select
          options={userOptions}
          value={filterUser}
          onChange={setFilterUser}
          placeholder="Filter by user"
        />
        <Select
          options={dateRangeOptions}
          value={dateRange}
          onChange={setDateRange}
          placeholder="Date range"
        />
      </div>
      {/* Audit Log Entries */}
      <div className="space-y-3">
        {filteredLogs?.map((log) => (
          <div key={log?.id} className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start space-x-4">
              {/* Severity Indicator */}
              <div className="flex-shrink-0">
                <Icon 
                  name={getSeverityIcon(log?.severity)} 
                  size={20} 
                  className={getSeverityColor(log?.severity)} 
                />
              </div>

              {/* Log Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getCategoryIcon(log?.category)} 
                      size={16} 
                      className="text-muted-foreground" 
                    />
                    <h4 className="font-medium text-foreground">{log?.action}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                      log?.severity === 'critical' ? 'bg-railway-danger/10 text-railway-danger' :
                      log?.severity === 'warning'? 'bg-railway-caution/10 text-railway-caution' : 'bg-railway-safe/10 text-railway-safe'
                    }`}>
                      {log?.severity}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">
                    {formatTimestamp(log?.timestamp)}
                  </span>
                </div>

                <p className="text-sm text-foreground mb-3">{log?.details}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="User" size={12} />
                    <span>User: {log?.user}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Globe" size={12} />
                    <span>IP: {log?.ipAddress}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Target" size={12} />
                    <span>Affected: {log?.affected}</span>
                  </div>
                </div>
              </div>

              {/* Action Menu */}
              <div className="flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MoreHorizontal"
                  onClick={() => console.log('View details:', log?.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing {filteredLogs?.length} of {auditLogs?.length} log entries</span>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-railway-danger rounded-full"></div>
            <span>Critical: {auditLogs?.filter(l => l?.severity === 'critical')?.length}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-railway-caution rounded-full"></div>
            <span>Warning: {auditLogs?.filter(l => l?.severity === 'warning')?.length}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-railway-safe rounded-full"></div>
            <span>Info: {auditLogs?.filter(l => l?.severity === 'info')?.length}</span>
          </div>
        </div>
      </div>
      {/* No Results */}
      {filteredLogs?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-2">No audit logs found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search criteria or date range
          </p>
        </div>
      )}
    </div>
  );
};

export default AuditLogTab;