import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const RealTimeMonitoring = ({ activeCycle, monitoringData }) => {
  if (!activeCycle) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={20} color="var(--color-muted-foreground)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Real-Time Monitoring</h3>
            <p className="text-sm text-muted-foreground">No active cycle to monitor</p>
          </div>
        </div>
        <div className="text-center py-12">
          <Icon name="BarChart3" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground">Start a sterilization cycle to view real-time data</p>
        </div>
      </div>
    );
  }

  const currentTemp = monitoringData?.[monitoringData?.length - 1]?.temperature || 0;
  const currentPressure = monitoringData?.[monitoringData?.length - 1]?.pressure || 0;
  const targetTemp = 134;
  const targetPressure = 2.1;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={20} color="var(--color-warning)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Real-Time Monitoring</h3>
            <p className="text-sm text-muted-foreground">Cycle #{activeCycle?.cycleNumber} - {activeCycle?.currentPhase}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 bg-warning/10 text-warning rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
          <span>Live Data</span>
        </div>
      </div>
      {/* Current Parameters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{currentTemp}°C</div>
          <div className="text-xs text-muted-foreground">Temperature</div>
          <div className="text-xs text-success mt-1">Target: {targetTemp}°C</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{currentPressure} bar</div>
          <div className="text-xs text-muted-foreground">Pressure</div>
          <div className="text-xs text-success mt-1">Target: {targetPressure} bar</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{activeCycle?.elapsed}</div>
          <div className="text-xs text-muted-foreground">Elapsed</div>
          <div className="text-xs text-muted-foreground mt-1">Est. Total: 45 min</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{activeCycle?.progress}%</div>
          <div className="text-xs text-muted-foreground">Progress</div>
          <div className="text-xs text-muted-foreground mt-1">Phase: {activeCycle?.currentPhase}</div>
        </div>
      </div>
      {/* Temperature and Pressure Charts */}
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Thermometer" size={16} />
            <span>Temperature Curve</span>
          </h4>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monitoringData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="time" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  domain={[0, 150]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="var(--color-error)" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="targetTemp" 
                  stroke="var(--color-success)" 
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Gauge" size={16} />
            <span>Pressure Curve</span>
          </h4>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monitoringData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="time" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  domain={[0, 3]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="pressure" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="targetPressure" 
                  stroke="var(--color-success)" 
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Indicator Results */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="TestTube" size={16} />
          <span>Indicator Results</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium">Chemical Indicator</span>
            </div>
            <div className="flex items-center space-x-2 text-success text-sm">
              <Icon name="Check" size={14} />
              <span>Pass</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Thermometer" size={16} color="var(--color-warning)" />
              <span className="text-sm font-medium">Biological Indicator</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground text-sm">
              <Icon name="Clock" size={14} />
              <span>Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;