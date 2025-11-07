import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BarcodeScanner = ({ onScanSuccess, isActive, onToggleScanner }) => {
  const [scanInput, setScanInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isActive && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [isActive]);

  const handleScanSubmit = (e) => {
    e?.preventDefault();
    if (scanInput?.trim()) {
      setIsScanning(true);
      
      // Simulate barcode processing
      setTimeout(() => {
        const scanData = {
          barcode: scanInput?.trim(),
          timestamp: new Date(),
          type: scanInput?.startsWith('BSK') ? 'basket' : 'instrument'
        };
        
        setScanHistory(prev => [scanData, ...prev?.slice(0, 4)]);
        onScanSuccess(scanData);
        setScanInput('');
        setIsScanning(false);
      }, 1500);
    }
  };

  const handleQuickScan = (barcode) => {
    setScanInput(barcode);
    const scanData = {
      barcode,
      timestamp: new Date(),
      type: barcode?.startsWith('BSK') ? 'basket' : 'instrument'
    };
    onScanSuccess(scanData);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isActive ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <Icon name="Scan" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Barcode Scanner
            </h3>
            <p className="text-sm text-muted-foreground">
              Scan contaminated baskets and instrument trays
            </p>
          </div>
        </div>
        <Button
          variant={isActive ? "destructive" : "default"}
          size="sm"
          iconName={isActive ? "Square" : "Play"}
          iconPosition="left"
          onClick={onToggleScanner}
        >
          {isActive ? 'Stop' : 'Start'} Scanner
        </Button>
      </div>
      {isActive && (
        <div className="space-y-4">
          <form onSubmit={handleScanSubmit} className="space-y-4">
            <Input
              ref={inputRef}
              label="Barcode Input"
              type="text"
              placeholder="Scan or enter barcode (e.g., BSK001, ITR002)"
              value={scanInput}
              onChange={(e) => setScanInput(e?.target?.value)}
              disabled={isScanning}
              description="Position barcode under scanner or type manually"
            />
            
            <div className="flex space-x-2">
              <Button
                type="submit"
                variant="default"
                iconName="Scan"
                iconPosition="left"
                disabled={!scanInput?.trim() || isScanning}
                loading={isScanning}
              >
                Process Scan
              </Button>
              <Button
                type="button"
                variant="outline"
                iconName="RotateCcw"
                onClick={() => setScanInput('')}
                disabled={isScanning}
              >
                Clear
              </Button>
            </div>
          </form>

          {/* Quick Scan Options */}
          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Quick Scan Options</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { code: 'BSK001', label: 'Surgical Basket 001' },
                { code: 'BSK002', label: 'Orthopedic Basket 002' },
                { code: 'ITR001', label: 'Instrument Tray 001' },
                { code: 'ITR002', label: 'Laparoscopy Tray 002' }
              ]?.map((item) => (
                <Button
                  key={item?.code}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickScan(item?.code)}
                  className="justify-start text-left"
                >
                  <div>
                    <div className="font-data text-xs">{item?.code}</div>
                    <div className="text-xs text-muted-foreground">{item?.label}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Scan History */}
          {scanHistory?.length > 0 && (
            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Recent Scans</h4>
              <div className="space-y-2">
                {scanHistory?.map((scan, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={scan?.type === 'basket' ? 'Package' : 'Wrench'} 
                        size={16} 
                        className="text-muted-foreground" 
                      />
                      <span className="font-data text-sm">{scan?.barcode}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {scan?.timestamp?.toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {!isActive && (
        <div className="text-center py-8">
          <Icon name="ScanLine" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Activate scanner to begin barcode registration
          </p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;