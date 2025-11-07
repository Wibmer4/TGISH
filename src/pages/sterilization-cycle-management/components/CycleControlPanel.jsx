import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const CycleControlPanel = ({ onStartCycle, canStartCycle, activeCycle }) => {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [operatorId, setOperatorId] = useState('');
  const [signatureCapture, setSignatureCapture] = useState(false);

  const programOptions = [
    { 
      value: 'standard-134', 
      label: 'Standard 134°C - 18 min',
      description: 'General surgical instruments'
    },
    { 
      value: 'prion-134', 
      label: 'Prion 134°C - 18 min',
      description: 'High-risk neurological instruments'
    },
    { 
      value: 'flash-132', 
      label: 'Flash 132°C - 4 min',
      description: 'Emergency sterilization'
    },
    { 
      value: 'textile-121', 
      label: 'Textile 121°C - 15 min',
      description: 'Fabric materials and wraps'
    }
  ];

  const handleStartCycle = () => {
    if (selectedProgram && operatorId) {
      onStartCycle({
        program: selectedProgram,
        operator: operatorId,
        timestamp: new Date()?.toISOString()
      });
    }
  };

  const handleSignatureCapture = () => {
    setSignatureCapture(true);
    // Simulate signature capture
    setTimeout(() => {
      setSignatureCapture(false);
    }, 2000);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Play" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Cycle Control</h3>
            <p className="text-sm text-muted-foreground">Configure and initiate sterilization cycle</p>
          </div>
        </div>
        {activeCycle && (
          <div className="flex items-center space-x-2 px-3 py-1 bg-warning/10 text-warning rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
            <span>Cycle Running</span>
          </div>
        )}
      </div>
      {!activeCycle ? (
        <div className="space-y-6">
          {/* Program Selection */}
          <Select
            label="Sterilization Program"
            placeholder="Select sterilization parameters"
            options={programOptions}
            value={selectedProgram}
            onChange={setSelectedProgram}
            required
          />

          {/* Program Details */}
          {selectedProgram && (
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Program Parameters</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">134°C</div>
                  <div className="text-xs text-muted-foreground">Temperature</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2.1 bar</div>
                  <div className="text-xs text-muted-foreground">Pressure</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">18 min</div>
                  <div className="text-xs text-muted-foreground">Hold Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">45 min</div>
                  <div className="text-xs text-muted-foreground">Total Cycle</div>
                </div>
              </div>
            </div>
          )}

          {/* Operator Assignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Operator ID"
              type="text"
              placeholder="Scan operator badge"
              value={operatorId}
              onChange={(e) => setOperatorId(e?.target?.value)}
              required
            />
            <div className="flex flex-col justify-end">
              <Button
                variant="outline"
                iconName="PenTool"
                iconPosition="left"
                onClick={handleSignatureCapture}
                loading={signatureCapture}
                disabled={!operatorId}
              >
                {signatureCapture ? 'Capturing...' : 'Digital Signature'}
              </Button>
            </div>
          </div>

          {/* Pre-cycle Checklist */}
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="CheckSquare" size={16} />
              <span>Pre-Cycle Checklist</span>
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Check" size={14} />
                <span>All items validated for prerequisites</span>
              </div>
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Check" size={14} />
                <span>Autoclave chamber door sealed</span>
              </div>
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Check" size={14} />
                <span>Steam supply pressure adequate</span>
              </div>
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Check" size={14} />
                <span>Chemical indicators placed</span>
              </div>
            </div>
          </div>

          {/* Start Cycle Button */}
          <Button
            variant="default"
            size="lg"
            iconName="Play"
            iconPosition="left"
            onClick={handleStartCycle}
            disabled={!canStartCycle || !selectedProgram || !operatorId}
            fullWidth
          >
            Start Sterilization Cycle
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Cycle Info */}
          <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-medium text-foreground">Cycle #{activeCycle?.cycleNumber}</h4>
                <p className="text-sm text-muted-foreground">Started: {activeCycle?.startTime}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-warning">{activeCycle?.elapsed}</div>
                <div className="text-xs text-muted-foreground">Elapsed Time</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div
                className="h-2 bg-warning rounded-full transition-all duration-1000"
                style={{ width: `${activeCycle?.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Phase: {activeCycle?.currentPhase}</span>
              <span>{activeCycle?.progress}% Complete</span>
            </div>
          </div>

          {/* Emergency Stop */}
          <Button
            variant="destructive"
            iconName="Square"
            iconPosition="left"
            onClick={() => console.log('Emergency stop initiated')}
            fullWidth
          >
            Emergency Stop Cycle
          </Button>
        </div>
      )}
    </div>
  );
};

export default CycleControlPanel;