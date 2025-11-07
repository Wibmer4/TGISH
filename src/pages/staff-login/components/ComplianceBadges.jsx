import React from 'react';
import Icon from '../../../components/AppIcon';
import { useTranslation } from '../../../utils/translations';

const ComplianceBadges = () => {
  const { t } = useTranslation();

  const certifications = [
    {
      id: 'iso13485',
      name: t('compliance.iso13485'),
      icon: 'Award',
      status: 'active',
      description: 'Systèmes de management de la qualité - Dispositifs médicaux'
    },
    {
      id: 'iso14155',
      name: t('compliance.iso14155'),
      icon: 'ShieldCheck',
      status: 'active',
      description: 'Investigation clinique des dispositifs médicaux'
    },
    {
      id: 'ce',
      name: t('compliance.ce'),
      icon: 'CheckCircle',
      status: 'active',
      description: 'Conformité européenne'
    },
    {
      id: 'fda',
      name: t('compliance.fda'),
      icon: 'Verified',
      status: 'active',
      description: 'Administration américaine des denrées alimentaires et des médicaments'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-heading font-semibold text-foreground mb-2">
          {t('compliance.certifiedFacility')}
        </h3>
        <p className="text-xs text-muted-foreground">
          Certifications et conformité réglementaire
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {certifications?.map((cert) => (
          <div
            key={cert?.id}
            className="bg-card border border-border rounded-lg p-3 text-center hover:border-primary/50 transition-colors duration-200"
          >
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name={cert?.icon} size={16} className="text-success" />
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-xs font-medium text-foreground">
                {cert?.name}
              </div>
              <div className="flex items-center justify-center space-x-1">
                <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                <span className="text-xs text-success">Actif</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quality Assurance Statement */}
      <div className="bg-success/5 border border-success/20 rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="CheckCircle2" size={16} className="text-success" />
          <span className="text-sm font-medium text-success">
            Assurance Qualité Validée
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Tous nos processus sont régulièrement audités et certifiés 
          conformes aux normes internationales de stérilisation médicale.
        </p>
      </div>

      {/* Last Audit Information */}
      <div className="text-center text-xs text-muted-foreground">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Calendar" size={12} />
          <span>Dernier audit : Novembre 2025</span>
        </div>
        <div className="mt-1">
          Prochain audit prévu : Février 2026
        </div>
      </div>
    </div>
  );
};

export default ComplianceBadges;