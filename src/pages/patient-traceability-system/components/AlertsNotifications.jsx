import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsNotifications = () => {
  const [activeTab, setActiveTab] = useState('active');

  const activeAlerts = [
    {
      id: 'ALT-2025-001',
      type: 'recall',
      severity: 'high',
      title: 'Sterilization Cycle Failure - Immediate Recall Required',
      description: 'Autoclave AC-002 cycle CYC-2025-0458 failed validation. 12 sterile packs affected across 8 patient procedures.',
      affectedPacks: ['SP-2025-001240', 'SP-2025-001241', 'SP-2025-001242'],
      affectedPatients: 8,
      timestamp: '2025-11-06 15:45',
      status: 'Active',
      assignedTo: 'Quality Manager',
      actions: ['Notify OR Teams', 'Recall Packs', 'Patient Contact']
    },
    {
      id: 'ALT-2025-002',
      type: 'expiry',
      severity: 'medium',
      title: 'Sterile Pack Expiry Warning',
      description: '15 sterile packs will expire within 24 hours. Immediate use or reprocessing required.',
      affectedPacks: ['SP-2025-001230', 'SP-2025-001231', 'SP-2025-001232'],
      expiryDate: '2025-11-07',
      timestamp: '2025-11-06 08:00',
      status: 'Pending',
      assignedTo: 'CSSD Supervisor',
      actions: ['Schedule Use', 'Reprocess', 'Dispose']
    },
    {
      id: 'ALT-2025-003',
      type: 'traceability',
      severity: 'low',
      title: 'Incomplete Traceability Record',
      description: 'Patient procedure PAT-2025-001235 missing sterile pack linkage. Manual verification required.',
      patientId: 'PAT-2025-001235',
      procedure: 'Orthopedic Surgery',
      timestamp: '2025-11-06 12:30',
      status: 'Under Review',
      assignedTo: 'OR Coordinator',
      actions: ['Verify Records', 'Update System', 'Document']
    }
  ];

  const resolvedAlerts = [
    {
      id: 'ALT-2025-004',
      type: 'equipment',
      severity: 'medium',
      title: 'Autoclave Maintenance Alert - Resolved',
      description: 'AC-001 pressure sensor calibration completed successfully.',
      resolvedBy: 'Maintenance Team',
      resolvedAt: '2025-11-06 10:15',
      resolution: 'Sensor calibrated and validated. Equipment returned to service.'
    },
    {
      id: 'ALT-2025-005',
      type: 'validation',
      severity: 'low',
      title: 'Batch Validation Delay - Resolved',
      description: 'Delayed validation for batch LOT-GS-240155 completed.',
      resolvedBy: 'Quality Manager',
      resolvedAt: '2025-11-05 16:30',
      resolution: 'All validation tests passed. Batch released for distribution.'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-error/10 text-error border-error/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'recall':
        return 'AlertTriangle';
      case 'expiry':
        return 'Clock';
      case 'traceability':
        return 'Search';
      case 'equipment':
        return 'Settings';
      case 'validation':
        return 'CheckCircle';
      default:
        return 'Bell';
    }
  };

  const handleResolveAlert = (alertId) => {
    console.log('Resolving alert:', alertId);
  };

  const handleAssignAlert = (alertId) => {
    console.log('Assigning alert:', alertId);
  };

  const handleTakeAction = (alertId, action) => {
    console.log('Taking action:', action, 'for alert:', alertId);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
            <Icon name="Bell" size={20} className="text-error" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Alerts & Notifications</h3>
            <p className="text-sm text-muted-foreground">Monitor critical system alerts and recalls</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={activeTab === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('active')}
          >
            Active ({activeAlerts?.length})
          </Button>
          <Button
            variant={activeTab === 'resolved' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('resolved')}
          >
            Resolved
          </Button>
        </div>
      </div>
      {/* Active Alerts */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeAlerts?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
              <p className="text-muted-foreground">No active alerts</p>
              <p className="text-sm text-muted-foreground mt-1">All systems operating normally</p>
            </div>
          ) : (
            activeAlerts?.map((alert) => (
              <div key={alert?.id} className={`p-4 border rounded-lg ${getSeverityColor(alert?.severity)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <Icon name={getTypeIcon(alert?.type)} size={20} />
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">{alert?.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{alert?.description}</p>
                      
                      {/* Alert Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">Alert ID:</span>
                          <span className="font-medium ml-2">{alert?.id}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Assigned To:</span>
                          <span className="font-medium ml-2">{alert?.assignedTo}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Timestamp:</span>
                          <span className="font-medium ml-2">{alert?.timestamp}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <span className="font-medium ml-2">{alert?.status}</span>
                        </div>
                      </div>

                      {/* Affected Items */}
                      {alert?.affectedPacks && (
                        <div className="mb-3">
                          <span className="text-sm text-muted-foreground">Affected Packs:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {alert?.affectedPacks?.slice(0, 3)?.map((pack, index) => (
                              <span key={index} className="px-2 py-1 bg-background/50 rounded text-xs font-medium">
                                {pack}
                              </span>
                            ))}
                            {alert?.affectedPacks?.length > 3 && (
                              <span className="px-2 py-1 bg-background/50 rounded text-xs font-medium">
                                +{alert?.affectedPacks?.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {alert?.affectedPatients && (
                        <div className="mb-3">
                          <span className="text-sm text-muted-foreground">
                            Affected Patients: <span className="font-medium">{alert?.affectedPatients}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert?.severity)}`}>
                      {alert?.severity?.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-border/50">
                  {alert?.actions?.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleTakeAction(alert?.id, action)}
                    >
                      {action}
                    </Button>
                  ))}
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Check"
                    iconPosition="left"
                    onClick={() => handleResolveAlert(alert?.id)}
                  >
                    Resolve
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {/* Resolved Alerts */}
      {activeTab === 'resolved' && (
        <div className="space-y-4">
          {resolvedAlerts?.map((alert) => (
            <div key={alert?.id} className="p-4 border border-border rounded-lg bg-muted/30">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <Icon name={getTypeIcon(alert?.type)} size={20} className="text-muted-foreground" />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{alert?.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{alert?.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Resolved By:</span>
                        <span className="font-medium ml-2">{alert?.resolvedBy}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Resolved At:</span>
                        <span className="font-medium ml-2">{alert?.resolvedAt}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-success/5 border border-success/20 rounded-md">
                      <span className="text-sm font-medium text-success">Resolution:</span>
                      <p className="text-sm text-muted-foreground mt-1">{alert?.resolution}</p>
                    </div>
                  </div>
                </div>
                
                <span className="px-2 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
                  RESOLVED
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsNotifications;