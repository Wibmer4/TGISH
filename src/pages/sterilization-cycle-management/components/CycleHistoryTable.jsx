import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CycleHistoryTable = ({ cycles, onViewDetails, onReportFailure }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'completed', label: 'Completed' },
    { value: 'validated', label: 'Validated' },
    { value: 'failed', label: 'Failed' },
    { value: 'pending_validation', label: 'Pending Validation' }
  ];

  const dateOptions = [
    { value: '', label: 'All Dates' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  const filteredCycles = cycles?.filter(cycle => {
    const matchesSearch = cycle?.cycleNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         cycle?.operator?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         cycle?.autoclave?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    const matchesStatus = !statusFilter || cycle?.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-success/10 text-success', icon: 'CheckCircle', label: 'Completed' },
      validated: { color: 'bg-accent/10 text-accent', icon: 'Shield', label: 'Validated' },
      failed: { color: 'bg-error/10 text-error', icon: 'XCircle', label: 'Failed' },
      pending_validation: { color: 'bg-warning/10 text-warning', icon: 'Clock', label: 'Pending' }
    };

    const config = statusConfig?.[status] || statusConfig?.completed;

    return (
      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="History" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Cycle History</h3>
            <p className="text-sm text-muted-foreground">Complete sterilization cycle records</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-full text-sm font-medium text-foreground">
          <Icon name="Database" size={14} />
          <span>{cycles?.length} Total Cycles</span>
        </div>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          type="search"
          placeholder="Search cycles, operators, autoclaves..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
        />
        <Select
          placeholder="Filter by status"
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
        />
        <Select
          placeholder="Filter by date"
          options={dateOptions}
          value={dateFilter}
          onChange={setDateFilter}
        />
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-foreground">Cycle #</th>
              <th className="text-left py-3 px-4 font-medium text-foreground">Autoclave</th>
              <th className="text-left py-3 px-4 font-medium text-foreground">Program</th>
              <th className="text-left py-3 px-4 font-medium text-foreground">Items</th>
              <th className="text-left py-3 px-4 font-medium text-foreground">Operator</th>
              <th className="text-left py-3 px-4 font-medium text-foreground">Date/Time</th>
              <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
              <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCycles?.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-12">
                  <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                  <p className="text-muted-foreground">No cycles found matching your criteria</p>
                </td>
              </tr>
            ) : (
              filteredCycles?.map((cycle) => (
                <tr key={cycle?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-foreground">{cycle?.cycleNumber}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-foreground">{cycle?.autoclave}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-foreground">{cycle?.program}</div>
                    <div className="text-xs text-muted-foreground">{cycle?.duration}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-foreground">{cycle?.itemCount}</div>
                    <div className="text-xs text-muted-foreground">{cycle?.weight} kg</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-foreground">{cycle?.operator}</div>
                    {cycle?.validator && (
                      <div className="text-xs text-muted-foreground">Val: {cycle?.validator}</div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-foreground">{cycle?.date}</div>
                    <div className="text-xs text-muted-foreground">{cycle?.time}</div>
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(cycle?.status)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onViewDetails(cycle)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="FileText"
                        onClick={() => console.log('Print report')}
                      />
                      {cycle?.status === 'failed' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="AlertTriangle"
                          onClick={() => onReportFailure(cycle)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {filteredCycles?.length > 0 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing {filteredCycles?.length} of {cycles?.length} cycles
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="ChevronLeft" disabled>
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              <button className="w-8 h-8 bg-primary text-primary-foreground rounded text-sm font-medium">
                1
              </button>
            </div>
            <Button variant="outline" size="sm" iconName="ChevronRight" disabled>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CycleHistoryTable;