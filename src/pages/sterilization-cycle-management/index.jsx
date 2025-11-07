import React, { useState, useEffect } from 'react';
// Header provided by Layout
import AutoclaveLoadingPanel from './components/AutoclaveLoadingPanel';
import PrerequisiteValidationPanel from './components/PrerequisiteValidationPanel';
import CycleControlPanel from './components/CycleControlPanel';
import RealTimeMonitoring from './components/RealTimeMonitoring';
import ValidationSection from './components/ValidationSection';
import CycleHistoryTable from './components/CycleHistoryTable';
import FailedCycleReporting from './components/FailedCycleReporting';

const SterilizationCycleManagement = () => {
  const [loadedItems, setLoadedItems] = useState([]);
  const [activeCycle, setActiveCycle] = useState(null);
  const [monitoringData, setMonitoringData] = useState([]);
  const [completedCycles, setCompletedCycles] = useState([]);
  const [showFailureReport, setShowFailureReport] = useState(false);
  const [selectedFailedCycle, setSelectedFailedCycle] = useState(null);

  // Mock data for loaded items
  const mockItems = [
    {
      id: "ITM001",
      barcode: "ST-KIT-001-2025",
      description: "Basic Surgical Kit - Scissors, Forceps, Clamps",
      weight: 2.5,
      cleaningCompleted: true,
      inspectionCompleted: true,
      packagingCompleted: true
    },
    {
      id: "ITM002", 
      barcode: "ST-KIT-002-2025",
      description: "Orthopedic Instrument Set - Bone Saw, Drill Bits",
      weight: 4.2,
      cleaningCompleted: true,
      inspectionCompleted: false,
      packagingCompleted: true
    },
    {
      id: "ITM003",
      barcode: "ST-CON-003-2025", 
      description: "Sterile Container - Mixed Instruments",
      weight: 3.1,
      cleaningCompleted: true,
      inspectionCompleted: true,
      packagingCompleted: true
    }
  ];

  // Mock cycle history data
  const mockCycleHistory = [
    {
      id: "CYC001",
      cycleNumber: "AC001-2025-1156",
      autoclave: "AC-001",
      program: "Standard 134°C",
      duration: "45:32 min",
      itemCount: 12,
      weight: "28.5",
      operator: "TECH-001",
      validator: "QC-002",
      date: "11/06/2025",
      time: "14:30",
      status: "validated"
    },
    {
      id: "CYC002",
      cycleNumber: "AC002-2025-1157",
      autoclave: "AC-002", 
      program: "Prion 134°C",
      duration: "48:15 min",
      itemCount: 8,
      weight: "15.2",
      operator: "TECH-002",
      date: "11/06/2025",
      time: "13:45",
      status: "pending_validation"
    },
    {
      id: "CYC003",
      cycleNumber: "AC001-2025-1155",
      autoclave: "AC-001",
      program: "Flash 132°C",
      duration: "Failed at 12:30",
      itemCount: 5,
      weight: "8.7",
      operator: "TECH-001",
      date: "11/06/2025", 
      time: "12:15",
      status: "failed"
    }
  ];

  // Initialize monitoring data
  useEffect(() => {
    if (activeCycle) {
      const interval = setInterval(() => {
        setMonitoringData(prev => {
          const newTime = prev?.length;
          const newData = {
            time: `${Math.floor(newTime / 60)}:${(newTime % 60)?.toString()?.padStart(2, '0')}`,
            temperature: Math.min(134, 20 + (newTime * 3.8) + Math.random() * 2),
            pressure: Math.min(2.1, (newTime * 0.07) + Math.random() * 0.1),
            targetTemp: 134,
            targetPressure: 2.1
          };
          return [...prev?.slice(-30), newData];
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeCycle]);

  const handleItemScanned = (barcode) => {
    const mockItem = mockItems?.find(item => 
      item?.barcode?.toLowerCase()?.includes(barcode?.toLowerCase())
    );
    
    if (mockItem && !loadedItems?.find(item => item?.id === mockItem?.id)) {
      setLoadedItems(prev => [...prev, mockItem]);
    }
  };

  const handleRemoveItem = (itemId) => {
    setLoadedItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const handleStartCycle = (cycleData) => {
    const newCycle = {
      id: `CYC${Date.now()}`,
      cycleNumber: `AC001-2025-${Math.floor(Math.random() * 9999)}`,
      startTime: new Date()?.toLocaleTimeString(),
      elapsed: "00:00",
      progress: 0,
      currentPhase: "Heat-up",
      ...cycleData
    };
    
    setActiveCycle(newCycle);
    setMonitoringData([]);
    
    // Simulate cycle progress
    const progressInterval = setInterval(() => {
      setActiveCycle(prev => {
        if (!prev) return null;
        
        const newProgress = Math.min(100, prev?.progress + 2);
        const phases = ["Heat-up", "Sterilization", "Exhaust", "Drying"];
        const currentPhaseIndex = Math.floor(newProgress / 25);
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          // Move to completed cycles
          setCompletedCycles(prevCycles => [{
            ...prev,
            status: "pending_validation",
            completedTime: new Date()?.toLocaleTimeString(),
            itemCount: loadedItems?.length,
            weight: loadedItems?.reduce((sum, item) => sum + item?.weight, 0)?.toFixed(1)
          }, ...prevCycles]);
          setActiveCycle(null);
          setLoadedItems([]);
          return null;
        }
        
        return {
          ...prev,
          progress: newProgress,
          currentPhase: phases?.[currentPhaseIndex] || "Sterilization",
          elapsed: `${Math.floor(newProgress * 0.45)}:${Math.floor((newProgress * 0.45 % 1) * 60)?.toString()?.padStart(2, '0')}`
        };
      });
    }, 1500);
  };

  const handleValidateCycle = (cycleId, validationData) => {
    setCompletedCycles(prev => 
      prev?.map(cycle => 
        cycle?.id === cycleId 
          ? { ...cycle, status: "validated", ...validationData }
          : cycle
      )
    );
  };

  const handleViewDetails = (cycle) => {
    console.log('View cycle details:', cycle);
  };

  const handleReportFailure = (cycle) => {
    setSelectedFailedCycle(cycle);
    setShowFailureReport(true);
  };

  const handleSubmitFailureReport = (report) => {
    console.log('Failure report submitted:', report);
    // In real app, this would send to backend
  };

  const totalWeight = loadedItems?.reduce((sum, item) => sum + item?.weight, 0);
  const capacity = 50; // kg
  const canStartCycle = loadedItems?.length > 0 && 
                       loadedItems?.every(item => 
                         item?.cleaningCompleted && 
                         item?.inspectionCompleted && 
                         item?.packagingCompleted
                       );

  const allCycles = [...completedCycles, ...mockCycleHistory];

  return (
    <div className="min-h-screen bg-background">
      
      <main className="pt-32 pb-8 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Sterilization Cycle Management
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Control autoclave loading, cycle execution, and validation processes with comprehensive traceability logging for regulatory compliance.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <AutoclaveLoadingPanel
                onItemScanned={handleItemScanned}
                loadedItems={loadedItems}
                totalWeight={totalWeight}
                capacity={capacity}
              />
              
              <PrerequisiteValidationPanel
                loadedItems={loadedItems}
                onRemoveItem={handleRemoveItem}
              />
              
              <CycleControlPanel
                onStartCycle={handleStartCycle}
                canStartCycle={canStartCycle}
                activeCycle={activeCycle}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <RealTimeMonitoring
                activeCycle={activeCycle}
                monitoringData={monitoringData}
              />
              
              <ValidationSection
                completedCycles={completedCycles}
                onValidateCycle={handleValidateCycle}
              />
            </div>
          </div>

          {/* Full Width Sections */}
          <CycleHistoryTable
            cycles={allCycles}
            onViewDetails={handleViewDetails}
            onReportFailure={handleReportFailure}
          />
        </div>
      </main>

      {/* Failure Reporting Modal */}
      <FailedCycleReporting
        isOpen={showFailureReport}
        onClose={() => setShowFailureReport(false)}
        cycle={selectedFailedCycle}
        onSubmitReport={handleSubmitFailureReport}
      />
    </div>
  );
};

export default SterilizationCycleManagement;