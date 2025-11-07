import React, { useState } from 'react';
// Header is provided by Layout
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PatientCaseRegistration from './components/PatientCaseRegistration';
import TraceabilitySearch from './components/TraceabilitySearch';
import TraceabilityReports from './components/TraceabilityReports';
import AlertsNotifications from './components/AlertsNotifications';

const PatientTraceabilitySystem = () => {
  const [activeTab, setActiveTab] = useState('registration');

  const navigationTabs = [
    {
      id: 'registration',
      label: 'Patient Registration',
      icon: 'UserPlus',
      description: 'Link sterile packs to patient procedures'
    },
    {
      id: 'search',
      label: 'Traceability Search',
      icon: 'Search',
      description: 'Search and trace sterilization records'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: 'FileText',
      description: 'Generate compliance reports'
    },
    {
      id: 'alerts',
      label: 'Alerts',
      icon: 'Bell',
      description: 'Monitor system alerts and recalls'
    }
  ];

  const systemStats = [
    {
      label: 'Active Patients',
      value: '1,247',
      change: '+23',
      changeType: 'increase',
      icon: 'Users',
      color: 'primary'
    },
    {
      label: 'Traced Procedures',
      value: '3,456',
      change: '+89',
      changeType: 'increase',
      icon: 'Activity',
      color: 'success'
    },
    {
      label: 'Active Alerts',
      value: '3',
      change: '-2',
      changeType: 'decrease',
      icon: 'AlertTriangle',
      color: 'warning'
    },
    {
      label: 'Compliance Rate',
      value: '99.8%',
      change: '+0.2%',
      changeType: 'increase',
      icon: 'ShieldCheck',
      color: 'accent'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'registration':
        return <PatientCaseRegistration />;
      case 'search':
        return <TraceabilitySearch />;
      case 'reports':
        return <TraceabilityReports />;
      case 'alerts':
        return <AlertsNotifications />;
      default:
        return <PatientCaseRegistration />;
    }
  };

  const exportData = () => {
    // simple CSV export of system statistics as an example
    const headers = ['label','value','change','changeType'];
    const rows = [headers.join(',')];
    systemStats?.forEach(s => {
      rows.push([
        '"' + String(s.label).replace(/"/g,'""') + '"',
        '"' + String(s.value).replace(/"/g,'""') + '"',
        '"' + String(s.change).replace(/"/g,'""') + '"',
        '"' + String(s.changeType).replace(/"/g,'""') + '"'
      ].join(','));
    });

    const csv = rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `patient_traceability_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatColor = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary/10 text-primary';
      case 'success':
        return 'bg-success/10 text-success';
      case 'warning':
        return 'bg-warning/10 text-warning';
      case 'accent':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
  <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Search" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Patient Traceability System</h1>
                  <p className="text-muted-foreground">
                    Comprehensive patient safety and sterilization traceability management
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-success/10 text-success rounded-lg text-sm font-medium">
                  <Icon name="Shield" size={16} />
                  <span>ISO 8402 Compliant</span>
                </div>
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={exportData}
                >
                  Export Data
                </Button>
              </div>
            </div>
          </div>

          {/* System Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {systemStats?.map((stat, index) => (
              <div key={index} className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatColor(stat?.color)}`}>
                    <Icon name={stat?.icon} size={20} />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat?.changeType === 'increase' ?'bg-success/10 text-success' :'bg-primary/10 text-primary'
                  }`}>
                    {stat?.change}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{stat?.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat?.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="bg-card rounded-lg border border-border mb-6">
            <div className="flex flex-wrap border-b border-border">
              {navigationTabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-3 px-6 py-4 text-sm font-medium transition-colors duration-200 border-b-2 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <div className="text-left">
                    <div>{tab?.label}</div>
                    <div className="text-xs opacity-75 hidden sm:block">{tab?.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {renderTabContent()}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                iconName="Scan"
                iconPosition="left"
                fullWidth
              >
                Emergency Scan
              </Button>
              <Button
                variant="outline"
                iconName="AlertTriangle"
                iconPosition="left"
                fullWidth
              >
                Report Issue
              </Button>
              <Button
                variant="outline"
                iconName="FileText"
                iconPosition="left"
                fullWidth
              >
                Generate Report
              </Button>
              <Button
                variant="outline"
                iconName="Phone"
                iconPosition="left"
                fullWidth
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>© {new Date()?.getFullYear()} CSSD Traceability System</span>
              <span>•</span>
              <span>ISO 8402 Certified</span>
              <span>•</span>
              <span>Matériovigilance Compliant</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Version 2.1.0</span>
              <span>•</span>
              <span>Last Updated: Nov 2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PatientTraceabilitySystem;