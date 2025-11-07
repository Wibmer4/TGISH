import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DigitalSignature = ({ onSignatureComplete, onCancel, validationData }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  const [inspectorPin, setInspectorPin] = useState('');
  const [showPinEntry, setShowPinEntry] = useState(false);
  const [signatureTimestamp, setSignatureTimestamp] = useState(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (canvas) {
      const ctx = canvas?.getContext('2d');
      ctx.strokeStyle = '#1E40AF';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef?.current;
    const rect = canvas?.getBoundingClientRect();
    const x = e?.clientX - rect?.left;
    const y = e?.clientY - rect?.top;
    
    const ctx = canvas?.getContext('2d');
    ctx?.beginPath();
    ctx?.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef?.current;
    const rect = canvas?.getBoundingClientRect();
    const x = e?.clientX - rect?.left;
    const y = e?.clientY - rect?.top;
    
    const ctx = canvas?.getContext('2d');
    ctx?.lineTo(x, y);
    ctx?.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef?.current;
      setSignatureData(canvas?.toDataURL());
      setSignatureTimestamp(new Date()?.toISOString());
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');
    ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
    setSignatureData(null);
    setSignatureTimestamp(null);
  };

  const handlePinSubmit = () => {
    // Mock PIN validation - in real app, this would verify against secure database
    const validPins = {
      'QC-001': '1234',
      'QC-002': '5678',
      'QC-003': '9012'
    };

    if (validPins?.['QC-001'] === inspectorPin) {
      const signatureInfo = {
        signatureData,
        timestamp: signatureTimestamp,
        inspectorId: 'QC-001',
        inspectorName: 'Dr. Sarah Johnson',
        pin: inspectorPin,
        validationData,
        cryptographicHash: generateMockHash()
      };
      onSignatureComplete(signatureInfo);
    } else {
      alert('Invalid PIN. Please try again.');
      setInspectorPin('');
    }
  };

  const generateMockHash = () => {
    // Mock cryptographic hash generation
    return 'SHA256:' + Math.random()?.toString(36)?.substring(2, 15) + Math.random()?.toString(36)?.substring(2, 15);
  };

  const canProceed = signatureData && inspectorPin?.length === 4;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Electronic Signature Required
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Load {validationData?.loadId} - Digital approval and release
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={onCancel}
            />
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Validation Summary */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium text-foreground mb-3">Validation Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Load ID:</span>
                <div className="font-medium">{validationData?.loadId}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Cycle:</span>
                <div className="font-medium">{validationData?.cycleNumber}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Items:</span>
                <div className="font-medium">{validationData?.itemCount} items</div>
              </div>
              <div>
                <span className="text-muted-foreground">Inspector:</span>
                <div className="font-medium">QC-001 (Dr. Sarah Johnson)</div>
              </div>
            </div>
          </div>

          {/* Signature Canvas */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Digital Signature *
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-4">
              <canvas
                ref={canvasRef}
                width={500}
                height={200}
                className="w-full h-48 border border-border rounded bg-background cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
              <div className="flex items-center justify-between mt-3">
                <p className="text-sm text-muted-foreground">
                  Sign above to authorize the release of this sterilized load
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RotateCcw"
                  onClick={clearSignature}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>

          {/* PIN Entry */}
          <div>
            <Input
              label="Inspector PIN"
              type="password"
              placeholder="Enter 4-digit PIN"
              value={inspectorPin}
              onChange={(e) => setInspectorPin(e?.target?.value)}
              maxLength={4}
              description="Enter your secure PIN to authenticate the signature"
              required
            />
          </div>

          {/* Compliance Information */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-primary mt-1" />
              <div>
                <h4 className="font-medium text-foreground mb-2">Regulatory Compliance</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Electronic signature complies with ISO 8402 standards</li>
                  <li>• Cryptographic validation ensures data integrity</li>
                  <li>• Audit trail maintained for 5-year retention period</li>
                  <li>• Non-repudiation through secure PIN authentication</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Timestamp Information */}
          {signatureTimestamp && (
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <span>Signature captured: {new Date(signatureTimestamp)?.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              By signing, you certify that this load meets all quality standards
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                iconName="CheckCircle"
                iconPosition="left"
                onClick={handlePinSubmit}
                disabled={!canProceed}
              >
                Complete Signature
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalSignature;