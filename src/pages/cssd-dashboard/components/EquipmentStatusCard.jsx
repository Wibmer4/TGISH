import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EquipmentStatusCard = ({ equipment }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-success/10 text-success border-success/20';
      case 'maintenance':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'offline':
        return 'bg-error/10 text-error border-error/20';
      case 'in-use':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getEquipmentIcon = (type) => {
    switch (type) {
      case 'autoclave':
        return 'Zap';
      case 'washer':
        return 'Droplets';
      case 'dryer':
        return 'Wind';
      default:
        return 'Settings';
    }
  };

  const formatNextMaintenance = (date) => {
    const maintenanceDate = new Date(date);
    const now = new Date();
    const diffTime = maintenanceDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} days`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays <= 7) {
      return `Due in ${diffDays} days`;
    }
    return maintenanceDate?.toLocaleDateString();
  };

  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/equipment-management/${equipment?.id || ''}`, { state: { equipment } });
  };

  const handleConfigure = () => {
    navigate(`/equipment-management/${equipment?.id || ''}/configure`, { state: { equipment } });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={getEquipmentIcon(equipment?.type)} size={16} className="text-primary" />
          </div>
          <div>
            <h4 className="font-heading font-medium text-foreground">{equipment?.name}</h4>
            <p className="text-xs text-muted-foreground">{equipment?.model}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(equipment?.status)}`}>
          {equipment?.status?.replace('-', ' ')?.toUpperCase()}
        </div>
      </div>
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Cycles Today:</span>
          <span className="font-medium text-foreground">{equipment?.cyclesCount}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Total Cycles:</span>
          <span className="font-medium text-foreground">{equipment?.totalCycles?.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Next Maintenance:</span>
          <span className={`font-medium ${
            equipment?.nextMaintenance && new Date(equipment.nextMaintenance) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              ? 'text-warning' :'text-foreground'
          }`}>
            {formatNextMaintenance(equipment?.nextMaintenance)}
          </span>
        </div>
      </div>
      {equipment?.currentCycle && (
        <div className="border-t border-border pt-3 mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Current Cycle:</span>
            <span className="font-medium text-foreground">{equipment?.currentCycle?.id}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress:</span>
            <span className="font-medium text-foreground">{equipment?.currentCycle?.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5 mt-2">
            <div 
              className="bg-primary h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${equipment?.currentCycle?.progress}%` }}
            ></div>
          </div>
        </div>
      )}
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          iconName="BarChart3"
          onClick={handleView}
        />
        <Button
          variant="ghost"
          size="sm"
          iconName="Settings"
          onClick={handleConfigure}
        />
      </div>
    </div>
  );
};

export default EquipmentStatusCard;