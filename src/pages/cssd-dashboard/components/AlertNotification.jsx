import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertNotification = ({ alert, onDismiss }) => {
  const getAlertStyle = (type) => {
    switch (type) {
      case 'error':
        return 'bg-error/10 border-error/20 text-error';
      case 'warning':
        return 'bg-warning/10 border-warning/20 text-warning';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-600';
      case 'success':
        return 'bg-success/10 border-success/20 text-success';
      default:
        return 'bg-muted border-border text-muted-foreground';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error':
        return 'AlertCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'info':
        return 'Info';
      case 'success':
        return 'CheckCircle';
      default:
        return 'Bell';
    }
  };

  return (
    <div className={`border rounded-lg p-4 ${getAlertStyle(alert?.type)}`}>
      <div className="flex items-start space-x-3">
        <Icon name={getAlertIcon(alert?.type)} size={20} />
        <div className="flex-1 min-w-0">
          <h4 className="font-heading font-medium mb-1">{alert?.title}</h4>
          <p className="text-sm opacity-90 mb-2">{alert?.message}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs opacity-75">{alert?.timestamp}</span>
            <div className="flex space-x-2">
              {alert?.actionable && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  onClick={() => console.log(`Handle alert ${alert?.id}`)}
                  className="text-inherit hover:bg-black/10"
                >
                  Handle
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => onDismiss(alert?.id)}
                className="text-inherit hover:bg-black/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertNotification;