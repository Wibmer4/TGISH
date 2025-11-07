import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ValidationSection = ({ completedCycles, onValidateCycle }) => {
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [validatorId, setValidatorId] = useState('');
  const [validationChecks, setValidationChecks] = useState({
    parametersReviewed: false,
    indicatorsVerified: false,
    documentationComplete: false,
    qualityApproved: false
  });
  const [signatureCapture, setSignatureCapture] = useState(false);

  const pendingCycles = completedCycles?.filter(cycle => cycle?.status === 'pending_validation');

  const handleValidationCheck = (checkKey, checked) => {
    setValidationChecks(prev => ({
      ...prev,
      [checkKey]: checked
    }));
  };

  const canValidate = Object.values(validationChecks)?.every(check => check) && validatorId;

  const handleValidate = () => {
    if (canValidate && selectedCycle) {
      setSignatureCapture(true);
      setTimeout(() => {
        onValidateCycle(selectedCycle?.id, {
          validator: validatorId,
          timestamp: new Date()?.toISOString(),
          checks: validationChecks
        });
        setSelectedCycle(null);
        setValidatorId('');
        setValidationChecks({
          parametersReviewed: false,
          indicatorsVerified: false,
          documentationComplete: false,
          qualityApproved: false
        });
        setSignatureCapture(false);
      }, 2000);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="ClipboardCheck" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Cycle Validation</h3>
            <p className="text-sm text-muted-foreground">Review and approve completed cycles</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 bg-warning/10 text-warning rounded-full text-sm font-medium">
          <Icon name="Clock" size={14} />
          <span>{pendingCycles?.length} Pending</span>
        </div>
      </div>
      {pendingCycles?.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="CheckCircle" size={48} color="var(--color-success)" className="mx-auto mb-4" />
          <p className="text-foreground font-medium">All cycles validated</p>
          <p className="text-sm text-muted-foreground mt-1">No pending cycles require validation</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Pending Cycles List */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Pending Validation</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {pendingCycles?.map((cycle) => (
                <div
                  key={cycle?.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedCycle?.id === cycle?.id
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedCycle(cycle)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                        <Icon name="Clock" size={16} color="var(--color-warning)" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Cycle #{cycle?.cycleNumber}</div>
                        <div className="text-sm text-muted-foreground">
                          {cycle?.autoclave} • {cycle?.program} • {cycle?.itemCount} items
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">{cycle?.completedTime}</div>
                      <div className="text-xs text-muted-foreground">Operator: {cycle?.operator}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Validation Form */}
          {selectedCycle && (
            <div className="border-t border-border pt-6">
              <h4 className="font-medium text-foreground mb-4">
                Validate Cycle #{selectedCycle?.cycleNumber}
              </h4>
              
              <div className="space-y-4">
                {/* Validator ID */}
                <Input
                  label="Validator ID"
                  type="text"
                  placeholder="Scan validator badge"
                  value={validatorId}
                  onChange={(e) => setValidatorId(e?.target?.value)}
                  required
                />

                {/* Validation Checklist */}
                <div className="space-y-3">
                  <h5 className="font-medium text-foreground">Validation Checklist</h5>
                  
                  <Checkbox
                    label="Cycle parameters reviewed and within specifications"
                    checked={validationChecks?.parametersReviewed}
                    onChange={(e) => handleValidationCheck('parametersReviewed', e?.target?.checked)}
                  />
                  
                  <Checkbox
                    label="Physical and chemical indicators verified"
                    checked={validationChecks?.indicatorsVerified}
                    onChange={(e) => handleValidationCheck('indicatorsVerified', e?.target?.checked)}
                  />
                  
                  <Checkbox
                    label="Documentation complete and accurate"
                    checked={validationChecks?.documentationComplete}
                    onChange={(e) => handleValidationCheck('documentationComplete', e?.target?.checked)}
                  />
                  
                  <Checkbox
                    label="Quality standards met for release"
                    checked={validationChecks?.qualityApproved}
                    onChange={(e) => handleValidationCheck('qualityApproved', e?.target?.checked)}
                  />
                </div>

                {/* Cycle Details Summary */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <h5 className="font-medium text-foreground mb-3">Cycle Summary</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Temperature</div>
                      <div className="font-medium text-foreground">134°C ✓</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Pressure</div>
                      <div className="font-medium text-foreground">2.1 bar ✓</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Hold Time</div>
                      <div className="font-medium text-foreground">18:00 min ✓</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Total Time</div>
                      <div className="font-medium text-foreground">45:32 min</div>
                    </div>
                  </div>
                </div>

                {/* Validation Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="default"
                    iconName="CheckCircle"
                    iconPosition="left"
                    onClick={handleValidate}
                    disabled={!canValidate}
                    loading={signatureCapture}
                    className="flex-1"
                  >
                    {signatureCapture ? 'Processing...' : 'Validate & Release'}
                  </Button>
                  <Button
                    variant="destructive"
                    iconName="XCircle"
                    iconPosition="left"
                    onClick={() => console.log('Reject cycle')}
                    className="flex-1"
                  >
                    Reject Cycle
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ValidationSection;