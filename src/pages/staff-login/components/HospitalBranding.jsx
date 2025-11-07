import React from 'react';
import Icon from '../../../components/AppIcon';
import { useTranslation } from '../../../utils/translations';

const HospitalBranding = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center space-y-6">
      {/* Hospital Logo */}
      <div className="flex items-center justify-center">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name="Building2" size={40} color="white" />
        </div>
      </div>

      {/* Hospital Information */}
      <div className="space-y-2">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          {t('compliance.hospitalName')}
        </h1>
        <p className="text-muted-foreground">
          {t('compliance.location')}
        </p>
        <p className="text-sm text-accent font-medium">
          {t('compliance.sterilizationDept')}
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon name="Shield" size={16} className="text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-foreground mb-1">
              Excellence en Stérilisation
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Garantir la sécurité des patients par des processus de stérilisation 
              rigoureux et une traçabilité complète des instruments médicaux.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="text-xs text-muted-foreground space-y-1">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Phone" size={12} />
          <span>+212 631 005 004</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Mail" size={12} />
          <span>cssd@hopital-central.ma</span>
        </div>
      </div>
    </div>
  );
};

export default HospitalBranding;