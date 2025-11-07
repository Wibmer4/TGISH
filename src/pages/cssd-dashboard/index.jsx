import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import WorkflowCard from './components/WorkflowCard';
import EquipmentStatusCard from './components/EquipmentStatusCard';
import QuickActionButton from './components/QuickActionButton';
import ValidationQueueCard from './components/ValidationQueueCard';
import AlertNotification from './components/AlertNotification';
import StatsOverview from './components/StatsOverview';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useTranslation } from '../../utils/translations';

const CSSDDashboard = () => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock data for dashboard statistics
  const dashboardStats = [
    {
      id: 1,
      type: 'active',
      label: t('dashboard.stats.activeWorkflows'),
      value: '24',
      change: 12
    },
    {
      id: 2,
      type: 'completed',
      label: t('dashboard.stats.completedToday'),
      value: '156',
      change: 8
    },
    {
      id: 3,
      type: 'pending',
      label: t('dashboard.stats.pendingValidation'),
      value: '7',
      change: -15
    },
    {
      id: 4,
      type: 'equipment',
      label: t('dashboard.stats.equipmentOnline'),
      value: '12/14',
      change: 0
    }
  ];

  // Mock data for active workflows
  const activeWorkflows = [
    {
      id: 'BSK-2025-001',
      type: t('workflow.types.surgicalInstruments'),
      currentStage: 'pre-disinfection',
      operator: 'Tech-001',
      startTime: new Date(Date.now() - 45 * 60 * 1000),
      itemsCount: 24,
      priority: 'high',
      nextAction: t('workflow.actions.soakingTimeComplete')
    },
    {
      id: 'BSK-2025-002',
      type: t('workflow.types.orthopedicSet'),
      currentStage: 'cleaning',
      operator: 'Tech-002',
      startTime: new Date(Date.now() - 120 * 60 * 1000),
      itemsCount: 18,
      priority: 'medium',
      nextAction: t('workflow.actions.washerInProgress')
    },
    {
      id: 'BSK-2025-003',
      type: t('workflow.types.laparoscopyKit'),
      currentStage: 'packaging',
      operator: 'Tech-003',
      startTime: new Date(Date.now() - 180 * 60 * 1000),
      itemsCount: 12,
      priority: 'low',
      nextAction: t('workflow.actions.inspectionComplete')
    },
    {
      id: 'BSK-2025-004',
      type: t('workflow.types.generalSurgery'),
      currentStage: 'sterilization',
      operator: 'Tech-001',
      startTime: new Date(Date.now() - 90 * 60 * 1000),
      itemsCount: 32,
      priority: 'high',
      nextAction: t('workflow.actions.autoclaveInProgress')
    },
    {
      id: 'BSK-2025-005',
      type: t('workflow.types.cardiovascularSet'),
      currentStage: 'validation',
      operator: 'Tech-004',
      startTime: new Date(Date.now() - 30 * 60 * 1000),
      itemsCount: 16,
      priority: 'medium',
      nextAction: t('workflow.actions.awaitingValidation')
    },
    {
      id: 'BSK-2025-006',
      type: t('workflow.types.neurosurgeryKit'),
      currentStage: 'completed',
      operator: 'Tech-002',
      startTime: new Date(Date.now() - 240 * 60 * 1000),
      itemsCount: 8,
      priority: 'low',
      nextAction: t('workflow.actions.readyForDistribution')
    }
  ];

  // Mock data for equipment status
  const equipmentStatus = [
    {
      id: 'AC-001',
      name: t('equipment.autoclaveUnit1'),
      model: 'Steris V-PRO 1 Plus',
      type: 'autoclave',
      status: 'in-use',
      cyclesCount: 8,
      totalCycles: 12847,
      nextMaintenance: '2025-11-15',
      currentCycle: {
        id: 'CYC-2025-1106-08',
        progress: 65
      }
    },
    {
      id: 'AC-002',
      name: t('equipment.autoclaveUnit2'),
      model: 'Steris V-PRO 1 Plus',
      type: 'autoclave',
      status: 'online',
      cyclesCount: 6,
      totalCycles: 9234,
      nextMaintenance: '2025-12-01',
      currentCycle: null
    },
    {
      id: 'WD-001',
      name: t('equipment.washerDisinfector1'),
      model: 'Steris Reliance 444',
      type: 'washer',
      status: 'in-use',
      cyclesCount: 12,
      totalCycles: 15623,
      nextMaintenance: '2025-11-20',
      currentCycle: {
        id: 'WCY-2025-1106-12',
        progress: 78
      }
    },
    {
      id: 'WD-002',
      name: t('equipment.washerDisinfector2'),
      model: 'Steris Reliance 444',
      type: 'washer',
      status: 'maintenance',
      cyclesCount: 0,
      totalCycles: 18901,
      nextMaintenance: '2025-11-06',
      currentCycle: null
    },
    {
      id: 'DR-001',
      name: t('equipment.dryingCabinet1'),
      model: 'Steris Warming Cabinet',
      type: 'dryer',
      status: 'online',
      cyclesCount: 15,
      totalCycles: 8765,
      nextMaintenance: '2025-11-25',
      currentCycle: null
    },
    {
      id: 'DR-002',
      name: t('equipment.dryingCabinet2'),
      model: 'Steris Warming Cabinet',
      type: 'dryer',
      status: 'offline',
      cyclesCount: 0,
      totalCycles: 7432,
      nextMaintenance: '2025-11-10',
      currentCycle: null
    }
  ];

  // Mock data for quick actions
  const quickActions = [
    {
      id: 1,
      type: 'scan',
      icon: 'Scan',
      title: t('dashboard.quickActions.scanBasket'),
      description: t('dashboard.quickActions.scanBasketDesc'),
      buttonText: t('dashboard.quickActions.startScan'),
      action: () => window.location.href = '/pre-disinfection-workflow'
    },
    {
      id: 2,
      type: 'start',
      icon: 'Play',
      title: t('dashboard.quickActions.startCleaning'),
      description: t('dashboard.quickActions.startCleaningDesc'),
      buttonText: t('dashboard.quickActions.startCycle'),
      action: () => console.log('Start cleaning cycle')
    },
    {
      id: 3,
      type: 'package',
      icon: 'Package',
      title: t('dashboard.quickActions.packageSets'),
      description: t('dashboard.quickActions.packageSetsDesc'),
      buttonText: t('dashboard.quickActions.package'),
      action: () => console.log('Start packaging')
    },
    {
      id: 4,
      type: 'load',
      icon: 'Zap',
      title: t('dashboard.quickActions.loadAutoclave'),
      description: t('dashboard.quickActions.loadAutoclaveDesc'),
      buttonText: t('dashboard.quickActions.load'),
      action: () => window.location.href = '/sterilization-cycle-management'
    }
  ];

  // Mock data for validation queue
  const validationQueue = [
    {
      id: 'VAL-2025-001',
      type: t('workflow.types.surgicalInstruments'),
      operator: 'Tech-001',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      itemCount: 24,
      urgency: 'urgent'
    },
    {
      id: 'VAL-2025-002',
      type: t('workflow.types.orthopedicSet'),
      operator: 'Tech-003',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      itemCount: 18,
      urgency: 'high'
    },
    {
      id: 'VAL-2025-003',
      type: t('workflow.types.generalSurgery'),
      operator: 'Tech-002',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      itemCount: 32,
      urgency: 'normal'
    }
  ];

  // Initialize alerts
  useEffect(() => {
    const initialAlerts = [
      {
        id: 1,
        type: 'warning',
        title: t('alerts.soakingTimeAlert'),
        message: t('alerts.soakingTimeMessage'),
        timestamp: t('alerts.timeStamps.minAgo'),
        actionable: true
      },
      {
        id: 2,
        type: 'error',
        title: t('alerts.equipmentMaintenance'),
        message: t('alerts.equipmentMaintenanceMessage'),
        timestamp: t('alerts.timeStamps.fiveMinAgo'),
        actionable: true
      },
      {
        id: 3,
        type: 'info',
        title: t('alerts.cycleComplete'),
        message: t('alerts.cycleCompleteMessage'),
        timestamp: t('alerts.timeStamps.eightMinAgo'),
        actionable: false
      }
    ];
    setAlerts(initialAlerts);
  }, [t]);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleDismissAlert = (alertId) => {
    setAlerts(alerts?.filter(alert => alert?.id !== alertId));
  };

  const handleQuickAction = (action) => {
    if (action?.action) {
      action?.action();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Dashboard Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                {t('dashboard.title')}
              </h1>
              <p className="text-muted-foreground">
                {t('dashboard.subtitle')}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>{currentTime?.toLocaleTimeString('fr-FR')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-success">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>{t('dashboard.liveUpdates')}</span>
              </div>
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={() => window.location?.reload()}
              >
                {t('common.refresh')}
              </Button>
            </div>
          </div>

          {/* Statistics Overview */}
          <div className="mb-8">
            <StatsOverview stats={dashboardStats} />
          </div>

          {/* Alert Notifications */}
          {alerts?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
                {t('dashboard.activeAlerts')}
              </h2>
              <div className="space-y-3">
                {alerts?.map((alert) => (
                  <AlertNotification
                    key={alert?.id}
                    alert={alert}
                    onDismiss={handleDismissAlert}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
              {t('dashboard.quickActions')}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions?.map((action) => (
                <QuickActionButton
                  key={action?.id}
                  action={action}
                  onClick={() => handleQuickAction(action)}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Active Workflows */}
            <div className="xl:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  {t('dashboard.activeWorkflows')}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => window.location.href = '/pre-disinfection-workflow'}
                >
                  {t('dashboard.newWorkflow')}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeWorkflows?.map((workflow) => (
                  <WorkflowCard key={workflow?.id} workflow={workflow} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Equipment Status */}
              <div>
                <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
                  {t('dashboard.equipmentStatus')}
                </h2>
                <div className="space-y-4">
                  {equipmentStatus?.map((equipment) => (
                    <EquipmentStatusCard key={equipment?.id} equipment={equipment} />
                  ))}
                </div>
              </div>

              {/* Validation Queue */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-semibold text-foreground">
                    {t('dashboard.validationQueue')}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                    onClick={() => window.location.href = '/quality-control-validation'}
                  />
                </div>
                
                <div className="space-y-3">
                  {validationQueue?.map((item) => (
                    <ValidationQueueCard key={item?.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
              {t('dashboard.processNavigation')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button
                variant="outline"
                fullWidth
                iconName="Workflow"
                iconPosition="left"
                onClick={() => window.location.href = '/pre-disinfection-workflow'}
                className="justify-start p-4 h-auto"
              >
                <div className="text-left">
                  <div className="font-medium">{t('dashboard.navigation.preDisinfection')}</div>
                  <div className="text-xs text-muted-foreground">{t('dashboard.navigation.preDisinfectionDesc')}</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                iconName="RotateCcw"
                iconPosition="left"
                onClick={() => window.location.href = '/sterilization-cycle-management'}
                className="justify-start p-4 h-auto"
              >
                <div className="text-left">
                  <div className="font-medium">{t('dashboard.navigation.sterilizationCycles')}</div>
                  <div className="text-xs text-muted-foreground">{t('dashboard.navigation.sterilizationCyclesDesc')}</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                iconName="ShieldCheck"
                iconPosition="left"
                onClick={() => window.location.href = '/quality-control-validation'}
                className="justify-start p-4 h-auto"
              >
                <div className="text-left">
                  <div className="font-medium">{t('dashboard.navigation.qualityControl')}</div>
                  <div className="text-xs text-muted-foreground">{t('dashboard.navigation.qualityControlDesc')}</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                iconName="Search"
                iconPosition="left"
                onClick={() => window.location.href = '/patient-traceability-system'}
                className="justify-start p-4 h-auto"
              >
                <div className="text-left">
                  <div className="font-medium">{t('dashboard.navigation.patientTraceability')}</div>
                  <div className="text-xs text-muted-foreground">{t('dashboard.navigation.patientTraceabilityDesc')}</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                iconName="User"
                iconPosition="left"
                onClick={() => window.location.href = '/staff-login'}
                className="justify-start p-4 h-auto"
              >
                <div className="text-left">
                  <div className="font-medium">{t('dashboard.navigation.staffLogin')}</div>
                  <div className="text-xs text-muted-foreground">{t('dashboard.navigation.staffLoginDesc')}</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CSSDDashboard;