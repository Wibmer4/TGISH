import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AutoclaveLoadingPanel = ({ onItemScanned, loadedItems, totalWeight, capacity }) => {
  const [scanInput, setScanInput] = useState('');
  const [selectedAutoclave, setSelectedAutoclave] = useState('');

  const autoclaveOptions = [
    { value: 'AC-001', label: 'Autoclave AC-001 (Chamber A)' },
    { value: 'AC-002', label: 'Autoclave AC-002 (Chamber B)' },
    { value: 'AC-003', label: 'Autoclave AC-003 (Chamber C)' }
  ];

  const handleScan = () => {
    if (scanInput?.trim()) {
      onItemScanned(scanInput?.trim());
      setScanInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleScan();
    }
  };

  const capacityPercentage = (totalWeight / capacity) * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Package" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Autoclave Loading</h3>
            <p className="text-sm text-muted-foreground">Scan containers and kits for sterilization</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span>Ready to Load</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Autoclave Selection */}
        <div className="space-y-4">
          <Select
            label="Select Autoclave"
            placeholder="Choose autoclave chamber"
            options={autoclaveOptions}
            value={selectedAutoclave}
            onChange={setSelectedAutoclave}
            required
          />

          {/* Barcode Scanner */}
          <div className="space-y-2">
            <Input
              label="Scan Item Barcode"
              type="text"
              placeholder="Scan or enter barcode"
              value={scanInput}
              onChange={(e) => setScanInput(e?.target?.value)}
              onKeyPress={handleKeyPress}
            />
            <Button
              variant="outline"
              iconName="Scan"
              iconPosition="left"
              onClick={handleScan}
              disabled={!scanInput?.trim()}
              fullWidth
            >
              Add to Load
            </Button>
          </div>
        </div>

        {/* Capacity Indicator */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Load Capacity</span>
              <span className="text-sm text-muted-foreground">
                {totalWeight?.toFixed(1)} / {capacity} kg
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  capacityPercentage > 90 
                    ? 'bg-error' 
                    : capacityPercentage > 75 
                    ? 'bg-warning' :'bg-success'
                }`}
                style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0%</span>
              <span>{capacityPercentage?.toFixed(1)}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Load Statistics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-foreground">{loadedItems?.length}</div>
              <div className="text-xs text-muted-foreground">Items Loaded</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-foreground">
                {Math.max(0, capacity - totalWeight)?.toFixed(1)}
              </div>
              <div className="text-xs text-muted-foreground">kg Remaining</div>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border">
        <Button variant="outline" size="sm" iconName="RotateCcw">
          Clear Load
        </Button>
        <Button variant="outline" size="sm" iconName="FileText">
          Load Summary
        </Button>
        <Button variant="outline" size="sm" iconName="Printer">
          Print Labels
        </Button>
      </div>
    </div>
  );
};

export default AutoclaveLoadingPanel;