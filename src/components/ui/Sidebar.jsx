import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useTranslation } from '../../utils/translations';

const Sidebar = ({ className = '' }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('cssd_theme');
      if (stored) return stored;
      if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)')?.matches) return 'dark';
    } catch (e) {}
    return 'light';
  });

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('cssd_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('cssd_theme', 'light');
      }
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const navItems = [
    { label: t('header.dashboard'), path: '/cssd-dashboard', icon: 'LayoutDashboard' },
    { label: t('header.processing'), path: '/pre-disinfection-workflow', icon: 'Workflow' },
    { label: t('header.qualityControl'), path: '/quality-control-validation', icon: 'ShieldCheck' },
    { label: t('header.traceability'), path: '/patient-traceability-system', icon: 'Search' },
    { label: t('nav.inventory'), path: '/sterile-inventory-management', icon: 'Box' },
    { label: t('nav.equipment'), path: '/equipment-management', icon: 'Settings' },
    { label: t('nav.compliance'), path: '/compliance-reporting', icon: 'ShieldCheck' },
    { label: t('header.cycleManagement'), path: '/sterilization-cycle-management', icon: 'RotateCcw' }
  ];

  return (
    <aside className={`fixed top-0 left-0 h-full z-[100] bg-card border-r border-border shadow-clinical transition-all ${className}`} style={{ width: collapsed ? 64 : 280 }}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Shield" size={18} color="white" />
            </div>
            {!collapsed && <div className="font-semibold">TGISH</div>}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" iconName={collapsed ? 'ChevronRight' : 'ChevronLeft'} onClick={() => setCollapsed((c) => !c)} />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} className={({ isActive }) => `flex items-center space-x-3 px-3 py-2 rounded-md transition-colors duration-150 ${isActive ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`}>
                  <Icon name={item.icon} size={18} />
                  {!collapsed && <span className="text-sm">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-3 py-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={16} />
              {!collapsed && <div className="text-sm">{t('common.theme')}</div>}
            </div>
            <Button variant="outline" size="sm" onClick={toggleTheme}>{!collapsed ? (theme === 'dark' ? 'Light' : 'Dark') : <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={16} />}</Button>
          </div>
          <div className="mt-3">
            <Button variant="ghost" size="sm" fullWidth onClick={() => navigate('/staff-login')}>{!collapsed ? t('header.staffLogin') : <Icon name="User" size={16} />}</Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
