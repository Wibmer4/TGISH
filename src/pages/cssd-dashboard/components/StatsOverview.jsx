import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const getStatIcon = (type) => {
    switch (type) {
      case 'active':
        return 'Activity';
      case 'completed':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'equipment':
        return 'Settings';
      default:
        return 'BarChart3';
    }
  };

  const getStatColor = (type) => {
    switch (type) {
      case 'active':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'equipment':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats?.map((stat) => (
        <div key={stat?.id} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getStatColor(stat?.type)}`}>
              <Icon name={getStatIcon(stat?.type)} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground truncate">{stat?.label}</p>
              <p className="text-2xl font-heading font-bold text-foreground">{stat?.value}</p>
            </div>
          </div>
          
          {stat?.change && (
            <div className="flex items-center space-x-1">
              <Icon 
                name={stat?.change > 0 ? "TrendingUp" : "TrendingDown"} 
                size={14} 
                className={stat?.change > 0 ? "text-success" : "text-error"}
              />
              <span className={`text-xs font-medium ${stat?.change > 0 ? "text-success" : "text-error"}`}>
                {Math.abs(stat?.change)}%
              </span>
              <span className="text-xs text-muted-foreground">vs yesterday</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;