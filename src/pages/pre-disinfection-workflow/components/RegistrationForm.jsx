import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const RegistrationForm = ({ scanData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    basketId: scanData?.barcode || '',
    sourceDepartment: '',
    contaminationLevel: '',
    operatorId: 'TECH-001',
    itemCount: '',
    notes: '',
    urgentProcessing: false
  });

  const [errors, setErrors] = useState({});

  const departmentOptions = [
    { value: 'OR-1', label: 'Operating Room 1' },
    { value: 'OR-2', label: 'Operating Room 2' },
    { value: 'OR-3', label: 'Operating Room 3' },
    { value: 'ICU', label: 'Intensive Care Unit' },
    { value: 'ER', label: 'Emergency Room' },
    { value: 'ORTHO', label: 'Orthopedic Surgery' },
    { value: 'CARDIO', label: 'Cardiac Surgery' },
    { value: 'NEURO', label: 'Neurosurgery' }
  ];

  const contaminationOptions = [
    { 
      value: 'standard', 
      label: 'Standard (15 min)', 
      description: 'Normal surgical instruments' 
    },
    { 
      value: 'medium', 
      label: 'Medium (30 min)', 
      description: 'Blood-contaminated items' 
    },
    { 
      value: 'high', 
      label: 'High (60 min)', 
      description: 'Prion risk or heavy contamination' 
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.sourceDepartment) {
      newErrors.sourceDepartment = 'Source department is required';
    }
    if (!formData?.contaminationLevel) {
      newErrors.contaminationLevel = 'Contamination level is required';
    }
    if (!formData?.itemCount || formData?.itemCount < 1) {
      newErrors.itemCount = 'Item count must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      const submissionData = {
        ...formData,
        scanTimestamp: scanData?.timestamp || new Date(),
        soakingDuration: getSoakingDuration(formData?.contaminationLevel),
        status: 'registered'
      };
      onSubmit(submissionData);
    }
  };

  const getSoakingDuration = (level) => {
    const durations = {
      'standard': 15,
      'medium': 30,
      'high': 60
    };
    return durations?.[level] || 15;
  };

  const getContaminationColor = (level) => {
    const colors = {
      'standard': 'text-success',
      'medium': 'text-warning',
      'high': 'text-error'
    };
    return colors?.[level] || 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="ClipboardList" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Basket Registration
            </h3>
            <p className="text-sm text-muted-foreground">
              Register contaminated items for pre-disinfection
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-full">
          <Icon name="Clock" size={14} className="text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            {new Date()?.toLocaleTimeString()}
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Scanned Item Info */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="Scan" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Scanned Item</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Barcode ID</label>
              <div className="font-data text-lg font-semibold text-foreground">
                {scanData?.barcode}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Item Type</label>
              <div className="text-sm text-foreground capitalize">
                {scanData?.type} Container
              </div>
            </div>
          </div>
        </div>

        {/* Registration Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Source Department"
            placeholder="Select department"
            options={departmentOptions}
            value={formData?.sourceDepartment}
            onChange={(value) => handleInputChange('sourceDepartment', value)}
            error={errors?.sourceDepartment}
            required
          />

          <Select
            label="Contamination Level"
            placeholder="Select contamination level"
            options={contaminationOptions}
            value={formData?.contaminationLevel}
            onChange={(value) => handleInputChange('contaminationLevel', value)}
            error={errors?.contaminationLevel}
            required
          />

          <Input
            label="Item Count"
            type="number"
            placeholder="Number of instruments"
            value={formData?.itemCount}
            onChange={(e) => handleInputChange('itemCount', e?.target?.value)}
            error={errors?.itemCount}
            min="1"
            max="100"
            required
          />

          <Input
            label="Operator ID"
            type="text"
            value={formData?.operatorId}
            onChange={(e) => handleInputChange('operatorId', e?.target?.value)}
            disabled
            description="Current logged-in technician"
          />
        </div>

        {/* Soaking Duration Preview */}
        {formData?.contaminationLevel && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Timer" size={20} className={getContaminationColor(formData?.contaminationLevel)} />
              <div>
                <div className="text-sm font-medium text-foreground">
                  Required Soaking Duration
                </div>
                <div className={`text-lg font-semibold ${getContaminationColor(formData?.contaminationLevel)}`}>
                  {getSoakingDuration(formData?.contaminationLevel)} minutes
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Processing Notes
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            rows="3"
            placeholder="Optional notes about contamination source, special handling requirements..."
            value={formData?.notes}
            onChange={(e) => handleInputChange('notes', e?.target?.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            iconName="X"
            iconPosition="left"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            iconName="CheckCircle"
            iconPosition="left"
          >
            Register & Start Soaking
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;