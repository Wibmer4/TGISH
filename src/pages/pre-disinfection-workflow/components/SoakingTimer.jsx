import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SoakingTimer = ({ soakingItems, onTimerComplete, onEmergencyOverride }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateTimeRemaining = (startTime, duration) => {
    const elapsed = Math.floor((currentTime - new Date(startTime)) / 1000);
    const totalSeconds = duration * 60;
    const remaining = Math.max(0, totalSeconds - elapsed);
    
    return {
      elapsed: elapsed,
      remaining: remaining,
      isComplete: remaining === 0,
      percentage: Math.min(100, (elapsed / totalSeconds) * 100)
    };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getStatusColor = (timeInfo, contaminationLevel) => {
    if (timeInfo?.isComplete) return 'text-success';
    if (timeInfo?.percentage > 75) return 'text-warning';
    if (contaminationLevel === 'high') return 'text-error';
    return 'text-primary';
  };

  const getProgressColor = (timeInfo, contaminationLevel) => {
    if (timeInfo?.isComplete) return 'bg-success';
    if (timeInfo?.percentage > 75) return 'bg-warning';
    if (contaminationLevel === 'high') return 'bg-error';
    return 'bg-primary';
  };

  if (soakingItems?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center py-8">
          <Icon name="Timer" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            No Active Soaking Timers
          </h3>
          <p className="text-muted-foreground">
            Register contaminated items to start soaking timers
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="Timer" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Active Soaking Timers
            </h3>
            <p className="text-sm text-muted-foreground">
              {soakingItems?.length} item{soakingItems?.length !== 1 ? 's' : ''} currently soaking
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-full">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-muted-foreground">Live</span>
        </div>
      </div>
      <div className="space-y-4">
        {soakingItems?.map((item) => {
          const timeInfo = calculateTimeRemaining(item?.startTime, item?.soakingDuration);
          
          return (
            <div
              key={item?.basketId}
              className={`border rounded-lg p-4 transition-colors duration-200 ${
                timeInfo?.isComplete 
                  ? 'border-success bg-success/5' :'border-border bg-background'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={timeInfo?.isComplete ? "CheckCircle" : "Clock"} 
                    size={20} 
                    className={getStatusColor(timeInfo, item?.contaminationLevel)}
                  />
                  <div>
                    <div className="font-data font-semibold text-foreground">
                      {item?.basketId}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item?.sourceDepartment} • {item?.itemCount} items
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-semibold ${getStatusColor(timeInfo, item?.contaminationLevel)}`}>
                    {timeInfo?.isComplete ? 'COMPLETE' : formatTime(timeInfo?.remaining)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {timeInfo?.isComplete ? 'Ready for cleaning' : 'remaining'}
                  </div>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{Math.round(timeInfo?.percentage)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(timeInfo, item?.contaminationLevel)}`}
                    style={{ width: `${timeInfo?.percentage}%` }}
                  ></div>
                </div>
              </div>
              {/* Item Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Started:</span>
                  <div className="font-medium text-foreground">
                    {new Date(item.startTime)?.toLocaleTimeString()}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <div className="font-medium text-foreground">
                    {item?.soakingDuration} min
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Level:</span>
                  <div className={`font-medium capitalize ${getStatusColor(timeInfo, item?.contaminationLevel)}`}>
                    {item?.contaminationLevel}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Operator:</span>
                  <div className="font-medium text-foreground">
                    {item?.operatorId}
                  </div>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-border">
                {timeInfo?.isComplete ? (
                  <Button
                    variant="success"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                    onClick={() => onTimerComplete(item)}
                  >
                    Proceed to Cleaning
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="AlertTriangle"
                      iconPosition="left"
                      onClick={() => onEmergencyOverride(item)}
                    >
                      Emergency Override
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => console.log('View details:', item)}
                    >
                      Details
                    </Button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">
              {soakingItems?.filter(item => 
                calculateTimeRemaining(item?.startTime, item?.soakingDuration)?.isComplete
              )?.length}
            </div>
            <div className="text-xs text-muted-foreground">Ready</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-warning">
              {soakingItems?.filter(item => {
                const timeInfo = calculateTimeRemaining(item?.startTime, item?.soakingDuration);
                return !timeInfo?.isComplete && timeInfo?.percentage > 75;
              })?.length}
            </div>
            <div className="text-xs text-muted-foreground">Nearly Done</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-muted-foreground">
              {soakingItems?.filter(item => 
                !calculateTimeRemaining(item?.startTime, item?.soakingDuration)?.isComplete
              )?.length}
            </div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoakingTimer;