import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useTranslation } from '../../../utils/translations';

const WorkflowCard = ({ workflow }) => {
  const { t } = useTranslation();

  const getStatusColor = (status) => {
    switch (status) {
      case 'pre-disinfection':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'cleaning':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'packaging':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'sterilization':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'validation':
        return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error text-error-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const formatElapsedTime = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const diffMs = now - start;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}${t('time.hours')} ${diffMinutes}${t('time.minutes')}`;
    }
    return `${diffMinutes}${t('time.minutes')}`;
  };

  const getStageTranslation = (stage) => {
    const stageMap = {
      'pre-disinfection': 'preDisinfection',
      'cleaning': 'cleaning',
      'packaging': 'packaging',
      'sterilization': 'sterilization',
      'validation': 'validation',
      'completed': 'completed'
    };
    return t(`workflow.stages.${stageMap?.[stage]}`, stage?.replace('-', ' ')?.toUpperCase());
  };

  const getPriorityTranslation = (priority) => {
    return t(`workflow.priorities.${priority}`, priority?.toUpperCase());
  };

  const navigate = useNavigate();

  const handleView = () => {
    // route user depending on current stage for quick access
    switch (workflow?.currentStage) {
      case 'pre-disinfection':
        return navigate('/pre-disinfection-workflow');
      case 'sterilization':
      case 'validation':
        return navigate('/sterilization-cycle-management');
      case 'packaging':
      case 'cleaning':
        return navigate('/sterile-inventory-management');
      default:
        return navigate('/cssd-dashboard');
    }
  };

  const handleContinue = () => {
    // navigate to a workflow detail page if available
    navigate(`/workflow/${workflow?.id || ''}`, { state: { workflow } });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Package" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">{workflow?.id}</h3>
            <p className="text-sm text-muted-foreground">{workflow?.type}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(workflow?.priority)}`}>
          {getPriorityTranslation(workflow?.priority)}
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t('workflow.currentStage')}</span>
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(workflow?.currentStage)}`}>
            {getStageTranslation(workflow?.currentStage)}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t('workflow.operator')}</span>
          <span className="text-sm font-medium text-foreground">{workflow?.operator}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t('workflow.elapsedTime')}</span>
          <span className="text-sm font-medium text-foreground">{formatElapsedTime(workflow?.startTime)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t('workflow.itemsCount')}</span>
          <span className="text-sm font-medium text-foreground">{workflow?.itemsCount}</span>
        </div>
      </div>
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">{t('workflow.nextAction')}</span>
          <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground mb-3">{workflow?.nextAction}</p>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={handleView}
          >
            {t('common.view')}
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Play"
            iconPosition="left"
            onClick={handleContinue}
          >
            {t('common.continue')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCard;