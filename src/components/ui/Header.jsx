import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import { useTranslation } from '../../utils/translations';

const Header = ({ className = '' }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('cssd_theme');
      if (stored) return stored;
      if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)')?.matches) return 'dark';
    } catch (e) {
      // ignore
    }
    return 'light';
  });

  const primaryNavItems = [
    { 
      label: t('header.dashboard'), 
      path: '/cssd-dashboard', 
      icon: 'LayoutDashboard',
      description: t('header.dashboardDesc')
    },
    { 
      label: t('header.processing'), 
      path: '/pre-disinfection-workflow', 
      icon: 'Workflow',
      description: t('header.processingDesc')
    },
    { 
      label: t('header.qualityControl'), 
      path: '/quality-control-validation', 
      icon: 'ShieldCheck',
      description: t('header.qualityControlDesc')
    },
    { 
      label: t('header.traceability'), 
      path: '/patient-traceability-system', 
      icon: 'Search',
      description: t('header.traceabilityDesc')
    }
    ,
    {
      label: t('nav.inventory'),
      path: '/sterile-inventory-management',
      icon: 'Box',
      description: t('nav.inventory')
    },
    {
      label: t('nav.equipment'),
      path: '/equipment-management',
      icon: 'Settings',
      description: t('nav.equipment')
    },
    {
      label: t('nav.compliance'),
      path: '/compliance-reporting',
      icon: 'ShieldCheck',
      description: t('nav.compliance')
    }
  ];

  const secondaryNavItems = [
    { 
      label: t('header.cycleManagement'), 
      path: '/sterilization-cycle-management', 
      icon: 'RotateCcw',
      description: t('header.cycleManagementDesc')
    }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMenuOpen(false);
    setShowMoreMenu(false);
  };

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('cssd_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('cssd_theme', 'light');
      }
    } catch (e) {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const currentPath = window.location?.pathname;

  return (
    <header className={`fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border shadow-clinical ${className}`}>
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={24} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-heading font-semibold text-foreground">
                {t('header.title')}
              </h1>
              <p className="text-xs text-muted-foreground font-caption">
                {t('header.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {primaryNavItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                currentPath === item?.path
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={item?.description}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </button>
          ))}
          
          {/* More Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
            >
              <Icon name="MoreHorizontal" size={18} />
              <span>{t('common.more')}</span>
            </button>
            
            {showMoreMenu && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-popover border border-border rounded-md shadow-clinical-lg z-[1010]">
                <div className="py-1">
                  {secondaryNavItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                        currentPath === item?.path
                          ? 'bg-accent text-accent-foreground'
                          : 'text-popover-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <div className="text-left">
                        <div className="font-medium">{item?.label}</div>
                        <div className="text-xs text-muted-foreground">{item?.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Status Indicators */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>{t('header.systemsOnline')}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="hidden sm:flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Scan"
              iconPosition="left"
              onClick={() => console.log('Barcode scanner activated')}
            >
              {t('common.scan')}
            </Button>
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              iconName={theme === 'dark' ? 'Sun' : 'Moon'}
              onClick={toggleTheme}
              aria-pressed={theme === 'dark'}
              aria-label={theme === 'dark' ? 'Basculer en mode clair' : 'Basculer en mode sombre'}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            />
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <div className="text-sm font-medium text-foreground">Tech-001</div>
              <div className="text-xs text-muted-foreground">{t('header.cssdTechnician')}</div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              iconName="User"
              onClick={() => handleNavigation('/staff-login')}
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="px-6 py-4 space-y-2">
            {[...primaryNavItems, ...secondaryNavItems]?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentPath === item?.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <div className="text-left">
                  <div>{item?.label}</div>
                  <div className="text-xs opacity-75">{item?.description}</div>
                </div>
              </button>
            ))}
            
            {/* Mobile Quick Actions */}
            <div className="pt-4 border-t border-border">
              <Button
                variant="outline"
                fullWidth
                iconName="Scan"
                iconPosition="left"
                onClick={() => {
                  console.log('Mobile barcode scanner activated');
                  setIsMenuOpen(false);
                }}
              >
                {t('header.activateScanner')}
              </Button>
            </div>
          </nav>
        </div>
      )}
      {/* Compliance Status Banner */}
      <div className="bg-success/5 border-b border-success/20 px-6 py-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-success">
              <Icon name="CheckCircle" size={14} />
              <span className="font-medium">{t('header.isoCompliant')}</span>
            </div>
            <div className="text-muted-foreground">
              {t('header.lastAudit')}
            </div>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <span>{t('header.session')}</span>
            <span>•</span>
            <span>{t('header.shift')}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;