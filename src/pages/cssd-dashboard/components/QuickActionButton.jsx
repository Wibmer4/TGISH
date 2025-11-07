import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActionButton = ({ action, onClick }) => {
  const getActionColor = (type) => {
    switch (type) {
      case 'scan':
        return 'bg-primary text-primary-foreground hover:bg-primary/90';
      case 'start':
        return 'bg-success text-success-foreground hover:bg-success/90';
      case 'package':
        return 'bg-purple-600 text-white hover:bg-purple-700';
      case 'load':
        return 'bg-orange-600 text-white hover:bg-orange-700';
      default:
        return 'bg-secondary text-secondary-foreground hover:bg-secondary/90';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
      <div className="text-center space-y-3">
        <div className={`w-12 h-12 rounded-lg mx-auto flex items-center justify-center ${getActionColor(action?.type)}`}>
          <Button
            variant="ghost"
            size="icon"
            iconName={action?.icon}
            onClick={onClick}
            className="text-inherit hover:bg-transparent"
          />
        </div>
        <div>
          <h4 className="font-heading font-medium text-foreground mb-1">{action?.title}</h4>
          <p className="text-xs text-muted-foreground">{action?.description}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={onClick}
        >
          {action?.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default QuickActionButton;