import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BarcodeScanner from './components/BarcodeScanner';
import LoginForm from './components/LoginForm';
import ComplianceBadges from './components/ComplianceBadges';
import HospitalBranding from './components/HospitalBranding';
import { useTranslation } from '../../utils/translations';

const StaffLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState('barcode'); // 'barcode' or 'manual'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [scannerActive, setScannerActive] = useState(true);

  // Mock user database
  const mockUsers = [
    { id: 'EMP001234', password: 'tech123', name: 'Sarah Johnson', role: 'technician', department: 'CSSD' },
    { id: 'TECH001', password: 'tech123', name: 'Mike Rodriguez', role: 'technician', department: 'CSSD' },
    { id: 'SUP001', password: 'sup123', name: 'Dr. Emily Chen', role: 'supervisor', department: 'CSSD' },
    { id: 'MGR001', password: 'mgr123', name: 'James Wilson', role: 'manager', department: 'CSSD' },
    { id: 'QC001', password: 'qc123', name: 'Lisa Thompson', role: 'quality_control', department: 'CSSD' }
  ];

  useEffect(() => {
    // Auto-activate scanner on page load
    setScannerActive(true);
    setError('');
  }, []);

  const authenticateUser = (employeeId, password = null) => {
    const user = mockUsers?.find(u => u?.id === employeeId);
    
    if (!user) {
      return { success: false, message: t('login.employeeNotFound') };
    }

    // For barcode login, skip password check
    if (loginMethod === 'barcode' || (password && user?.password === password)) {
      return { 
        success: true, 
        user: {
          id: user?.id,
          name: user?.name,
          role: user?.role,
          department: user?.department,
          loginTime: new Date()?.toISOString()
        }
      };
    }

    return { success: false, message: t('login.invalidPassword') };
  };

  const handleBarcodeLogin = (scannedId) => {
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const result = authenticateUser(scannedId);
      
      if (result?.success) {
        // Store user session
        localStorage.setItem('cssd_user', JSON.stringify(result?.user));
        localStorage.setItem('cssd_session_start', new Date()?.toISOString());
        
        // Navigate to dashboard
        navigate('/cssd-dashboard');
      } else {
        setError(result?.message);
        setScannerActive(false);
      }
      
      setIsLoading(false);
    }, 1200);
  };

  const handleManualLogin = (employeeId, password) => {
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const result = authenticateUser(employeeId, password);
      
      if (result?.success) {
        // Store user session
        localStorage.setItem('cssd_user', JSON.stringify(result?.user));
        localStorage.setItem('cssd_session_start', new Date()?.toISOString());
        
        // Navigate to dashboard
        navigate('/cssd-dashboard');
      } else {
        setError(result?.message);
      }
      
      setIsLoading(false);
    }, 800);
  };

  const toggleScannerActive = () => {
    setScannerActive(!scannerActive);
    setError('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Panel - Branding & Compliance */}
        <div className="lg:w-1/2 bg-gradient-to-br from-primary/5 to-accent/5 p-8 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-8">
            <HospitalBranding />
            <ComplianceBadges />
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="lg:w-1/2 bg-card p-8 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-8">
            {/* Login Header */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto">
                <Icon name="UserCheck" size={32} color="white" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {t('login.title')}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {t('login.subtitle')}
                </p>
              </div>
            </div>

            {/* Login Method Toggle */}
            <div className="flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setLoginMethod('barcode')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  loginMethod === 'barcode' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="Scan" size={16} />
                <span>{t('login.barcodeScanner')}</span>
              </button>
              <button
                onClick={() => setLoginMethod('manual')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  loginMethod === 'manual' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="Keyboard" size={16} />
                <span>{t('login.manualEntry')}</span>
              </button>
            </div>

            {/* Login Content */}
            <div className="space-y-6">
              {loginMethod === 'barcode' ? (
                <BarcodeScanner
                  onScan={handleBarcodeLogin}
                  isActive={scannerActive}
                  onToggle={toggleScannerActive}
                />
              ) : (
                <LoginForm
                  onLogin={handleManualLogin}
                  isLoading={isLoading}
                  error={error}
                />
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center space-x-3 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-primary font-medium">
                    {loginMethod === 'barcode' ? t('login.processingScan') : t('login.authenticating')}
                  </span>
                </div>
              )}

              {/* Error Display for Barcode Method */}
              {error && loginMethod === 'barcode' && (
                <div className="flex items-center space-x-2 p-3 bg-error/10 border border-error/20 rounded-md text-error text-sm">
                  <Icon name="AlertCircle" size={16} />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Help & Support */}
            <div className="text-center space-y-4">
              <div className="text-xs text-muted-foreground">
                {t('login.needHelp')}
              </div>
              
              <div className="flex items-center justify-center space-x-4 text-xs">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="HelpCircle"
                  iconPosition="left"
                  onClick={() => console.log('Help requested')}
                >
                  {t('common.help')}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Settings"
                  iconPosition="left"
                  onClick={() => console.log('Scanner settings')}
                >
                  {t('login.scannerSettings')}
                </Button>
              </div>
            </div>

            {/* Session Info */}
            <div className="bg-muted/50 border border-border rounded-lg p-3 text-xs text-center text-muted-foreground">
              <div className="flex items-center justify-center space-x-4">
                <span>{t('login.sessionTimeout')}</span>
                <span>•</span>
                <span>{t('login.autoLogout')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;