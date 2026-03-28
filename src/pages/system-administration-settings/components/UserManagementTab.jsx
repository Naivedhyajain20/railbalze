import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserManagementTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [filterRole, setFilterRole] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const users = [
    {
      id: 'U001',
      name: 'John Smith',
      email: 'john.smith@railway.com',
      role: 'Senior Controller',
      status: 'active',
      lastLogin: '2025-09-01 09:30:00',
      permissions: ['view_trains', 'manage_routes', 'emergency_override'],
      department: 'Operations'
    },
    {
      id: 'U002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@railway.com',
      role: 'Traffic Controller',
      status: 'active',
      lastLogin: '2025-09-01 08:45:00',
      permissions: ['view_trains', 'manage_routes'],
      department: 'Operations'
    },
    {
      id: 'U003',
      name: 'Mike Wilson',
      email: 'mike.wilson@railway.com',
      role: 'Safety Supervisor',
      status: 'inactive',
      lastLogin: '2025-08-30 16:20:00',
      permissions: ['view_trains', 'safety_override', 'audit_access'],
      department: 'Safety'
    },
    {
      id: 'U004',
      name: 'Emily Davis',
      email: 'emily.davis@railway.com',
      role: 'System Administrator',
      status: 'active',
      lastLogin: '2025-09-01 07:15:00',
      permissions: ['full_access', 'user_management', 'system_config'],
      department: 'IT'
    },
    {
      id: 'U005',
      name: 'Robert Brown',
      email: 'robert.brown@railway.com',
      role: 'Data Analyst',
      status: 'active',
      lastLogin: '2025-08-31 18:30:00',
      permissions: ['view_analytics', 'export_data'],
      department: 'Analytics'
    }
  ];

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'Senior Controller', label: 'Senior Controller' },
    { value: 'Traffic Controller', label: 'Traffic Controller' },
    { value: 'Safety Supervisor', label: 'Safety Supervisor' },
    { value: 'System Administrator', label: 'System Administrator' },
    { value: 'Data Analyst', label: 'Data Analyst' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'role', label: 'Role' },
    { value: 'department', label: 'Department' },
    { value: 'lastLogin', label: 'Last Login' },
    { value: 'status', label: 'Status' }
  ];

  const filteredUsers = users?.filter(user => {
      const matchesSearch = user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           user?.department?.toLowerCase()?.includes(searchQuery?.toLowerCase());
      const matchesRole = filterRole === 'all' || user?.role === filterRole;
      return matchesSearch && matchesRole;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'role':
          return a?.role?.localeCompare(b?.role);
        case 'department':
          return a?.department?.localeCompare(b?.department);
        case 'lastLogin':
          return new Date(b.lastLogin) - new Date(a.lastLogin);
        case 'status':
          return a?.status?.localeCompare(b?.status);
        default:
          return 0;
      }
    });

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev?.includes(userId) 
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers?.length === filteredUsers?.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers?.map(user => user?.id));
    }
  };

  const handleBulkAction = (action) => {
    if (selectedUsers?.length === 0) return;
    
    const actionText = action === 'activate' ? 'activate' : 
                      action === 'deactivate' ? 'deactivate' : 'delete';
    
    if (window.confirm(`Are you sure you want to ${actionText} ${selectedUsers?.length} user(s)?`)) {
      console.log(`${actionText} users:`, selectedUsers);
      setSelectedUsers([]);
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-railway-safe' : 'text-railway-caution';
  };

  const getStatusIcon = (status) => {
    return status === 'active' ? 'CheckCircle' : 'Clock';
  };

  const formatLastLogin = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">User Management</h3>
          <p className="text-sm text-muted-foreground">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <Button
          variant="default"
          iconName="UserPlus"
          iconPosition="left"
          onClick={() => setShowAddUserModal(true)}
        >
          Add User
        </Button>
      </div>
      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="search"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
        />
        <Select
          options={roleOptions}
          value={filterRole}
          onChange={setFilterRole}
          placeholder="Filter by role"
        />
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          placeholder="Sort by"
        />
      </div>
      {/* Bulk Actions */}
      {selectedUsers?.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <span className="text-sm text-foreground">
            {selectedUsers?.length} user(s) selected
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="UserCheck"
              onClick={() => handleBulkAction('activate')}
            >
              Activate
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="UserX"
              onClick={() => handleBulkAction('deactivate')}
            >
              Deactivate
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="Trash2"
              onClick={() => handleBulkAction('delete')}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
      {/* Users Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="p-4 text-left">
                  <Checkbox
                    checked={selectedUsers?.length === filteredUsers?.length && filteredUsers?.length > 0}
                    indeterminate={selectedUsers?.length > 0 && selectedUsers?.length < filteredUsers?.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="p-4 text-left text-sm font-medium text-foreground">User</th>
                <th className="p-4 text-left text-sm font-medium text-foreground">Role</th>
                <th className="p-4 text-left text-sm font-medium text-foreground">Department</th>
                <th className="p-4 text-left text-sm font-medium text-foreground">Status</th>
                <th className="p-4 text-left text-sm font-medium text-foreground">Last Login</th>
                <th className="p-4 text-left text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr key={user?.id} className="border-t border-border hover:bg-muted/50">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedUsers?.includes(user?.id)}
                      onChange={() => handleUserSelect(user?.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} color="white" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{user?.name}</div>
                        <div className="text-sm text-muted-foreground">{user?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{user?.role}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{user?.department}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getStatusIcon(user?.status)} 
                        size={16} 
                        className={getStatusColor(user?.status)} 
                      />
                      <span className={`text-sm capitalize ${getStatusColor(user?.status)}`}>
                        {user?.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">
                      {formatLastLogin(user?.lastLogin)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Edit"
                        onClick={() => console.log('Edit user:', user?.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Key"
                        onClick={() => console.log('Manage permissions:', user?.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreHorizontal"
                        onClick={() => console.log('More actions:', user?.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing {filteredUsers?.length} of {users?.length} users</span>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-railway-safe rounded-full"></div>
            <span>Active: {users?.filter(u => u?.status === 'active')?.length}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-railway-caution rounded-full"></div>
            <span>Inactive: {users?.filter(u => u?.status === 'inactive')?.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTab;