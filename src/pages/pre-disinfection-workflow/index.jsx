import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BarcodeScanner from './components/BarcodeScanner';
import RegistrationForm from './components/RegistrationForm';
import SoakingTimer from './components/SoakingTimer';
import SoakingDataTable from './components/SoakingDataTable';

const PreDisinfectionWorkflow = () => {
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [currentScan, setCurrentScan] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [soakingItems, setSoakingItems] = useState([]);
  const [workflowStats, setWorkflowStats] = useState({
    totalProcessed: 156,
    currentSoaking: 8,
    readyForCleaning: 3,
    averageSoakTime: 28
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockSoakingItems = [
      {
        basketId: "BSK001",
        sourceDepartment: "OR-1",
        contaminationLevel: "standard",
        operatorId: "TECH-001",
        itemCount: 12,
        startTime: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        soakingDuration: 15,
        status: "soaking",
        notes: "Standard surgical instruments from appendectomy"
      },
      {
        basketId: "BSK002",
        sourceDepartment: "OR-2",
        contaminationLevel: "medium",
        operatorId: "TECH-001",
        itemCount: 8,
        startTime: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
        soakingDuration: 30,
        status: "soaking",
        notes: "Blood-contaminated orthopedic tools"
      },
      {
        basketId: "ITR001",
        sourceDepartment: "ICU",
        contaminationLevel: "high",
        operatorId: "TECH-002",
        itemCount: 6,
        startTime: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
        soakingDuration: 60,
        status: "soaking",
        notes: "Prion risk - neurological procedure instruments"
      },
      {
        basketId: "BSK003",
        sourceDepartment: "ER",
        contaminationLevel: "standard",
        operatorId: "TECH-001",
        itemCount: 15,
        startTime: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
        soakingDuration: 15,
        status: "ready",
        notes: "Emergency trauma instruments"
      }
    ];
    
    setSoakingItems(mockSoakingItems);
  }, []);

  const handleScanSuccess = (scanData) => {
    setCurrentScan(scanData);
    setShowRegistrationForm(true);
  };

  const handleRegistrationSubmit = (registrationData) => {
    const newSoakingItem = {
      ...registrationData,
      startTime: new Date(),
      status: 'soaking'
    };
    
    setSoakingItems(prev => [...prev, newSoakingItem]);
    setShowRegistrationForm(false);
    setCurrentScan(null);
    
    // Update stats
    setWorkflowStats(prev => ({
      ...prev,
      totalProcessed: prev?.totalProcessed + 1,
      currentSoaking: prev?.currentSoaking + 1
    }));
  };

  const handleRegistrationCancel = () => {
    setShowRegistrationForm(false);
    setCurrentScan(null);
  };

  const handleTimerComplete = (item) => {
    // Navigate to cleaning workflow
    console.log('Proceeding to cleaning workflow for:', item?.basketId);
    
    // Update item status
    setSoakingItems(prev => 
      prev?.map(soakItem => 
        soakItem?.basketId === item?.basketId 
          ? { ...soakItem, status: 'ready' }
          : soakItem
      )
    );
    
    // Update stats
    setWorkflowStats(prev => ({
      ...prev,
      currentSoaking: prev?.currentSoaking - 1,
      readyForCleaning: prev?.readyForCleaning + 1
    }));
  };

  const handleEmergencyOverride = (item) => {
    const reason = prompt('Enter reason for emergency override:');
    if (reason) {
      console.log('Emergency override for:', item?.basketId, 'Reason:', reason);
      
      // Mark as ready with override flag
      setSoakingItems(prev => 
        prev?.map(soakItem => 
          soakItem?.basketId === item?.basketId 
            ? { ...soakItem, status: 'ready', emergencyOverride: true, overrideReason: reason }
            : soakItem
        )
      );
    }
  };

  const handleItemAction = (action, item) => {
    switch (action) {
      case 'proceed':
        handleTimerComplete(item);
        break;
      case 'override':
        handleEmergencyOverride(item);
        break;
      case 'view': console.log('Viewing item details:', item);
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleBulkAction = (action, selectedIds) => {
    console.log('Bulk action:', action, 'for items:', selectedIds);
    
    if (action === 'proceed') {
      setSoakingItems(prev => 
        prev?.map(item => 
          selectedIds?.includes(item?.basketId)
            ? { ...item, status: 'ready' }
            : item
        )
      );
    }
  };

  const navigateToWorkflow = (path) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Workflow" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-3xl font-heading font-bold text-foreground">
                    Pre-Disinfection Workflow
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Contaminated basket registration and soaking time management
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="ArrowLeft"
                  iconPosition="left"
                  onClick={() => navigateToWorkflow('/cssd-dashboard')}
                >
                  Dashboard
                </Button>
                <Button
                  variant="default"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={() => navigateToWorkflow('/sterilization-cycle-management')}
                >
                  Next: Cleaning
                </Button>
              </div>
            </div>
          </div>

          {/* Workflow Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Processed</p>
                  <p className="text-2xl font-bold text-foreground">{workflowStats?.totalProcessed}</p>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={20} className="text-primary" />
                </div>
              </div>
              <div className="mt-2 text-xs text-success">
                +12 from yesterday
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Currently Soaking</p>
                  <p className="text-2xl font-bold text-warning">{workflowStats?.currentSoaking}</p>
                </div>
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Timer" size={20} className="text-warning" />
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Active timers running
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ready for Cleaning</p>
                  <p className="text-2xl font-bold text-success">{workflowStats?.readyForCleaning}</p>
                </div>
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>
              </div>
              <div className="mt-2 text-xs text-success">
                Soaking complete
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Soak Time</p>
                  <p className="text-2xl font-bold text-foreground">{workflowStats?.averageSoakTime}m</p>
                </div>
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-accent" />
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Per contamination level
              </div>
            </div>
          </div>

          {/* Main Workflow Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Barcode Scanner Section */}
            <div className="space-y-6">
              <BarcodeScanner
                onScanSuccess={handleScanSuccess}
                isActive={isScannerActive}
                onToggleScanner={() => setIsScannerActive(!isScannerActive)}
              />
              
              {/* Registration Form */}
              {showRegistrationForm && currentScan && (
                <RegistrationForm
                  scanData={currentScan}
                  onSubmit={handleRegistrationSubmit}
                  onCancel={handleRegistrationCancel}
                />
              )}
            </div>

            {/* Soaking Timer Section */}
            <div>
              <SoakingTimer
                soakingItems={soakingItems}
                onTimerComplete={handleTimerComplete}
                onEmergencyOverride={handleEmergencyOverride}
              />
            </div>
          </div>

          {/* Data Table Section */}
          <div className="mb-8">
            <SoakingDataTable
              soakingItems={soakingItems}
              onItemAction={handleItemAction}
              onBulkAction={handleBulkAction}
            />
          </div>

          {/* Workflow Navigation */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  Workflow Navigation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Navigate to related workflow stages and quality control
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="ShieldCheck"
                  iconPosition="left"
                  onClick={() => navigateToWorkflow('/quality-control-validation')}
                >
                  Quality Control
                </Button>
                <Button
                  variant="outline"
                  iconName="Search"
                  iconPosition="left"
                  onClick={() => navigateToWorkflow('/patient-traceability-system')}
                >
                  Traceability
                </Button>
                <Button
                  variant="default"
                  iconName="RotateCcw"
                  iconPosition="left"
                  onClick={() => navigateToWorkflow('/sterilization-cycle-management')}
                >
                  Sterilization Cycles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreDisinfectionWorkflow;