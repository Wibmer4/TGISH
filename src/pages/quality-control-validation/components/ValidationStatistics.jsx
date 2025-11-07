import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ValidationStatistics = () => {
  const [timeRange, setTimeRange] = useState('today');

  const statistics = {
    today: {
      totalValidations: 24,
      approved: 22,
      rejected: 2,
      pending: 3,
      averageTime: '12 min',
      complianceRate: 91.7
    },
    week: {
      totalValidations: 168,
      approved: 158,
      rejected: 10,
      pending: 8,
      averageTime: '14 min',
      complianceRate: 94.0
    },
    month: {
      totalValidations: 720,
      approved: 695,
      rejected: 25,
      pending: 12,
      averageTime: '13 min',
      complianceRate: 96.5
    }
  };

  const currentStats = statistics?.[timeRange];

  const qualityMetrics = [
    {
      id: 'physical',
      label: 'Physical Indicators',
      passed: 98.5,
      failed: 1.5,
      icon: 'Eye',
      color: 'success'
    },
    {
      id: 'chemical',
      label: 'Chemical Indicators',
      passed: 97.2,
      failed: 2.8,
      icon: 'TestTube',
      color: 'success'
    },
    {
      id: 'biological',
      label: 'Biological Indicators',
      passed: 99.1,
      failed: 0.9,
      icon: 'Microscope',
      color: 'success'
    },
    {
      id: 'packaging',
      label: 'Packaging Integrity',
      passed: 95.8,
      failed: 4.2,
      icon: 'Package',
      color: 'warning'
    }
  ];

  const recentRejections = [
    {
      id: 'REJ-001',
      loadId: 'LD-2025-1106-089',
      reason: 'Chemical indicator failure',
      timestamp: '2025-11-06T14:30:00Z',
      inspector: 'QC-001'
    },
    {
      id: 'REJ-002',
      loadId: 'LD-2025-1106-076',
      reason: 'Packaging integrity compromised',
      timestamp: '2025-11-06T11:15:00Z',
      inspector: 'QC-002'
    },
    {
      id: 'REJ-003',
      loadId: 'LD-2025-1106-063',
      reason: 'Temperature deviation detected',
      timestamp: '2025-11-06T09:45:00Z',
      inspector: 'QC-001'
    }
  ];

  const getMetricColor = (percentage) => {
    if (percentage >= 98) return 'text-success bg-success/10';
    if (percentage >= 95) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Validation Statistics
            </h2>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e?.target?.value)}
              className="px-3 py-1 border border-border rounded-md text-sm bg-background"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm font-medium text-foreground">Approved</span>
              </div>
              <div className="text-2xl font-bold text-success">{currentStats?.approved}</div>
              <div className="text-xs text-muted-foreground">
                {((currentStats?.approved / currentStats?.totalValidations) * 100)?.toFixed(1)}% of total
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="XCircle" size={16} className="text-error" />
                <span className="text-sm font-medium text-foreground">Rejected</span>
              </div>
              <div className="text-2xl font-bold text-error">{currentStats?.rejected}</div>
              <div className="text-xs text-muted-foreground">
                {((currentStats?.rejected / currentStats?.totalValidations) * 100)?.toFixed(1)}% of total
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Clock" size={16} className="text-warning" />
                <span className="text-sm font-medium text-foreground">Pending</span>
              </div>
              <div className="text-2xl font-bold text-warning">{currentStats?.pending}</div>
              <div className="text-xs text-muted-foreground">Awaiting validation</div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Timer" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Avg. Time</span>
              </div>
              <div className="text-2xl font-bold text-primary">{currentStats?.averageTime}</div>
              <div className="text-xs text-muted-foreground">Per validation</div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingUp" size={16} className="text-accent" />
                <span className="text-sm font-medium text-foreground">Compliance</span>
              </div>
              <div className="text-2xl font-bold text-accent">{currentStats?.complianceRate}%</div>
              <div className="text-xs text-muted-foreground">Quality rate</div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="BarChart3" size={16} className="text-secondary" />
                <span className="text-sm font-medium text-foreground">Total</span>
              </div>
              <div className="text-2xl font-bold text-secondary">{currentStats?.totalValidations}</div>
              <div className="text-xs text-muted-foreground">Validations</div>
            </div>
          </div>
        </div>
      </div>
      {/* Quality Metrics */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Quality Metrics
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Indicator performance breakdown
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {qualityMetrics?.map((metric) => (
              <div key={metric?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name={metric?.icon} size={20} className="text-primary" />
                  <div>
                    <div className="font-medium text-foreground">{metric?.label}</div>
                    <div className="text-sm text-muted-foreground">
                      Pass: {metric?.passed}% | Fail: {metric?.failed}%
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMetricColor(metric?.passed)}`}>
                  {metric?.passed}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recent Rejections */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Recent Rejections
            </h3>
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
            >
              View All
            </Button>
          </div>
        </div>

        <div className="divide-y divide-border">
          {recentRejections?.length === 0 ? (
            <div className="p-8 text-center">
              <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
              <h4 className="text-lg font-medium text-foreground mb-2">No Recent Rejections</h4>
              <p className="text-muted-foreground">All recent validations have been approved</p>
            </div>
          ) : (
            recentRejections?.map((rejection) => (
              <div key={rejection?.id} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-foreground">{rejection?.loadId}</span>
                      <span className="px-2 py-1 bg-error/10 text-error rounded-full text-xs font-medium">
                        REJECTED
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{rejection?.reason}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Inspector: {rejection?.inspector}</span>
                      <span>•</span>
                      <span>{new Date(rejection.timestamp)?.toLocaleString()}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                  >
                    Details
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidationStatistics;