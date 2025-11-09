import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SoakingDataTable = ({ soakingItems, onItemAction, onBulkAction }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('startTime');
  const [sortOrder, setSortOrder] = useState('desc');

  const statusOptions = [
    { value: 'all', label: 'All Items' },
    { value: 'soaking', label: 'Currently Soaking' },
    { value: 'ready', label: 'Ready for Cleaning' },
    { value: 'overdue', label: 'Overdue Items' }
  ];

  const sortOptions = [
    { value: 'startTime', label: 'Start Time' },
    { value: 'basketId', label: 'Basket ID' },
    { value: 'sourceDepartment', label: 'Department' },
    { value: 'contaminationLevel', label: 'Contamination Level' }
  ];

  const calculateItemStatus = (item) => {
    const now = new Date();
    const elapsed = Math.floor((now - new Date(item.startTime)) / 1000);
    const totalSeconds = item?.soakingDuration * 60;
    const remaining = Math.max(0, totalSeconds - elapsed);
    
    if (remaining === 0) return 'ready';
    if (elapsed > totalSeconds * 1.1) return 'overdue';
    return 'soaking';
  };

  const getStatusBadge = (status) => {
    const badges = {
      'soaking': { color: 'bg-primary text-primary-foreground', icon: 'Clock', label: 'Soaking' },
      'ready': { color: 'bg-success text-success-foreground', icon: 'CheckCircle', label: 'Ready' },
      'overdue': { color: 'bg-error text-error-foreground', icon: 'AlertTriangle', label: 'Overdue' }
    };
    
    const badge = badges?.[status] || badges?.soaking;
    
    return (
      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${badge?.color}`}>
        <Icon name={badge?.icon} size={12} />
        <span>{badge?.label}</span>
      </div>
    );
  };

  const filteredAndSortedItems = soakingItems?.filter(item => {
      const matchesSearch = item?.basketId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           item?.sourceDepartment?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      if (filterStatus === 'all') return matchesSearch;
      return matchesSearch && calculateItemStatus(item) === filterStatus;
    })?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];
      
      if (sortBy === 'startTime') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(filteredAndSortedItems?.map(item => item?.basketId));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (basketId, checked) => {
    if (checked) {
      setSelectedItems(prev => [...prev, basketId]);
    } else {
      setSelectedItems(prev => prev?.filter(id => id !== basketId));
    }
  };

  const formatTimeRemaining = (item) => {
    const now = new Date();
    const elapsed = Math.floor((now - new Date(item.startTime)) / 1000);
    const totalSeconds = item?.soakingDuration * 60;
    const remaining = Math.max(0, totalSeconds - elapsed);
    
    if (remaining === 0) return 'Complete';
    
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  if (soakingItems?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center py-8">
          <Icon name="Table" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            No Soaking Records
          </h3>
          <p className="text-muted-foreground">
            Start registering contaminated items to see soaking data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Table Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <Icon name="Table" size={20} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Tableau des Données de Trempage
              </h3>
              <p className="text-sm text-muted-foreground">
                {filteredAndSortedItems?.length} of {soakingItems?.length} items
              </p>
            </div>
          </div>
          
          {selectedItems?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedItems?.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={() => onBulkAction('proceed', selectedItems)}
              >
                Bulk Proceed
              </Button>
            </div>
          )}
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search baskets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
          
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
          />
          
          <Select
            placeholder="Sort by"
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
          />
          
          <Button
            variant="outline"
            iconName={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
            iconPosition="left"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </Button>
        </div>
      </div>
      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4">
                <input
                  type="checkbox"
                  checked={selectedItems?.length === filteredAndSortedItems?.length && filteredAndSortedItems?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Basket ID</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Department</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Start Time</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Duration</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Remaining</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedItems?.map((item) => {
              const status = calculateItemStatus(item);
              const isSelected = selectedItems?.includes(item?.basketId);
              
              return (
                <tr key={item?.basketId} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleSelectItem(item?.basketId, e?.target?.checked)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-4">
                    <div className="font-data font-semibold text-foreground">
                      {item?.basketId}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item?.itemCount} items
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-foreground">{item?.sourceDepartment}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {item?.contaminationLevel} risk
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-foreground">
                      {new Date(item.startTime)?.toLocaleTimeString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(item.startTime)?.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-foreground">
                      {item?.soakingDuration} min
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-foreground">
                      {formatTimeRemaining(item)}
                    </div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(status)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      {status === 'ready' ? (
                        <Button
                          variant="success"
                          size="sm"
                          iconName="ArrowRight"
                          onClick={() => onItemAction('proceed', item)}
                        >
                          Proceed
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="Eye"
                            onClick={() => onItemAction('view', item)}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="AlertTriangle"
                            onClick={() => onItemAction('override', item)}
                          />
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Table Footer */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Showing {filteredAndSortedItems?.length} of {soakingItems?.length} items
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span>Ready ({soakingItems?.filter(item => calculateItemStatus(item) === 'ready')?.length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span>Soaking ({soakingItems?.filter(item => calculateItemStatus(item) === 'soaking')?.length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span>Overdue ({soakingItems?.filter(item => calculateItemStatus(item) === 'overdue')?.length})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoakingDataTable;