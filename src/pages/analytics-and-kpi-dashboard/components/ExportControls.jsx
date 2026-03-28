import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ExportControls = ({ onExport, isExporting = false }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportScope, setExportScope] = useState('current');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRawData, setIncludeRawData] = useState(false);
  const [scheduledExport, setScheduledExport] = useState(false);
  const [scheduleFrequency, setScheduleFrequency] = useState('weekly');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV Data' },
    { value: 'json', label: 'JSON Data' },
    { value: 'png', label: 'PNG Images' }
  ];

  const scopeOptions = [
    { value: 'current', label: 'Current View' },
    { value: 'all-kpis', label: 'All KPIs' },
    { value: 'throughput', label: 'Throughput Only' },
    { value: 'delays', label: 'Delay Analysis' },
    { value: 'utilization', label: 'Utilization Data' },
    { value: 'predictions', label: 'AI Insights' }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const handleExport = () => {
    const exportConfig = {
      format: exportFormat,
      scope: exportScope,
      includeCharts,
      includeRawData,
      timestamp: new Date()?.toISOString(),
      scheduled: scheduledExport,
      frequency: scheduledExport ? scheduleFrequency : null,
      recipient: scheduledExport ? recipientEmail : null
    };

    console.log('Exporting with config:', exportConfig);
    onExport?.(exportConfig);
  };

  const handleScheduleExport = () => {
    if (!recipientEmail) {
      alert('Please enter a recipient email address');
      return;
    }

    const scheduleConfig = {
      format: exportFormat,
      scope: exportScope,
      frequency: scheduleFrequency,
      recipient: recipientEmail,
      includeCharts,
      includeRawData,
      enabled: true
    };

    console.log('Scheduling export with config:', scheduleConfig);
    // In real app, this would create a scheduled export job
    alert('Export scheduled successfully!');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Download" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Export & Reporting</h3>
            <p className="text-sm text-muted-foreground">Download data and schedule automated reports</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          iconSize={16}
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Configuration */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Export Configuration</h4>
          
          <Select
            label="Format"
            options={formatOptions}
            value={exportFormat}
            onChange={setExportFormat}
            description="Choose the output format for your export"
          />
          
          <Select
            label="Data Scope"
            options={scopeOptions}
            value={exportScope}
            onChange={setExportScope}
            description="Select which data to include in the export"
          />
          
          <div className="space-y-3">
            <Checkbox
              label="Include Charts & Visualizations"
              checked={includeCharts}
              onChange={(e) => setIncludeCharts(e?.target?.checked)}
              description="Embed charts and graphs in the export"
            />
            
            <Checkbox
              label="Include Raw Data"
              checked={includeRawData}
              onChange={(e) => setIncludeRawData(e?.target?.checked)}
              description="Include underlying data tables"
            />
          </div>
        </div>

        {/* Scheduled Reports */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Scheduled Reports</h4>
          
          <Checkbox
            label="Enable Scheduled Export"
            checked={scheduledExport}
            onChange={(e) => setScheduledExport(e?.target?.checked)}
            description="Automatically generate and send reports"
          />
          
          {scheduledExport && (
            <div className="space-y-4 pl-6 border-l-2 border-border">
              <Select
                label="Frequency"
                options={frequencyOptions}
                value={scheduleFrequency}
                onChange={setScheduleFrequency}
              />
              
              <Input
                label="Recipient Email"
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e?.target?.value)}
                placeholder="controller@railway.com"
                description="Email address to receive scheduled reports"
              />
            </div>
          )}
        </div>
      </div>
      {/* Advanced Options */}
      {showAdvanced && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-4">Advanced Options</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Checkbox
                label="Include Metadata"
                description="Add export timestamp and user information"
              />
              <Checkbox
                label="Compress Large Files"
                description="Automatically zip files larger than 10MB"
              />
              <Checkbox
                label="Password Protection"
                description="Secure exports with password protection"
              />
            </div>
            
            <div className="space-y-3">
              <Checkbox
                label="Include Filters Applied"
                description="Document current filter settings in export"
              />
              <Checkbox
                label="High Resolution Charts"
                description="Export charts at higher resolution (larger file size)"
              />
              <Checkbox
                label="Include AI Insights"
                description="Add predictive analytics and recommendations"
              />
            </div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>
            {exportFormat === 'pdf' && 'PDF reports include charts and formatted data'}
            {exportFormat === 'excel' && 'Excel files support multiple sheets and formulas'}
            {exportFormat === 'csv' && 'CSV format is ideal for data analysis tools'}
            {exportFormat === 'json' && 'JSON format for API integration and processing'}
            {exportFormat === 'png' && 'High-quality images of charts and visualizations'}
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          {scheduledExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleScheduleExport}
              disabled={isExporting || !recipientEmail}
              iconName="Calendar"
              iconPosition="left"
              iconSize={16}
            >
              Schedule Report
            </Button>
          )}
          
          <Button
            variant="default"
            onClick={handleExport}
            disabled={isExporting}
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            {isExporting ? 'Exporting...' : 'Export Now'}
          </Button>
        </div>
      </div>
      {/* Export History */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3">Recent Exports</h4>
        <div className="space-y-2">
          {[
            { name: 'Weekly_Analytics_Report.pdf', date: '2025-09-01 09:30', size: '2.4 MB' },
            { name: 'Throughput_Data.xlsx', date: '2025-08-31 16:45', size: '1.8 MB' },
            { name: 'Delay_Analysis.csv', date: '2025-08-30 14:20', size: '856 KB' }
          ]?.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
              <div className="flex items-center space-x-2">
                <Icon name="FileText" size={16} className="text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-foreground">{file?.name}</div>
                  <div className="text-xs text-muted-foreground">{file?.date} • {file?.size}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                iconSize={14}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportControls;