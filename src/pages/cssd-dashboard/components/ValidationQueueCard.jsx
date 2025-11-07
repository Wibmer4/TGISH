import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ValidationQueueCard = ({ item }) => {
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'urgent':
        return 'text-error';
      case 'high':
        return 'text-warning';
      case 'normal':
        return 'text-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatWaitTime = (timestamp) => {
    const now = new Date();
    const itemTime = new Date(timestamp);
    const diffMs = now - itemTime;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    }
    return `${diffMinutes}m`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
            <Icon name="ClipboardCheck" size={16} className="text-orange-600" />
          </div>
          <div>
            <h4 className="font-heading font-medium text-foreground">{item?.id}</h4>
            <p className="text-xs text-muted-foreground">{item?.type}</p>
          </div>
        </div>
        <div className={`text-xs font-medium ${getUrgencyColor(item?.urgency)}`}>
          {item?.urgency?.toUpperCase()}
        </div>
      </div>
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Operator:</span>
          <span className="font-medium text-foreground">{item?.operator}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Waiting:</span>
          <span className="font-medium text-foreground">{formatWaitTime(item?.timestamp)}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Items:</span>
          <span className="font-medium text-foreground">{item?.itemCount}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={() => console.log(`View validation item ${item?.id}`)}
        >
          View
        </Button>
        <Button
          variant="default"
          size="sm"
          iconName="CheckCircle"
          iconPosition="left"
          onClick={() => console.log(`Assign validation ${item?.id}`)}
        >
          Assign
        </Button>
      </div>
    </div>
  );
};

export default ValidationQueueCard;