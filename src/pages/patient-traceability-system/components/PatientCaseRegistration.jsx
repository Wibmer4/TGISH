import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PatientCaseRegistration = () => {
  const [scanMode, setScanMode] = useState('patient');
  const [patientData, setPatientData] = useState({
    patientId: '',
    procedureType: '',
    operatingRoom: '',
    surgeon: ''
  });
  const [scannedPacks, setScannedPacks] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  const procedureTypes = [
    { value: 'cardiac', label: 'Cardiac Surgery' },
    { value: 'orthopedic', label: 'Orthopedic Surgery' },
    { value: 'general', label: 'General Surgery' },
    { value: 'neurosurgery', label: 'Neurosurgery' },
    { value: 'gynecology', label: 'Gynecology' },
    { value: 'urology', label: 'Urology' }
  ];

  const operatingRooms = [
    { value: 'or-01', label: 'OR-01 - Main Theater' },
    { value: 'or-02', label: 'OR-02 - Cardiac Suite' },
    { value: 'or-03', label: 'OR-03 - Orthopedic' },
    { value: 'or-04', label: 'OR-04 - Emergency' },
    { value: 'or-05', label: 'OR-05 - Outpatient' }
  ];

  const surgeons = [
    { value: 'dr-smith', label: 'Dr. Sarah Smith - Cardiac' },
    { value: 'dr-johnson', label: 'Dr. Michael Johnson - Orthopedic' },
    { value: 'dr-williams', label: 'Dr. Emily Williams - General' },
    { value: 'dr-brown', label: 'Dr. David Brown - Neurosurgery' },
    { value: 'dr-davis', label: 'Dr. Lisa Davis - Gynecology' }
  ];

  const mockScannedPacks = [
    {
      id: 'SP-2025-001234',
      lotNumber: 'LOT-CS-240156',
      packType: 'Cardiac Surgery Kit',
      sterilizationDate: '2025-11-05',
      expiryDate: '2025-12-05',
      status: 'Valid',
      operator: 'Tech-003'
    },
    {
      id: 'SP-2025-001235',
      lotNumber: 'LOT-GS-240157',
      packType: 'General Instrument Set',
      sterilizationDate: '2025-11-05',
      expiryDate: '2025-12-05',
      status: 'Valid',
      operator: 'Tech-001'
    }
  ];

  const handleScanPack = () => {
    setIsScanning(true);
    // Simulate barcode scanning
    setTimeout(() => {
      const newPack = mockScannedPacks?.[scannedPacks?.length % mockScannedPacks?.length];
      setScannedPacks(prev => [...prev, { ...newPack, scanTime: new Date()?.toLocaleTimeString() }]);
      setIsScanning(false);
    }, 1500);
  };

  const handleRegisterCase = () => {
    console.log('Registering patient case:', { patientData, scannedPacks });
    // Reset form after registration
    setPatientData({ patientId: '', procedureType: '', operatingRoom: '', surgeon: '' });
    setScannedPacks([]);
  };

  const removePack = (index) => {
    setScannedPacks(prev => prev?.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="UserPlus" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Patient Case Registration</h3>
            <p className="text-sm text-muted-foreground">Link sterile packs to patient procedures</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>Session: {new Date()?.toLocaleTimeString()}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="User" size={16} />
            <span>Patient Information</span>
          </h4>
          
          <Input
            label="Patient ID"
            type="text"
            placeholder="Scan or enter patient ID"
            value={patientData?.patientId}
            onChange={(e) => setPatientData(prev => ({ ...prev, patientId: e?.target?.value }))}
            required
          />

          <Select
            label="Procedure Type"
            placeholder="Select procedure type"
            options={procedureTypes}
            value={patientData?.procedureType}
            onChange={(value) => setPatientData(prev => ({ ...prev, procedureType: value }))}
            required
          />

          <Select
            label="Operating Room"
            placeholder="Select operating room"
            options={operatingRooms}
            value={patientData?.operatingRoom}
            onChange={(value) => setPatientData(prev => ({ ...prev, operatingRoom: value }))}
            required
          />

          <Select
            label="Primary Surgeon"
            placeholder="Select primary surgeon"
            options={surgeons}
            value={patientData?.surgeon}
            onChange={(value) => setPatientData(prev => ({ ...prev, surgeon: value }))}
            required
          />
        </div>

        {/* Sterile Pack Scanning */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="Package" size={16} />
              <span>Sterile Pack Scanning</span>
            </h4>
            <Button
              variant="outline"
              size="sm"
              iconName="Scan"
              iconPosition="left"
              onClick={handleScanPack}
              loading={isScanning}
              disabled={!patientData?.patientId}
            >
              {isScanning ? 'Scanning...' : 'Scan Pack'}
            </Button>
          </div>

          {/* Scanning Interface */}
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            {isScanning ? (
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-muted-foreground">Scanning barcode...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-3">
                <Icon name="QrCode" size={48} className="text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {patientData?.patientId ? 'Click scan button or use barcode scanner' : 'Enter patient ID first'}
                </p>
              </div>
            )}
          </div>

          {/* Scanned Packs List */}
          {scannedPacks?.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-foreground">Scanned Packs ({scannedPacks?.length})</h5>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {scannedPacks?.map((pack, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-foreground">{pack?.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          pack?.status === 'Valid' ?'bg-success/10 text-success' :'bg-error/10 text-error'
                        }`}>
                          {pack?.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{pack?.packType}</p>
                      <p className="text-xs text-muted-foreground">Scanned: {pack?.scanTime}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="X"
                      onClick={() => removePack(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Registration Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
        <div className="text-sm text-muted-foreground">
          {scannedPacks?.length > 0 && (
            <span>{scannedPacks?.length} sterile pack(s) ready for registration</span>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => {
              setPatientData({ patientId: '', procedureType: '', operatingRoom: '', surgeon: '' });
              setScannedPacks([]);
            }}
          >
            Clear All
          </Button>
          <Button
            variant="default"
            iconName="Save"
            iconPosition="left"
            onClick={handleRegisterCase}
            disabled={!patientData?.patientId || !patientData?.procedureType || scannedPacks?.length === 0}
          >
            Register Case
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientCaseRegistration;