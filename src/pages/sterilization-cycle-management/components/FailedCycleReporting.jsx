import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FailedCycleReporting = ({ isOpen, onClose, cycle, onSubmitReport }) => {
  const [failureReason, setFailureReason] = useState('');
  const [equipmentIssue, setEquipmentIssue] = useState('');
  const [operatorError, setOperatorError] = useState(false);
  const [maintenanceRequired, setMaintenanceRequired] = useState(false);
  const [description, setDescription] = useState('');
  const [reporterId, setReporterId] = useState('');

  const failureReasonOptions = [
    { value: 'temperature_deviation', label: 'Temperature Deviation' },
    { value: 'pressure_failure', label: 'Pressure Failure' },
    { value: 'time_insufficient', label: 'Insufficient Hold Time' },
    { value: 'indicator_failure', label: 'Indicator Failure' },
    { value: 'equipment_malfunction', label: 'Equipment Malfunction' },
    { value: 'power_interruption', label: 'Power Interruption' },
    { value: 'operator_error', label: 'Operator Error' },
    { value: 'other', label: 'Other' }
  ];

  const equipmentOptions = [
    { value: '', label: 'No Equipment Issue' },
    { value: 'steam_generator', label: 'Steam Generator' },
    { value: 'pressure_sensor', label: 'Pressure Sensor' },
    { value: 'temperature_sensor', label: 'Temperature Sensor' },
    { value: 'door_seal', label: 'Door Seal' },
    { value: 'vacuum_pump', label: 'Vacuum Pump' },
    { value: 'control_system', label: 'Control System' }
  ];

  const handleSubmit = () => {
    const report = {
      cycleId: cycle?.id,
      failureReason,
      equipmentIssue,
      operatorError,
      maintenanceRequired,
      description,
      reporterId,
      timestamp: new Date()?.toISOString()
    };
    
    onSubmitReport(report);
    onClose();
    
    // Reset form
    setFailureReason('');
    setEquipmentIssue('');
    setOperatorError(false);
    setMaintenanceRequired(false);
    setDescription('');
    setReporterId('');
  };

  if (!isOpen || !cycle) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Failed Cycle Report</h3>
                <p className="text-sm text-muted-foreground">Cycle #{cycle?.cycleNumber} - {cycle?.autoclave}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Cycle Information */}
          <div className="bg-error/5 border border-error/20 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-foreground mb-3">Cycle Details</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Cycle Number</div>
                <div className="font-medium text-foreground">{cycle?.cycleNumber}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Autoclave</div>
                <div className="font-medium text-foreground">{cycle?.autoclave}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Program</div>
                <div className="font-medium text-foreground">{cycle?.program}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Operator</div>
                <div className="font-medium text-foreground">{cycle?.operator}</div>
              </div>
            </div>
          </div>

          {/* Failure Report Form */}
          <div className="space-y-6">
            <Input
              label="Reporter ID"
              type="text"
              placeholder="Scan reporter badge"
              value={reporterId}
              onChange={(e) => setReporterId(e?.target?.value)}
              required
            />

            <Select
              label="Primary Failure Reason"
              placeholder="Select the main cause of failure"
              options={failureReasonOptions}
              value={failureReason}
              onChange={setFailureReason}
              required
            />

            <Select
              label="Equipment Issue (if applicable)"
              placeholder="Select affected equipment"
              options={equipmentOptions}
              value={equipmentIssue}
              onChange={setEquipmentIssue}
            />

            <div className="space-y-3">
              <Checkbox
                label="Operator error contributed to failure"
                checked={operatorError}
                onChange={(e) => setOperatorError(e?.target?.checked)}
              />
              
              <Checkbox
                label="Maintenance required before next use"
                checked={maintenanceRequired}
                onChange={(e) => setMaintenanceRequired(e?.target?.checked)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Detailed Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                rows={4}
                placeholder="Provide detailed description of the failure, circumstances, and any corrective actions taken..."
                value={description}
                onChange={(e) => setDescription(e?.target?.value)}
              />
            </div>

            {/* Impact Assessment */}
            <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} />
                <span>Impact Assessment</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Items affected:</span>
                  <span className="font-medium text-foreground">{cycle?.itemCount} items</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Reprocessing required:</span>
                  <span className="font-medium text-warning">Yes - Full cycle</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Autoclave status:</span>
                  <span className="font-medium text-error">
                    {maintenanceRequired ? 'Out of service' : 'Available'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="destructive"
                iconName="AlertTriangle"
                iconPosition="left"
                onClick={handleSubmit}
                disabled={!failureReason || !reporterId}
                className="flex-1"
              >
                Submit Failure Report
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailedCycleReporting;