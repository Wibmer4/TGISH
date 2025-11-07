import React from 'react';
import Icon from '../../../components/AppIcon';

const PrerequisiteValidationPanel = ({ loadedItems, onRemoveItem }) => {
  const getValidationStatus = (item) => {
    const steps = [
      { key: 'cleaning', label: 'Cleaning', completed: item?.cleaningCompleted },
      { key: 'inspection', label: 'Inspection', completed: item?.inspectionCompleted },
      { key: 'packaging', label: 'Packaging', completed: item?.packagingCompleted }
    ];
    
    const completedSteps = steps?.filter(step => step?.completed)?.length;
    const isValid = completedSteps === steps?.length;
    
    return { steps, completedSteps, isValid, totalSteps: steps?.length };
  };

  const validItems = loadedItems?.filter(item => getValidationStatus(item)?.isValid);
  const invalidItems = loadedItems?.filter(item => !getValidationStatus(item)?.isValid);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="ShieldCheck" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Prerequisite Validation</h3>
            <p className="text-sm text-muted-foreground">Verify completion of required steps</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
            <Icon name="CheckCircle" size={14} />
            <span>{validItems?.length} Valid</span>
          </div>
          {invalidItems?.length > 0 && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-error/10 text-error rounded-full text-sm font-medium">
              <Icon name="AlertCircle" size={14} />
              <span>{invalidItems?.length} Invalid</span>
            </div>
          )}
        </div>
      </div>
      {loadedItems?.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="Package" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground">No items loaded for validation</p>
          <p className="text-sm text-muted-foreground mt-1">Scan items to begin prerequisite checking</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {loadedItems?.map((item) => {
            const validation = getValidationStatus(item);
            
            return (
              <div
                key={item?.id}
                className={`border rounded-lg p-4 transition-colors ${
                  validation?.isValid 
                    ? 'border-success/30 bg-success/5' :'border-error/30 bg-error/5'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      validation?.isValid ? 'bg-success text-success-foreground' : 'bg-error text-error-foreground'
                    }`}>
                      <Icon 
                        name={validation?.isValid ? "CheckCircle" : "AlertCircle"} 
                        size={16} 
                      />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{item?.barcode}</div>
                      <div className="text-sm text-muted-foreground">{item?.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${
                      validation?.isValid ? 'text-success' : 'text-error'
                    }`}>
                      {validation?.completedSteps}/{validation?.totalSteps} Steps
                    </span>
                    <button
                      onClick={() => onRemoveItem(item?.id)}
                      className="p-1 text-muted-foreground hover:text-error transition-colors"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                </div>
                {/* Validation Steps */}
                <div className="grid grid-cols-3 gap-2">
                  {validation?.steps?.map((step) => (
                    <div
                      key={step?.key}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${
                        step?.completed
                          ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon 
                        name={step?.completed ? "Check" : "Clock"} 
                        size={14} 
                      />
                      <span>{step?.label}</span>
                    </div>
                  ))}
                </div>
                {!validation?.isValid && (
                  <div className="mt-3 p-3 bg-error/10 border border-error/20 rounded-md">
                    <div className="flex items-center space-x-2 text-error text-sm">
                      <Icon name="AlertTriangle" size={14} />
                      <span className="font-medium">Cannot proceed to sterilization</span>
                    </div>
                    <p className="text-xs text-error/80 mt-1">
                      Complete all prerequisite steps before loading into autoclave
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {/* Summary Actions */}
      {loadedItems?.length > 0 && (
        <div className="flex items-center justify-between pt-4 mt-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {validItems?.length} of {loadedItems?.length} items ready for sterilization
          </div>
          {invalidItems?.length > 0 && (
            <div className="flex items-center space-x-2 text-error text-sm">
              <Icon name="AlertCircle" size={14} />
              <span>Remove invalid items to proceed</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PrerequisiteValidationPanel;