import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ValidationQueue from './components/ValidationQueue';
import CycleDocumentation from './components/CycleDocumentation';
import ValidationInterface from './components/ValidationInterface';
import DigitalSignature from './components/DigitalSignature';
import ValidationStatistics from './components/ValidationStatistics';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const QualityControlValidation = () => {
  const [selectedValidation, setSelectedValidation] = useState(null);
  const [showSignature, setShowSignature] = useState(false);
  const [activeView, setActiveView] = useState('validation');
  const [pendingValidations, setPendingValidations] = useState([]);

  // Mock data for pending validations
  useEffect(() => {
    const mockValidations = [
    {
      id: 'VAL-001',
      loadId: 'LD-2025-1106-092',
      autoclaveId: 'AC-001',
      cycleNumber: 'CY-20251106-092',
      itemCount: 15,
      priority: 'urgent',
      completedAt: '2025-11-06T22:45:00Z',
      operatorId: 'OP-003',
      physicalIndicator: 'passed',
      chemicalIndicator: 'passed',
      biologicalIndicator: true,
      biologicalResult: 'passed',
      cycleData: {
        temperature: 134.2,
        pressure: 2.1,
        holdTime: 3.2,
        phases: [
        { name: 'Pre-vacuum', duration: '2:30', status: 'completed' },
        { name: 'Steam injection', duration: '1:15', status: 'completed' },
        { name: 'Sterilization', duration: '3:12', status: 'completed' },
        { name: 'Drying', duration: '15:00', status: 'completed' }]

      },
      indicators: {
        physical: [
        { type: 'Steam penetration tape', position: 'External', result: 'passed' },
        { type: 'Process indicator', position: 'Internal center', result: 'passed' }],

        chemical: [
        { type: 'Class 5 integrator', lotNumber: 'CI-2024-089', expectedColor: 'Brown', actualColor: 'Brown', result: 'passed' },
        { type: 'Bowie-Dick test', lotNumber: 'BD-2024-156', expectedColor: 'Uniform', actualColor: 'Uniform', result: 'passed' }]

      },
      visualEvidence: [
      {
        title: 'Pre-sterilization packaging',
        description: 'Sterile barrier system before processing',
        imageUrl: "https://images.unsplash.com/photo-1727830968495-ea2798aaee35",
        imageAlt: 'Medical instruments wrapped in sterile blue packaging material on stainless steel surface',
        timestamp: '2025-11-06T22:30:00Z',
        inspectorId: 'OP-003'
      },
      {
        title: 'Post-sterilization indicators',
        description: 'Chemical indicators after cycle completion',
        imageUrl: "https://images.unsplash.com/photo-1644095984144-901df67fa80f",
        imageAlt: 'Brown colored chemical indicator strips showing successful sterilization process completion',
        timestamp: '2025-11-06T22:45:00Z',
        inspectorId: 'OP-003'
      }]

    },
    {
      id: 'VAL-002',
      loadId: 'LD-2025-1106-091',
      autoclaveId: 'AC-002',
      cycleNumber: 'CY-20251106-091',
      itemCount: 8,
      priority: 'high',
      completedAt: '2025-11-06T22:30:00Z',
      operatorId: 'OP-001',
      physicalIndicator: 'passed',
      chemicalIndicator: 'warning',
      biologicalIndicator: false,
      biologicalResult: null,
      cycleData: {
        temperature: 133.8,
        pressure: 2.0,
        holdTime: 3.0,
        phases: [
        { name: 'Pre-vacuum', duration: '2:45', status: 'completed' },
        { name: 'Steam injection', duration: '1:20', status: 'completed' },
        { name: 'Sterilization', duration: '3:00', status: 'completed' },
        { name: 'Drying', duration: '14:30', status: 'completed' }]

      },
      indicators: {
        physical: [
        { type: 'Steam penetration tape', position: 'External', result: 'passed' },
        { type: 'Process indicator', position: 'Internal center', result: 'passed' }],

        chemical: [
        { type: 'Class 4 indicator', lotNumber: 'CI-2024-087', expectedColor: 'Black', actualColor: 'Dark brown', result: 'warning' }]

      },
      visualEvidence: [
      {
        title: 'Surgical instrument set',
        description: 'Orthopedic instruments post-sterilization',
        imageUrl: "https://images.unsplash.com/photo-1727830968530-4864fc958cda",
        imageAlt: 'Stainless steel surgical instruments arranged in sterile tray with blue surgical drape',
        timestamp: '2025-11-06T22:15:00Z',
        inspectorId: 'OP-001'
      }]

    },
    {
      id: 'VAL-003',
      loadId: 'LD-2025-1106-090',
      autoclaveId: 'AC-001',
      cycleNumber: 'CY-20251106-090',
      itemCount: 22,
      priority: 'normal',
      completedAt: '2025-11-06T22:15:00Z',
      operatorId: 'OP-002',
      physicalIndicator: 'passed',
      chemicalIndicator: 'passed',
      biologicalIndicator: true,
      biologicalResult: 'pending',
      cycleData: {
        temperature: 134.5,
        pressure: 2.2,
        holdTime: 3.5,
        phases: [
        { name: 'Pre-vacuum', duration: '2:20', status: 'completed' },
        { name: 'Steam injection', duration: '1:10', status: 'completed' },
        { name: 'Sterilization', duration: '3:30', status: 'completed' },
        { name: 'Drying', duration: '16:00', status: 'completed' }]

      },
      indicators: {
        physical: [
        { type: 'Steam penetration tape', position: 'External', result: 'passed' },
        { type: 'Process indicator', position: 'Internal center', result: 'passed' }],

        chemical: [
        { type: 'Class 5 integrator', lotNumber: 'CI-2024-090', expectedColor: 'Brown', actualColor: 'Brown', result: 'passed' }]

      },
      visualEvidence: [
      {
        title: 'Textile pack sterilization',
        description: 'Surgical linens and gowns after processing',
        imageUrl: "https://images.unsplash.com/photo-1612037418575-55c54d942c5a",
        imageAlt: 'Folded blue surgical gowns and linens in sterile packaging on hospital cart',
        timestamp: '2025-11-06T22:00:00Z',
        inspectorId: 'OP-002'
      }]

    }];


    setPendingValidations(mockValidations);
    setSelectedValidation(mockValidations?.[0]);
  }, []);

  const handleValidationApproval = (approvalData) => {
    console.log('Validation approved:', approvalData);
    setShowSignature(true);
  };

  const handleValidationRejection = (rejectionData) => {
    console.log('Validation rejected:', rejectionData);

    // Remove from pending validations
    setPendingValidations((prev) =>
    prev?.filter((validation) => validation?.id !== rejectionData?.validationId)
    );

    // Clear selection if current validation was rejected
    if (selectedValidation?.id === rejectionData?.validationId) {
      setSelectedValidation(pendingValidations?.[0] || null);
    }

    alert('Load has been rejected and sent for reprocessing.');
  };

  const handleSignatureComplete = (signatureData) => {
    console.log('Signature completed:', signatureData);

    // Remove from pending validations
    setPendingValidations((prev) =>
    prev?.filter((validation) => validation?.id !== selectedValidation?.id)
    );

    // Clear selection
    setSelectedValidation(pendingValidations?.[0] || null);
    setShowSignature(false);

    alert('Load has been successfully validated and released for distribution.');
  };

  const handleSignatureCancel = () => {
    setShowSignature(false);
  };

  const views = [
  { id: 'validation', label: 'Validation', icon: 'CheckCircle' },
  { id: 'statistics', label: 'Statistics', icon: 'BarChart3' }];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Quality Control Validation
                </h1>
                <p className="text-muted-foreground mt-2">
                  Review, approve, and release sterilized loads through comprehensive validation
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* View Toggle */}
                <div className="flex items-center bg-muted rounded-lg p-1">
                  {views?.map((view) =>
                  <button
                    key={view?.id}
                    onClick={() => setActiveView(view?.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeView === view?.id ?
                    'bg-primary text-primary-foreground' :
                    'text-muted-foreground hover:text-foreground'}`
                    }>

                      <Icon name={view?.icon} size={16} />
                      <span>{view?.label}</span>
                    </button>
                  )}
                </div>

                {/* Quick Actions */}
                <Button
                  variant="outline"
                  iconName="FileText"
                  iconPosition="left">

                  Generate Report
                </Button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {activeView === 'validation' ?
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - Validation Queue */}
              <div className="xl:col-span-1">
                <ValidationQueue
                pendingValidations={pendingValidations}
                onSelectValidation={setSelectedValidation}
                selectedValidation={selectedValidation} />

              </div>

              {/* Middle Column - Cycle Documentation */}
              <div className="xl:col-span-1">
                <CycleDocumentation validation={selectedValidation} />
              </div>

              {/* Right Column - Validation Interface */}
              <div className="xl:col-span-1">
                <ValidationInterface
                validation={selectedValidation}
                onValidate={handleValidationApproval}
                onReject={handleValidationRejection} />

              </div>
            </div> : (

          /* Statistics View */
          <ValidationStatistics />)
          }

          {/* Status Bar */}
          <div className="mt-8 bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">
                    Validation System Online
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Session: QC-001 (Dr. Sarah Johnson)
                </div>
                <div className="text-sm text-muted-foreground">
                  {pendingValidations?.length} loads pending validation
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="RefreshCw"
                  onClick={() => window.location?.reload()} />

              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Digital Signature Modal */}
      {showSignature &&
      <DigitalSignature
        onSignatureComplete={handleSignatureComplete}
        onCancel={handleSignatureCancel}
        validationData={selectedValidation} />

      }
    </div>);

};

export default QualityControlValidation;