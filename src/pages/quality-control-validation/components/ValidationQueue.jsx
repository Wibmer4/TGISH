import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ValidationQueue = ({ pendingValidations, onSelectValidation, selectedValidation }) => {
  const [sortBy, setSortBy] = useState('completedAt');
  const [filterBy, setFilterBy] = useState('all');

  const sortedValidations = [...pendingValidations]?.sort((a, b) => {
    switch (sortBy) {
      case 'completedAt':
        return new Date(b.completedAt) - new Date(a.completedAt);
      case 'priority':
        const priorityOrder = { 'urgent': 3, 'high': 2, 'normal': 1 };
        return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
      case 'loadId':
        return a?.loadId?.localeCompare(b?.loadId);
      default:
        return 0;
    }
  });

  const filteredValidations = sortedValidations?.filter(validation => {
    if (filterBy === 'all') return true;
    if (filterBy === 'urgent') return validation?.priority === 'urgent';
    if (filterBy === 'biological') return validation?.biologicalIndicator;
    return true;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-error bg-error/10 border-error/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'passed': return 'text-success bg-success/10';
      case 'failed': return 'text-error bg-error/10';
      case 'warning': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Validation Queue
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredValidations?.length} loads awaiting validation
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={() => window.location?.reload()}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e?.target?.value)}
              className="px-3 py-1 border border-border rounded-md text-sm bg-background"
            >
              <option value="all">All Loads</option>
              <option value="urgent">Urgent Priority</option>
              <option value="biological">With Biological Indicators</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="px-3 py-1 border border-border rounded-md text-sm bg-background"
            >
              <option value="completedAt">Completion Time</option>
              <option value="priority">Priority Level</option>
              <option value="loadId">Load ID</option>
            </select>
          </div>
        </div>
      </div>
      {/* Validation List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredValidations?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Pending Validations</h3>
            <p className="text-muted-foreground">All sterilization loads have been validated</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredValidations?.map((validation) => (
              <div
                key={validation?.id}
                className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                  selectedValidation?.id === validation?.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                }`}
                onClick={() => onSelectValidation(validation)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-foreground">{validation?.loadId}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(validation?.priority)}`}>
                        {validation?.priority?.toUpperCase()}
                      </span>
                      {validation?.biologicalIndicator && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                          BIO
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Autoclave:</span>
                        <div className="font-medium">{validation?.autoclaveId}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cycle:</span>
                        <div className="font-medium">{validation?.cycleNumber}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Items:</span>
                        <div className="font-medium">{validation?.itemCount} items</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Completed:</span>
                        <div className="font-medium">
                          {new Date(validation.completedAt)?.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(validation?.physicalIndicator)}`}></div>
                        <span className="text-xs text-muted-foreground">Physical: {validation?.physicalIndicator}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(validation?.chemicalIndicator)}`}></div>
                        <span className="text-xs text-muted-foreground">Chemical: {validation?.chemicalIndicator}</span>
                      </div>
                      {validation?.biologicalIndicator && (
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(validation?.biologicalResult)}`}></div>
                          <span className="text-xs text-muted-foreground">Biological: {validation?.biologicalResult}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <div className="text-right text-xs text-muted-foreground">
                      <div>Operator: {validation?.operatorId}</div>
                      <div className="mt-1">
                        {Math.floor((Date.now() - new Date(validation.completedAt)) / 60000)} min ago
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidationQueue;