import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const ValidationInterface = ({ validation, onValidate, onReject }) => {
  const [inspectionResults, setInspectionResults] = useState({
    packagingIntegrity: null,
    labelQuality: null,
    sterileBarrier: null,
    visualInspection: null
  });
  const [inspectorComments, setInspectorComments] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionForm, setShowRejectionForm] = useState(false);

  if (!validation) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="ClipboardCheck" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No Load Selected</h3>
        <p className="text-muted-foreground">Select a load to begin validation process</p>
      </div>
    );
  }

  const inspectionItems = [
    {
      id: 'packagingIntegrity',
      label: 'Packaging Integrity',
      description: 'Check for tears, punctures, or compromised seals',
      icon: 'Package'
    },
    {
      id: 'labelQuality',
      label: 'Label Quality',
      description: 'Verify barcode readability and print quality',
      icon: 'Tag'
    },
    {
      id: 'sterileBarrier',
      label: 'Sterile Barrier Assessment',
      description: 'Confirm sterile barrier system integrity',
      icon: 'Shield'
    },
    {
      id: 'visualInspection',
      label: 'Visual Inspection',
      description: 'Overall appearance and cleanliness assessment',
      icon: 'Eye'
    }
  ];

  const rejectionReasons = [
    'Packaging integrity compromised',
    'Label quality insufficient',
    'Sterile barrier failure',
    'Indicator failure - Physical',
    'Indicator failure - Chemical',
    'Indicator failure - Biological',
    'Temperature deviation',
    'Pressure deviation',
    'Cycle time deviation',
    'Equipment malfunction',
    'Other (specify in comments)'
  ];

  const handleInspectionChange = (itemId, result) => {
    setInspectionResults(prev => ({
      ...prev,
      [itemId]: result
    }));
  };

  const canValidate = () => {
    return Object.values(inspectionResults)?.every(result => result === true) &&
           inspectorComments?.trim()?.length > 0;
  };

  const canReject = () => {
    return rejectionReason && inspectorComments?.trim()?.length > 0;
  };

  const handleValidate = () => {
    if (canValidate()) {
      onValidate({
        validationId: validation?.id,
        inspectionResults,
        inspectorComments,
        timestamp: new Date()?.toISOString(),
        inspectorId: 'QC-001'
      });
    }
  };

  const handleReject = () => {
    if (canReject()) {
      onReject({
        validationId: validation?.id,
        rejectionReason,
        inspectorComments,
        timestamp: new Date()?.toISOString(),
        inspectorId: 'QC-001'
      });
      setShowRejectionForm(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Quality Control Validation
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Load {validation?.loadId} - Inspector: QC-001
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Validation Required
            </div>
          </div>
        </div>
      </div>
      {!showRejectionForm ? (
        <div className="p-6 space-y-6">
          {/* Load Summary */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium text-foreground mb-3">Load Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Autoclave:</span>
                <div className="font-medium">{validation?.autoclaveId}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Cycle:</span>
                <div className="font-medium">{validation?.cycleNumber}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Items:</span>
                <div className="font-medium">{validation?.itemCount} items</div>
              </div>
              <div>
                <span className="text-muted-foreground">Completed:</span>
                <div className="font-medium">
                  {new Date(validation.completedAt)?.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Inspection Checklist */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Inspection Checklist</h3>
            <div className="space-y-4">
              {inspectionItems?.map((item) => (
                <div key={item?.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name={item?.icon} size={20} className="text-primary mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">{item?.label}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{item?.description}</p>
                      
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name={item?.id}
                            checked={inspectionResults?.[item?.id] === true}
                            onChange={() => handleInspectionChange(item?.id, true)}
                            className="w-4 h-4 text-success border-border focus:ring-success"
                          />
                          <span className="text-sm font-medium text-success">Pass</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name={item?.id}
                            checked={inspectionResults?.[item?.id] === false}
                            onChange={() => handleInspectionChange(item?.id, false)}
                            className="w-4 h-4 text-error border-border focus:ring-error"
                          />
                          <span className="text-sm font-medium text-error">Fail</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inspector Comments */}
          <div>
            <Input
              label="Inspector Comments"
              type="text"
              placeholder="Enter detailed inspection notes and observations..."
              value={inspectorComments}
              onChange={(e) => setInspectorComments(e?.target?.value)}
              description="Required: Provide detailed comments about the inspection"
              required
              className="mb-4"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              variant="destructive"
              iconName="X"
              iconPosition="left"
              onClick={() => setShowRejectionForm(true)}
            >
              Reject Load
            </Button>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Save"
                iconPosition="left"
              >
                Save Progress
              </Button>
              <Button
                variant="default"
                iconName="CheckCircle"
                iconPosition="left"
                onClick={handleValidate}
                disabled={!canValidate()}
              >
                Approve & Release
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Rejection Form */
        (<div className="p-6 space-y-6">
          <div className="flex items-center space-x-3 text-error">
            <Icon name="AlertTriangle" size={24} />
            <h3 className="text-lg font-medium">Reject Load</h3>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Rejection Reason *
            </label>
            <div className="space-y-2">
              {rejectionReasons?.map((reason, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rejectionReason"
                    value={reason}
                    checked={rejectionReason === reason}
                    onChange={(e) => setRejectionReason(e?.target?.value)}
                    className="w-4 h-4 text-error border-border focus:ring-error"
                  />
                  <span className="text-sm text-foreground">{reason}</span>
                </label>
              ))}
            </div>
          </div>
          <Input
            label="Detailed Comments"
            type="text"
            placeholder="Provide detailed explanation for rejection..."
            value={inspectorComments}
            onChange={(e) => setInspectorComments(e?.target?.value)}
            description="Required: Explain the specific issues found"
            required
          />
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setShowRejectionForm(false)}
            >
              Cancel
            </Button>
            
            <Button
              variant="destructive"
              iconName="X"
              iconPosition="left"
              onClick={handleReject}
              disabled={!canReject()}
            >
              Confirm Rejection
            </Button>
          </div>
        </div>)
      )}
    </div>
  );
};

export default ValidationInterface;