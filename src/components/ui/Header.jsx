import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';

const Header = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <header className={`fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border shadow-clinical ${className}`}>
      <div className="flex items-center justify-between h-16 px-4">
         {/* Scanner (left) */}
        <div>
          <Button
            variant="outline"
            size="sm"
            iconName="Scan"
            iconPosition="left"
            onClick={() => {
              // Keep the old behaviour: placeholder for scanner activation
              console.log('Barcode scanner activated');
            }}
          >
            {/* visually keep small label for accessibility */}
            <span className="sr-only">Open Scanner</span>
            <Icon name="Scan" size={18} />
          </Button>
        </div>
        

        {/* Dashboard (right) */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            iconName="LayoutDashboard"
            onClick={() => navigate('/cssd-dashboard')}
            aria-label="Open Dashboard"
            title="Dashboard"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;