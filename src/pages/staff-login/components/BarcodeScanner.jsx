import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useTranslation } from '../../../utils/translations';
//b//
const BarcodeScanner = ({ onScan, isActive, onToggle }) => {
  const { t } = useTranslation();
  const [scanningAnimation, setScanningAnimation] = useState(false);

  useEffect(() => {
    if (isActive) {
      setScanningAnimation(true);
    } else {
      setScanningAnimation(false);
    }
  }, [isActive]);

  // Simulate barcode scanning with keyboard input
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!isActive) return;
      
      // Simulate quick barcode scan (employee IDs for testing)
      const testEmployeeIds = ['TECH001', 'SUP001', 'MGR001', 'EMP001234', 'QC001'];
      
      // Listen for Enter key or specific employee ID patterns
      if (event?.key === 'Enter' || event?.key === 'Tab') {
        const randomId = testEmployeeIds?.[Math.floor(Math.random() * testEmployeeIds?.length)];
        onScan(randomId);
      }
    };

    if (isActive) {
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isActive, onScan]);

  return (
    <div className="text-center space-y-6">
      {/* Scanner Visual */}
      <div className={`relative mx-auto w-48 h-32 border-2 rounded-lg overflow-hidden ${
        isActive ? 'border-primary bg-primary/5' : 'border-muted bg-muted/20'
      }`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon 
            name="Scan" 
            size={48} 
            className={`${isActive ? 'text-primary' : 'text-muted-foreground'}`} 
          />
        </div>
        
        {/* Scanning Animation */}
        {scanningAnimation && (
          <div className="absolute inset-0">
            <div className="w-full h-0.5 bg-primary animate-pulse" 
                 style={{ 
                   animation: 'scanLine 2s ease-in-out infinite',
                   transformOrigin: 'top'
                 }} 
            />
          </div>
        )}
      </div>

      {/* Scanner Status */}
      <div className="space-y-2">
        <div className={`flex items-center justify-center space-x-2 text-sm font-medium ${
          isActive ? 'text-primary' : 'text-muted-foreground'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isActive ? 'bg-primary animate-pulse' : 'bg-muted-foreground'
          }`} />
          <span>
            {isActive ? t('login.scannerActive') : t('login.scannerInactive')}
          </span>
        </div>
        
        {isActive && (
          <p className="text-xs text-muted-foreground">
            {t('login.scannerActive')}
          </p>
        )}
      </div>

      {/* Scanner Control */}
      <Button
        variant={isActive ? 'outline' : 'default'}
        onClick={onToggle}
        iconName={isActive ? 'Square' : 'Scan'}
        iconPosition="left"
      >
        {isActive ? 'Désactiver scanner' : t('login.activateScanner')}
      </Button>

      {/* Demo Instructions */}
      <div className="bg-muted/30 border border-border rounded-lg p-4 text-xs text-muted-foreground">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <p className="font-medium mb-1">Démo - Instructions de test :</p>
            <ul className="space-y-1">
              <li>• Appuyez sur Entrée pour simuler un scan</li>
              <li>• IDs de test : TECH001, SUP001, MGR001</li>
              <li>• Le scanner détecte automatiquement les badges</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scanLine {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(128px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default BarcodeScanner;