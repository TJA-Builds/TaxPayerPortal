import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ResultsFiltersProps {
  filters: {
    billType: string;
    status: string;
    taxYear: string;
  };
  onChange: (newFilters: { billType: string; status: string; taxYear: string }) => void;
}

const ResultsFilters: React.FC<ResultsFiltersProps> = ({ filters, onChange }) => {
  // Generate tax year options (current year - 10 years)
  const currentYear = new Date().getFullYear();
  const taxYears = Array.from({ length: 11 }, (_, i) => (currentYear - i).toString());
  
  const [showTaxYearDropdown, setShowTaxYearDropdown] = useState(false);
  const [showBillTypeDropdown, setShowBillTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // Parse selected values from comma-separated strings
  const getSelectedValues = (filterValue: string) => {
    return filterValue === 'all' ? [] : filterValue.split(',').filter(v => v);
  };

  // Convert array back to comma-separated string
  const formatFilterValue = (values: string[]) => {
    return values.length === 0 ? 'all' : values.join(',');
  };

  const selectedTaxYears = getSelectedValues(filters.taxYear);
  const selectedBillTypes = getSelectedValues(filters.billType);
  const selectedStatuses = getSelectedValues(filters.status);

  const handleTaxYearToggle = (year: string) => {
    const newSelected = selectedTaxYears.includes(year)
      ? selectedTaxYears.filter(y => y !== year)
      : [...selectedTaxYears, year];
    
    onChange({ ...filters, taxYear: formatFilterValue(newSelected) });
  };

  const handleBillTypeToggle = (type: string) => {
    const newSelected = selectedBillTypes.includes(type)
      ? selectedBillTypes.filter(t => t !== type)
      : [...selectedBillTypes, type];
    
    onChange({ ...filters, billType: formatFilterValue(newSelected) });
  };

  const handleStatusToggle = (status: string) => {
    const newSelected = selectedStatuses.includes(status)
      ? selectedStatuses.filter(s => s !== status)
      : [...selectedStatuses, status];
    
    onChange({ ...filters, status: formatFilterValue(newSelected) });
  };

  const handleSelectAllTaxYears = () => {
    const allSelected = selectedTaxYears.length === taxYears.length;
    onChange({ 
      ...filters, 
      taxYear: formatFilterValue(allSelected ? [] : [...taxYears])
    });
  };

  const handleSelectAllBillTypes = () => {
    const allTypes = ['business', 'individual', 'real', 'special'];
    const allSelected = selectedBillTypes.length === allTypes.length;
    onChange({ 
      ...filters, 
      billType: formatFilterValue(allSelected ? [] : [...allTypes])
    });
  };

  const handleSelectAllStatuses = () => {
    const allStatuses = ['paid', 'unpaid', 'partial'];
    const allSelected = selectedStatuses.length === allStatuses.length;
    onChange({ 
      ...filters, 
      status: formatFilterValue(allSelected ? [] : [...allStatuses])
    });
  };

  const getTaxYearDisplayText = () => {
    if (selectedTaxYears.length === 0) {
      return 'All Tax Years';
    } else if (selectedTaxYears.length === taxYears.length) {
      return 'All Tax Years Selected';
    } else if (selectedTaxYears.length === 1) {
      return selectedTaxYears[0];
    } else {
      return `${selectedTaxYears.length} Tax Years Selected`;
    }
  };

  const getBillTypeDisplayText = () => {
    if (selectedBillTypes.length === 0) {
      return 'All Bill Types';
    } else if (selectedBillTypes.length === 4) {
      return 'All Bill Types Selected';
    } else if (selectedBillTypes.length === 1) {
      const typeMap: { [key: string]: string } = {
        'business': 'Business',
        'individual': 'Individual',
        'real': 'Real',
        'special': 'Special Assessment'
      };
      return typeMap[selectedBillTypes[0]];
    } else {
      return `${selectedBillTypes.length} Bill Types Selected`;
    }
  };

  const getStatusDisplayText = () => {
    if (selectedStatuses.length === 0) {
      return 'All Statuses';
    } else if (selectedStatuses.length === 3) {
      return 'All Statuses Selected';
    } else if (selectedStatuses.length === 1) {
      const statusMap: { [key: string]: string } = {
        'paid': 'Paid',
        'unpaid': 'Unpaid',
        'partial': 'Partially Paid'
      };
      return statusMap[selectedStatuses[0]];
    } else {
      return `${selectedStatuses.length} Statuses Selected`;
    }
  };

  return (
    <div className="flex gap-2">
      {/* Tax Year Filter */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowTaxYearDropdown(!showTaxYearDropdown)}
          className="border rounded px-2 py-1 text-sm bg-white hover:bg-gray-50 flex items-center justify-between min-w-[140px]"
        >
          <span className={selectedTaxYears.length === 0 ? 'text-gray-500' : 'text-gray-900'}>
            {getTaxYearDisplayText()}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 ml-2 transition-transform ${showTaxYearDropdown ? 'rotate-180' : ''}`} />
        </button>
        
        {showTaxYearDropdown && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto min-w-[200px]">
            <div className="p-2 border-b">
              <button
                type="button"
                onClick={handleSelectAllTaxYears}
                className="w-full text-left px-2 py-1 text-sm hover:bg-gray-50 rounded flex items-center"
              >
                <input
                  type="checkbox"
                  checked={selectedTaxYears.length === taxYears.length}
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
                    checked={selectedTaxYears.includes(year)}
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

      {/* Bill Type Filter */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowBillTypeDropdown(!showBillTypeDropdown)}
          className="border rounded px-2 py-1 text-sm bg-white hover:bg-gray-50 flex items-center justify-between min-w-[140px]"
        >
          <span className={selectedBillTypes.length === 0 ? 'text-gray-500' : 'text-gray-900'}>
            {getBillTypeDisplayText()}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 ml-2 transition-transform ${showBillTypeDropdown ? 'rotate-180' : ''}`} />
        </button>
        
        {showBillTypeDropdown && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto min-w-[200px]">
            <div className="p-2 border-b">
              <button
                type="button"
                onClick={handleSelectAllBillTypes}
                className="w-full text-left px-2 py-1 text-sm hover:bg-gray-50 rounded flex items-center"
              >
                <input
                  type="checkbox"
                  checked={selectedBillTypes.length === 4}
                  onChange={() => {}}
                  className="mr-2 rounded border-gray-300 text-[#002B5B] focus:ring-[#002B5B]"
                />
                <span className="font-medium">Select All</span>
              </button>
            </div>
            <div className="p-1">
              {[
                { value: 'business', label: 'Business' },
                { value: 'individual', label: 'Individual' },
               { value: 'public', label: 'Public' },
                { value: 'real', label: 'Real' },
                { value: 'special', label: 'Special Assessment' }
              ].map(type => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleBillTypeToggle(type.value)}
                  className="w-full text-left px-2 py-1 text-sm hover:bg-gray-50 rounded flex items-center"
                >
                  <input
                    type="checkbox"
                    checked={selectedBillTypes.includes(type.value)}
                    onChange={() => {}}
                    className="mr-2 rounded border-gray-300 text-[#002B5B] focus:ring-[#002B5B]"
                  />
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Status Filter */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowStatusDropdown(!showStatusDropdown)}
          className="border rounded px-2 py-1 text-sm bg-white hover:bg-gray-50 flex items-center justify-between min-w-[140px]"
        >
          <span className={selectedStatuses.length === 0 ? 'text-gray-500' : 'text-gray-900'}>
            {getStatusDisplayText()}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 ml-2 transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
        </button>
        
        {showStatusDropdown && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto min-w-[200px]">
            <div className="p-2 border-b">
              <button
                type="button"
                onClick={handleSelectAllStatuses}
                className="w-full text-left px-2 py-1 text-sm hover:bg-gray-50 rounded flex items-center"
              >
                <input
                  type="checkbox"
                  checked={selectedStatuses.length === 3}
                  onChange={() => {}}
                  className="mr-2 rounded border-gray-300 text-[#002B5B] focus:ring-[#002B5B]"
                />
                <span className="font-medium">Select All</span>
              </button>
            </div>
            <div className="p-1">
              {[
                { value: 'paid', label: 'Paid' },
                { value: 'unpaid', label: 'Unpaid' },
                { value: 'partial', label: 'Partially Paid' }
              ].map(status => (
                <button
                  key={status.value}
                  type="button"
                  onClick={() => handleStatusToggle(status.value)}
                  className="w-full text-left px-2 py-1 text-sm hover:bg-gray-50 rounded flex items-center"
                >
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(status.value)}
                    onChange={() => {}}
                    className="mr-2 rounded border-gray-300 text-[#002B5B] focus:ring-[#002B5B]"
                  />
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsFilters;