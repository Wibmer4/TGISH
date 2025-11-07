import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const TraceabilityReports = () => {
  const [reportType, setReportType] = useState('');
  const [reportPeriod, setReportPeriod] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { value: 'patient-traceability', label: 'Patient Traceability Report' },
    { value: 'materiovigilance', label: 'Matériovigilance Compliance' },
    { value: 'cycle-audit', label: 'Sterilization Cycle Audit' },
    { value: 'equipment-usage', label: 'Equipment Usage Report' },
    { value: 'recall-analysis', label: 'Recall Impact Analysis' },
    { value: 'iso-compliance', label: 'ISO 8402 Compliance Report' }
  ];

  const reportPeriods = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const availableFilters = [
    { id: 'operating-rooms', label: 'Operating Rooms', description: 'Filter by specific OR locations' },
    { id: 'surgeons', label: 'Surgeons', description: 'Filter by primary surgeon' },
    { id: 'procedure-types', label: 'Procedure Types', description: 'Filter by surgery categories' },
    { id: 'equipment', label: 'Equipment', description: 'Filter by autoclave/washer units' },
    { id: 'operators', label: 'Operators', description: 'Filter by CSSD technicians' },
    { id: 'validation-status', label: 'Validation Status', description: 'Filter by approval status' }
  ];

  const recentReports = [
    {
      id: 'RPT-2025-001',
      type: 'Patient Traceability Report',
      period: 'November 2025',
      generatedBy: 'Quality Manager',
      generatedAt: '2025-11-06 14:30',
      status: 'Complete',
      recordCount: 1247,
      fileSize: '2.3 MB'
    },
    {
      id: 'RPT-2025-002',
      type: 'Matériovigilance Compliance',
      period: 'Q4 2025',
      generatedBy: 'Compliance Officer',
      generatedAt: '2025-11-05 09:15',
      status: 'Complete',
      recordCount: 3456,
      fileSize: '5.7 MB'
    },
    {
      id: 'RPT-2025-003',
      type: 'ISO 8402 Compliance Report',
      period: 'October 2025',
      generatedBy: 'Quality Manager',
      generatedAt: '2025-11-01 16:45',
      status: 'Complete',
      recordCount: 892,
      fileSize: '1.8 MB'
    }
  ];

  const handleFilterChange = (filterId, checked) => {
    if (checked) {
      setSelectedFilters(prev => [...prev, filterId]);
    } else {
      setSelectedFilters(prev => prev?.filter(id => id !== filterId));
    }
  };

  const handleGenerateReport = () => {
    if (!reportType || !reportPeriod) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      console.log('Generating report:', { reportType, reportPeriod, selectedFilters });
      setIsGenerating(false);
      // Reset form
      setReportType('');
      setReportPeriod('');
      setSelectedFilters([]);
    }, 3000);
  };

  const handleDownloadReport = (reportId) => {
    console.log('Downloading report:', reportId);
  };

  const handleViewReport = (reportId) => {
    console.log('Viewing report:', reportId);
  };

  return (
    <div className="space-y-6">
      {/* Report Generation */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Generate Reports</h3>
            <p className="text-sm text-muted-foreground">Create compliance and traceability reports</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Report Configuration */}
          <div className="space-y-4">
            <Select
              label="Report Type"
              placeholder="Select report type"
              options={reportTypes}
              value={reportType}
              onChange={setReportType}
              required
            />

            <Select
              label="Report Period"
              placeholder="Select time period"
              options={reportPeriods}
              value={reportPeriod}
              onChange={setReportPeriod}
              required
            />

            <div className="pt-4">
              <Button
                variant="default"
                iconName="FileText"
                iconPosition="left"
                onClick={handleGenerateReport}
                loading={isGenerating}
                disabled={!reportType || !reportPeriod}
                fullWidth
              >
                {isGenerating ? 'Generating Report...' : 'Generate Report'}
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Report Filters</h4>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {availableFilters?.map((filter) => (
                <Checkbox
                  key={filter?.id}
                  label={filter?.label}
                  description={filter?.description}
                  checked={selectedFilters?.includes(filter?.id)}
                  onChange={(e) => handleFilterChange(filter?.id, e?.target?.checked)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Recent Reports */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Archive" size={20} className="text-secondary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Recent Reports</h3>
              <p className="text-sm text-muted-foreground">Previously generated compliance reports</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
          >
            Refresh
          </Button>
        </div>

        <div className="space-y-4">
          {recentReports?.map((report) => (
            <div key={report?.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-foreground">{report?.type}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    report?.status === 'Complete' 
                      ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
                  }`}>
                    {report?.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="block">Period:</span>
                    <span className="font-medium text-foreground">{report?.period}</span>
                  </div>
                  <div>
                    <span className="block">Generated By:</span>
                    <span className="font-medium text-foreground">{report?.generatedBy}</span>
                  </div>
                  <div>
                    <span className="block">Records:</span>
                    <span className="font-medium text-foreground">{report?.recordCount?.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block">Size:</span>
                    <span className="font-medium text-foreground">{report?.fileSize}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Generated: {report?.generatedAt}
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  onClick={() => handleViewReport(report?.id)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  onClick={() => handleDownloadReport(report?.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Compliance Status */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="ShieldCheck" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Compliance Status</h3>
            <p className="text-sm text-muted-foreground">Current regulatory compliance overview</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">ISO 8402</span>
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
            <p className="text-xs text-muted-foreground">Compliant - Last audit: Nov 2025</p>
          </div>
          
          <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Matériovigilance</span>
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
            <p className="text-xs text-muted-foreground">Active - 100% traceability</p>
          </div>
          
          <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Data Archival</span>
              <Icon name="Clock" size={16} className="text-warning" />
            </div>
            <p className="text-xs text-muted-foreground">4.2 years archived - Review due</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraceabilityReports;