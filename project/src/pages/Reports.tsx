import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileSpreadsheet, Download, Calendar, Filter, ChevronDown } from 'lucide-react';

interface ReportConfig {
  id: string;
  name: string;
  description: string;
  parameters: {
    taxYears?: boolean;
    billType?: boolean;
    status?: boolean;
    jurisdiction?: boolean;
    comparisonPeriod?: boolean;
    dateRange?: boolean;
  };
}

const AVAILABLE_REPORTS: ReportConfig[] = [
  {
    id: 'delinquent-bills',
    name: 'Delinquent Bills Report',
    description: 'List of all delinquent tax bills with aging analysis and collection status',
    parameters: {
      taxYears: true,
      billType: true,
      jurisdiction: true
    }
  },
  {
    id: 'sales',
    name: 'TBD - Report 1',
    description: 'TBD',
    parameters: {
      dateRange: true,
      jurisdiction: true,
      billType: true
    }
  },
  {
    id: 'sales-comparison',
    name: 'TBD - Report 2',
    description: 'TBD',
    parameters: {
      comparisonPeriod: true,
      jurisdiction: true,
      billType: true
    }
  }
];

const Reports: React.FC = () => {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState<ReportConfig | null>(null);
  const [showTaxYearDropdown, setShowTaxYearDropdown] = useState(false);
  
  // Generate last 10 years
  const currentYear = new Date().getFullYear();
  const taxYears = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());
  
  const [reportParams, setReportParams] = useState({
    startDate: '',
    endDate: '',
    comparisonPeriod: 'monthly',
    billType: 'all',
    status: 'all',
    jurisdiction: 'all',
    selectedTaxYears: [] as string[]
  });

  const handleTaxYearToggle = (year: string) => {
    const newSelectedYears = reportParams.selectedTaxYears.includes(year)
      ? reportParams.selectedTaxYears.filter(y => y !== year)
      : [...reportParams.selectedTaxYears, year];
    
    setReportParams({ ...reportParams, selectedTaxYears: newSelectedYears });
  };

  const handleSelectAllTaxYears = () => {
    const allSelected = reportParams.selectedTaxYears.length === taxYears.length;
    setReportParams({ 
      ...reportParams, 
      selectedTaxYears: allSelected ? [] : [...taxYears] 
    });
  };

  const getTaxYearDisplayText = () => {
    if (reportParams.selectedTaxYears.length === 0) {
      return 'Select Tax Years';
    } else if (reportParams.selectedTaxYears.length === taxYears.length) {
      return 'All Tax Years Selected';
    } else if (reportParams.selectedTaxYears.length === 1) {
      return reportParams.selectedTaxYears[0];
    } else {
      return `${reportParams.selectedTaxYears.length} Tax Years Selected`;
    }
  };

  const handleGenerateReport = () => {
    // In a real application, this would make an API call to generate the report
    console.log('Generating report:', selectedReport?.name, 'with params:', reportParams);
    
    // Mock report generation - create a CSV
    const headers = ['Bill Number', 'Amount', 'Status', 'Date'];
    const mockData = [
      ['2024001', '1000.00', 'Paid', '2024-03-15'],
      ['2024002', '2500.00', 'Unpaid', '2024-03-16'],
      ['2024003', '1500.00', 'Partially Paid', '2024-03-17']
    ];

    const csvContent = [
      headers.join(','),
      ...mockData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selectedReport?.id}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate('/taxpayer-apps/bill-search')}
          className="flex items-center text-[#002B5B] hover:text-[#003875]"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Bill Search
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Reports</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Available Reports</h2>
          <div className="space-y-3">
            {AVAILABLE_REPORTS.map(report => (
              <button
                key={report.id}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedReport?.id === report.id
                    ? 'border-[#002B5B] bg-[#002B5B] bg-opacity-5'
                    : 'border-gray-200 hover:border-[#002B5B] hover:bg-gray-50'
                }`}
                onClick={() => setSelectedReport(report)}
              >
                <div className="flex items-start">
                  <FileSpreadsheet className="w-5 h-5 text-[#002B5B] mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800">{report.name}</h3>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-4">
          {selectedReport ? (
            <>
              <h2 className="text-lg font-medium text-gray-800 mb-4">Report Parameters</h2>
              <div className="space-y-4">
                {selectedReport.parameters.taxYears && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax Years</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowTaxYearDropdown(!showTaxYearDropdown)}
                        className="w-full px-3 py-2 border rounded-lg text-sm text-left bg-white hover:bg-gray-50 flex items-center justify-between"
                      >
                        <span className={reportParams.selectedTaxYears.length === 0 ? 'text-gray-500' : 'text-gray-900'}>
                          {getTaxYearDisplayText()}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showTaxYearDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showTaxYearDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          <div className="p-2 border-b">
                            <button
                              type="button"
                              onClick={handleSelectAllTaxYears}
                              className="w-full text-left px-2 py-1 text-sm hover:bg-gray-50 rounded flex items-center"
                            >
                              <input
                                type="checkbox"
                                checked={reportParams.selectedTaxYears.length === taxYears.length}
                                onChange={() => {}}
                                className="mr-2 rounded border-gray-300 text-[#002B5B] focus:ring-[#002B5B]"
                              />
                              <span className="font-medium">Select All</span>
                            </button>
                          </div>
                          <div className="p-1">
                            {taxYears.map(year => (
                              <button
                                key={year}
                                type="button"
                                onClick={() => handleTaxYearToggle(year)}
                                className="w-full text-left px-2 py-1 text-sm hover:bg-gray-50 rounded flex items-center"
                              >
                                <input
                                  type="checkbox"
                                  checked={reportParams.selectedTaxYears.includes(year)}
                                  onChange={() => {}}
                                  className="mr-2 rounded border-gray-300 text-[#002B5B] focus:ring-[#002B5B]"
                                />
                                {year}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {reportParams.selectedTaxYears.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {reportParams.selectedTaxYears.sort((a, b) => parseInt(b) - parseInt(a)).map(year => (
                          <span
                            key={year}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#002B5B] text-white"
                          >
                            {year}
                            <button
                              type="button"
                              onClick={() => handleTaxYearToggle(year)}
                              className="ml-1 hover:bg-white hover:bg-opacity-20 rounded-full p-0.5"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {selectedReport.parameters.dateRange && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                          value={reportParams.startDate}
                          onChange={(e) => setReportParams({ ...reportParams, startDate: e.target.value })}
                        />
                        <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                          value={reportParams.endDate}
                          onChange={(e) => setReportParams({ ...reportParams, endDate: e.target.value })}
                        />
                        <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                )}

                {selectedReport.parameters.comparisonPeriod && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Comparison Period</label>
                    <div className="relative">
                      <select
                        className="w-full px-3 py-2 border rounded-lg text-sm appearance-none"
                        value={reportParams.comparisonPeriod}
                        onChange={(e) => setReportParams({ ...reportParams, comparisonPeriod: e.target.value })}
                      >
                        <option value="monthly">Month over Month</option>
                        <option value="quarterly">Quarter over Quarter</option>
                        <option value="yearly">Year over Year</option>
                      </select>
                      <Filter className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                )}

                {selectedReport.parameters.billType && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bill Type</label>
                    <div className="relative">
                      <select
                        className="w-full px-3 py-2 border rounded-lg text-sm appearance-none"
                        value={reportParams.billType}
                        onChange={(e) => setReportParams({ ...reportParams, billType: e.target.value })}
                      >
                        <option value="all">All Bill Types</option>
                        <option value="business">Business</option>
                        <option value="individual">Individual</option>
                        <option value="real">Real</option>
                        <option value="special">Special Assessment</option>
                      </select>
                      <Filter className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                )}

                {selectedReport.parameters.status && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <div className="relative">
                      <select
                        className="w-full px-3 py-2 border rounded-lg text-sm appearance-none"
                        value={reportParams.status}
                        onChange={(e) => setReportParams({ ...reportParams, status: e.target.value })}
                      >
                        <option value="all">All Statuses</option>
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                        <option value="partial">Partially Paid</option>
                      </select>
                      <Filter className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                )}

                {selectedReport.parameters.jurisdiction && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jurisdiction</label>
                    <div className="relative">
                      <select
                        className="w-full px-3 py-2 border rounded-lg text-sm appearance-none"
                        value={reportParams.jurisdiction}
                        onChange={(e) => setReportParams({ ...reportParams, jurisdiction: e.target.value })}
                      >
                        <option value="all">All Jurisdictions</option>
                        <option value="county">County</option>
                        <option value="city">City</option>
                        <option value="fire">Fire District</option>
                      </select>
                      <Filter className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleGenerateReport}
                    className="flex items-center px-4 py-2 bg-[#002B5B] text-white rounded-lg hover:bg-[#003875] transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p>Select a report from the left to configure parameters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;