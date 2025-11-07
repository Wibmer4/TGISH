import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useTranslation } from '../../../utils/translations';

const CycleDocumentation = ({ validation }) => {
  const [activeTab, setActiveTab] = useState('parameters');
  const [expandedSection, setExpandedSection] = useState(null);
  const { t } = useTranslation();

  if (!validation) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">{t('ui.noLoadSelected')}</h3>
        <p className="text-muted-foreground">{t('ui.selectLoad')}</p>
      </div>
    );
  }

  const tabs = [
    { id: 'parameters', label: t('qualityControl.tabs.parameters'), icon: 'Settings' },
    { id: 'indicators', label: t('qualityControl.tabs.indicators'), icon: 'TestTube' },
    { id: 'charts', label: t('qualityControl.tabs.charts'), icon: 'TrendingUp' },
    { id: 'photos', label: t('qualityControl.tabs.photos'), icon: 'Camera' }
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderParameters = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Thermometer" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">{t('qualityControl.parameterLabels.temperature')}</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{validation?.cycleData?.temperature}°C</div>
          <div className="text-xs text-muted-foreground">Target: 134°C</div>
        </div>
        
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Gauge" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">{t('qualityControl.parameterLabels.pressure')}</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{validation?.cycleData?.pressure} bar</div>
          <div className="text-xs text-muted-foreground">Target: 2.1 bar</div>
        </div>
        
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">{t('qualityControl.parameterLabels.holdTime')}</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{validation?.cycleData?.holdTime} min</div>
          <div className="text-xs text-muted-foreground">Target: 3 min</div>
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
          <button
          onClick={() => toggleSection('cyclePhases')}
          className="w-full flex items-center justify-between p-4 bg-muted/20 hover:bg-muted/40 transition-colors"
        >
          <span className="font-medium text-foreground">{t('qualityControl.cyclePhases')}</span>
          <Icon name={expandedSection === 'cyclePhases' ? 'ChevronUp' : 'ChevronDown'} size={16} />
        </button>
        {expandedSection === 'cyclePhases' && (
          <div className="p-4 space-y-3">
            {validation?.cycleData?.phases?.map((phase, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${phase?.status === 'completed' ? 'bg-success' : 'bg-muted-foreground'}`}></div>
                  <span className="font-medium text-foreground">{phase?.name}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {phase?.duration} | {phase?.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderIndicators = () => (
    <div className="space-y-6">
      {/* Physical Indicators */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="p-4 bg-muted/20">
          <h3 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="Eye" size={16} />
            <span>{t('qualityControl.physicalIndicatorsLabel')}</span>
          </h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {validation?.indicators?.physical?.map((indicator, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <div className="font-medium text-foreground">{indicator?.type}</div>
                  <div className="text-sm text-muted-foreground">Position: {indicator?.position}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  indicator?.result === 'passed' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                }`}>
                  {indicator?.result?.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chemical Indicators */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="p-4 bg-muted/20">
          <h3 className="font-medium text-foreground flex items-center space-x-2">
            <Icon name="TestTube" size={16} />
            <span>{t('qualityControl.chemicalIndicatorsLabel')}</span>
          </h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {validation?.indicators?.chemical?.map((indicator, index) => (
              <div key={index} className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{indicator?.type}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    indicator?.result === 'passed' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                  }`}>
                    {indicator?.result?.toUpperCase()}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div>Lot: {indicator?.lotNumber}</div>
                  <div>Expected: {indicator?.expectedColor} → Actual: {indicator?.actualColor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Biological Indicators */}
      {validation?.biologicalIndicator && (
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="p-4 bg-muted/20">
              <h3 className="font-medium text-foreground flex items-center space-x-2">
                <Icon name="Microscope" size={16} />
                <span>{t('qualityControl.biologicalIndicatorsLabel')}</span>
              </h3>
          </div>
          <div className="p-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-foreground">Geobacillus stearothermophilus</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  validation?.biologicalResult === 'passed' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                }`}>
                  {validation?.biologicalResult?.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Incubation:</span>
                  <div className="font-medium">48 hours at 56°C</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Reading:</span>
                  <div className="font-medium">No growth detected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCharts = () => (
    <div className="space-y-6">
      <div className="bg-muted/30 p-6 rounded-lg text-center">
        <Icon name="TrendingUp" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">{t('qualityControl.tempPressureCurves')}</h3>
        <p className="text-muted-foreground mb-4">{t('qualityControl.tempPressureCurves')} {validation?.cycleNumber}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{validation?.cycleData?.temperature}°C</div>
            <div className="text-muted-foreground">Peak Temperature</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{validation?.cycleData?.pressure} bar</div>
            <div className="text-muted-foreground">Peak Pressure</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPhotos = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {validation?.visualEvidence?.map((evidence, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            <div className="aspect-video bg-muted/30 flex items-center justify-center">
              <Image
                src={evidence?.imageUrl}
                alt={evidence?.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h4 className="font-medium text-foreground mb-1">{evidence?.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{evidence?.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{t('qualityControl.photoCaptured')} {new Date(evidence.timestamp)?.toLocaleString()}</span>
                <span>{t('qualityControl.photoInspector')} {evidence?.inspectorId}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Cycle Documentation
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Load {validation?.loadId} - Cycle {validation?.cycleNumber}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export PDF
          </Button>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Content */}
      <div className="p-6">
        {activeTab === 'parameters' && renderParameters()}
        {activeTab === 'indicators' && renderIndicators()}
        {activeTab === 'charts' && renderCharts()}
        {activeTab === 'photos' && renderPhotos()}
      </div>
    </div>
  );
};

export default CycleDocumentation;
