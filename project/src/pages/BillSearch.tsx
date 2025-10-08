import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchHeader from '../components/bill-search/SearchHeader';
import SearchModeToggle from '../components/bill-search/SearchModeToggle';
import SimpleSearch from '../components/bill-search/SimpleSearch';
import AdvancedSearch from '../components/bill-search/AdvancedSearch';
import SearchResults from '../components/bill-search/SearchResults';
import { SearchResult } from '../types/bill-search';

// Generate mock data outside component to avoid initialization error
const generateMockData = (): SearchResult[] => {
  const currentYear = new Date().getFullYear();
  const results: SearchResult[] = [];

  const realNames = [
    'James Wilson', 'Maria Garcia', 'Robert Taylor', 'Sarah Johnson', 'Michael Brown',
    'Emily Davis', 'David Martinez', 'Jennifer Anderson', 'William Thompson', 'Lisa Rodriguez',
    'John Smith', 'Patricia Moore', 'Richard White', 'Susan Jackson', 'Joseph Lee',
    'Margaret Miller', 'Charles Wilson', 'Elizabeth Davis', 'Thomas Anderson', 'Nancy Taylor'
  ];

  const cities = [
    { city: 'Winston-Salem', state: 'NC', zips: ['27101', '27103', '27104', '27105', '27106', '27107'] },
    { city: 'Kernersville', state: 'NC', zips: ['27284', '27285'] },
    { city: 'Clemmons', state: 'NC', zips: ['27012'] },
    { city: 'Rural Hall', state: 'NC', zips: ['27045'] }
  ];

  const streets = [
    'Silas Creek Pkwy', 'Reynolda Rd', 'Country Club Rd', 'Peters Creek Pkwy',
    'University Pkwy', 'Stratford Rd', 'Main St', 'Trade St', 'Liberty St',
    'Fourth St', 'Fifth St', 'Cherry St', 'Marshall St', 'Hawthorne Rd'
  ];

  // Generate 10 bills for each of the last 10 years
  for (let year = currentYear; year > currentYear - 11; year--) {
    for (let i = 0; i < 10; i++) {
      const billAmount = parseFloat((Math.random() * 10000 + 1000).toFixed(2));
      const status = ['Paid', 'Partially Paid', 'Unpaid'][Math.floor(Math.random() * 3)];
      
      let dueAmount = 0;
      if (status === 'Partially Paid') {
        dueAmount = parseFloat((billAmount * (Math.random() * 0.8)).toFixed(2));
      } else if (status === 'Unpaid') {
        dueAmount = billAmount;
      }

      const billFlags = ['Owner Transfer', 'Undelivered', ''];
      const billFlag = Math.random() > 0.7 ? '' : billFlags[Math.floor(Math.random() * (billFlags.length - 1))];

      const cityData = cities[Math.floor(Math.random() * cities.length)];
      const zip = cityData.zips[Math.floor(Math.random() * cityData.zips.length)];

      const baseNumber = (results.length + 1).toString().padStart(10, '0');
      const billNumber = `${baseNumber}-${year}-${year}-0000-00`;
      
      const streetAddress = `${Math.floor(Math.random() * 9999) + 1} ${streets[Math.floor(Math.random() * streets.length)]}`;
      const cityStateZip = `${cityData.city}, ${cityData.state} ${zip}`;
      
      const lastPayment = status !== 'Unpaid' 
        ? new Date(year, 6 + Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1).toLocaleDateString()
        : null;

      const billTypes = ['Business', 'Individual', 'Real', 'Special Assessment'];
      const billType = billTypes[Math.floor(Math.random() * billTypes.length)];

      results.push({
        id: `${results.length + 1}`,
        billNumber,
        taxYear: year.toString(),
        parcelId: billType === 'Business' || billType === 'Individual' ? '' : `${Math.floor(Math.random() * 999)}${Math.floor(Math.random() * 999)}${Math.floor(Math.random() * 999)}`,
        billType,
        ownerName: realNames[Math.floor(Math.random() * realNames.length)],
        propertyAddress: { street: streetAddress, cityStateZip },
        billFlag,
        billAmount,
        billStatus: status,
        billDueAmount: dueAmount,
        dueDate: `09/01/${year}`,
        interestBegins: `01/06/${year + 1}`,
        lastPayment
      });
    }
  }

  return results;
};

const mockResults = generateMockData();

const BillSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchMode, setSearchMode] = useState<'simple' | 'advanced'>('simple');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [advancedSuggestions, setAdvancedSuggestions] = useState<{
    ownerName: SearchResult[];
    parcelId: SearchResult[];
    propertyAddress: SearchResult[];
    invoiceNumber: SearchResult[];
    specialAssessment: SearchResult[];
  }>({
    ownerName: [],
    parcelId: [],
    propertyAddress: [],
    invoiceNumber: [],
    specialAssessment: []
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeAdvancedField, setActiveAdvancedField] = useState<keyof typeof advancedSearch | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [advancedSearch, setAdvancedSearch] = useState({
    ownerName: '',
    parcelId: '',
    propertyAddress: '',
    invoiceNumber: '',
    specialAssessment: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState<keyof SearchResult>('ownerName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [heldBills, setHeldBills] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('heldBills');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    billType: 'all',
    status: 'all',
    taxYear: 'all'
  });

  // Session timeout handling
  useEffect(() => {
    let sessionTimer: number;
    
    const resetTimer = () => {
      if (sessionTimer) clearTimeout(sessionTimer);
      // Set timeout to 30 minutes (1800000 ms)
      sessionTimer = window.setTimeout(() => {
        navigate('/');
      }, 1800000);
    };

    // Events to monitor for user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    // Initial timer setup
    resetTimer();

    // Initialize timer
    resetTimer();

    // Cleanup
    return () => {
      window.clearTimeout(sessionTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [navigate]);

  // Generate suggestions based on search query
  const generateSuggestions = (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    const matches = mockResults.filter(result => 
      result.billNumber.toLowerCase().includes(searchTerm) ||
      result.ownerName.toLowerCase().includes(searchTerm) ||
      result.parcelId.toLowerCase().includes(searchTerm) ||
      result.propertyAddress.street.toLowerCase().includes(searchTerm) ||
      result.propertyAddress.cityStateZip.toLowerCase().includes(searchTerm)
    );

    setSuggestions(matches);
  };

  // Update the suggestion click handler
  const handleSuggestionClick = (suggestion: SearchResult, type: 'term' | 'name' | 'address') => {
    let searchValue = '';
    
    switch (type) {
      case 'term':
        searchValue = searchQuery;
        break;
      case 'name':
        searchValue = suggestion.ownerName;
        break;
      case 'address':
        searchValue = suggestion.propertyAddress.street.includes(searchQuery.toLowerCase()) 
          ? suggestion.propertyAddress.street
          : suggestion.propertyAddress.cityStateZip;
        break;
    }
    
    setSearchQuery(searchValue);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Generate suggestions for advanced search fields
  const generateAdvancedSuggestions = (field: keyof typeof advancedSearch, value: string) => {
    if (!value.trim()) {
      setAdvancedSuggestions(prev => ({ ...prev, [field]: [] }));
      return;
    }

    const searchTerm = value.toLowerCase().trim();
    let matches: SearchResult[] = [];

    switch (field) {
      case 'ownerName':
        matches = mockResults.filter(result => 
          result.ownerName.toLowerCase().includes(searchTerm)
        );
        break;
      case 'parcelId':
        matches = mockResults.filter(result => 
          result.parcelId.toLowerCase().includes(searchTerm)
        );
        break;
      case 'propertyAddress':
        matches = mockResults.filter(result => 
          (result.propertyAddress.street + ' ' + result.propertyAddress.cityStateZip)
            .toLowerCase()
            .includes(searchTerm)
        );
        break;
      case 'invoiceNumber':
        matches = mockResults.filter(result => 
          result.billNumber.toLowerCase().includes(searchTerm)
        );
        break;
      case 'specialAssessment':
        matches = mockResults.filter(result => 
          result.billType === 'Special Assessment' && 
          result.billNumber.toLowerCase().includes(searchTerm)
        );
        break;
      case 'lastPayment':
        matches = mockResults.filter(result => 
          result.lastPayment && result.lastPayment.toLowerCase().includes(searchTerm)
        );
        break;
      case 'billFlags':
        matches = mockResults.filter(result => 
          result.billFlag && result.billFlag.toLowerCase().includes(searchTerm)
        );
        break;
    }

    setAdvancedSuggestions(prev => ({ 
      ...prev, 
      [field]: matches.slice(0, 5)
    }));
  };

  // Handle advanced search field change
  const handleAdvancedSearchChange = (field: keyof typeof advancedSearch, value: string) => {
    setAdvancedSearch(prev => ({ ...prev, [field]: value }));
    generateAdvancedSuggestions(field, value);
  };

  const handleClearAllAdvancedFields = () => {
    setAdvancedSearch({
      ownerName: '',
      parcelId: '',
      propertyAddress: '',
      invoiceNumber: '',
      specialAssessment: ''
    });
    setAdvancedSuggestions({
      ownerName: [],
      parcelId: [],
      propertyAddress: [],
      invoiceNumber: [],
      invoiceNumber: [],
      specialAssessment: []
    });
  };

  // Handle advanced suggestion click
  const handleAdvancedSuggestionClick = (field: keyof typeof advancedSearch, suggestion: SearchResult) => {
    let value = '';
    switch (field) {
      case 'ownerName':
        value = suggestion.ownerName;
        break;
      case 'parcelId':
        value = suggestion.parcelId;
        break;
      case 'propertyAddress':
        value = `${suggestion.propertyAddress.street}, ${suggestion.propertyAddress.cityStateZip}`;
        break;
      case 'invoiceNumber':
        value = suggestion.billNumber;
        break;
      case 'specialAssessment':
        value = suggestion.billNumber;
        break;
      case 'lastPayment':
        value = suggestion.lastPayment || '';
        break;
      case 'billFlags':
        value = suggestion.billFlag || '';
        break;
    }
    setAdvancedSearch(prev => ({ ...prev, [field]: value }));
    setAdvancedSuggestions(prev => ({ ...prev, [field]: [] }));
    setActiveAdvancedField(null);
  };

  // Handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    generateSuggestions(value);
    setShowSuggestions(true);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allBills = displayedResults.map(result => result.id);
      setSelectedRows(new Set(allBills));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const handleHoldForPayment = () => {
    setErrorMessage(null);
    
    if (selectedRows.size === 0) {
      setErrorMessage('Please select at least one unpaid bill to add to cart.');
      return;
    }
    
    const selectedBills = displayedResults.filter(bill => selectedRows.has(bill.id));
    const hasPaidBills = selectedBills.some(bill => bill.billStatus === 'Paid');
    
    if (hasPaidBills) {
      setErrorMessage('Only unpaid or partially paid bills can be added to cart. Please unselect paid bills.');
      return;
    }
    
    const newHeldBills = new Set(heldBills);
    selectedBills.forEach(bill => newHeldBills.add(bill.id));
    setHeldBills(newHeldBills);
    localStorage.setItem('heldBills', JSON.stringify(Array.from(newHeldBills)));
    setSelectedRows(new Set());
  };

  const removeFromHold = (billId: string) => {
    const newHeldBills = new Set(heldBills);
    newHeldBills.delete(billId);
    setHeldBills(newHeldBills);
    localStorage.setItem('heldBills', JSON.stringify(Array.from(newHeldBills)));
  };

  const handleMakePayment = () => {
    const heldBillsData = displayedResults
      .filter(bill => heldBills.has(bill.id))
      .map(bill => ({
        id: bill.id,
        billNumber: bill.billNumber,
        billDueAmount: bill.billDueAmount,
        ownerName: bill.ownerName
      }));
    
    navigate('/taxpayer-apps/payment', { state: { selectedBills: heldBillsData } });
  };

  const handlePayBill = (bill: SearchResult) => {
    const billData = {
      id: bill.id,
      billNumber: bill.billNumber,
      billDueAmount: bill.billDueAmount,
      ownerName: bill.ownerName
    };
    
    navigate('/taxpayer-apps/payment', { state: { selectedBills: [billData] } });
  };
  const clearAllHolds = () => {
    setHeldBills(new Set());
    localStorage.removeItem('heldBills');
  };

  // Memoize filtered results to avoid recalculation
  const filteredResults = React.useMemo(() => {
    let results = mockResults.filter(result => {
      // Parse selected values from comma-separated strings
      const selectedBillTypes = filters.billType === 'all' ? [] : filters.billType.split(',').filter(v => v);
      const selectedStatuses = filters.status === 'all' ? [] : filters.status.split(',').filter(v => v);
      const selectedTaxYears = filters.taxYear === 'all' ? [] : filters.taxYear.split(',').filter(v => v);
      
      if (selectedBillTypes.length === 0 && selectedStatuses.length === 0 && selectedTaxYears.length === 0) {
        return true;
      }

      const billTypeMap = {
        'business': 'Business',
        'individual': 'Individual',
        'real': 'Real',
        'special': 'Special Assessment'
      };

      const statusMap = {
        'paid': 'Paid',
        'unpaid': 'Unpaid',
        'partial': 'Partially Paid'
      };

      const matchesBillType = selectedBillTypes.length === 0 || 
        selectedBillTypes.some(type => result.billType === billTypeMap[type as keyof typeof billTypeMap]);

      const matchesStatus = selectedStatuses.length === 0 || 
        selectedStatuses.some(status => result.billStatus === statusMap[status as keyof typeof statusMap]);

      const matchesTaxYear = selectedTaxYears.length === 0 || 
        selectedTaxYears.includes(result.taxYear);

      return matchesBillType && matchesStatus && matchesTaxYear;
    });
    
    // Apply sorting
    results.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle numeric fields
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      // Handle string fields
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(result => 
        result.ownerName.toLowerCase().includes(query) ||
        result.billNumber.toLowerCase().includes(query) ||
        result.parcelId.toLowerCase().includes(query) ||
        (result.propertyAddress.street.toLowerCase().includes(query) || 
         result.propertyAddress.cityStateZip.toLowerCase().includes(query))
      );
    } else if (searchMode === 'advanced') {
      results = results.filter(result => {
        const matchOwnerName = !advancedSearch.ownerName || 
          result.ownerName.toLowerCase().includes(advancedSearch.ownerName.toLowerCase());
        
        const matchParcelId = !advancedSearch.parcelId || 
          result.parcelId.toLowerCase().includes(advancedSearch.parcelId.toLowerCase());
        
        const matchPropertyAddress = !advancedSearch.propertyAddress || 
          (result.propertyAddress.street + ' ' + result.propertyAddress.cityStateZip)
            .toLowerCase()
            .includes(advancedSearch.propertyAddress.toLowerCase());
        
        const matchInvoiceNumber = !advancedSearch.invoiceNumber || 
          result.billNumber.toLowerCase().includes(advancedSearch.invoiceNumber.toLowerCase());
        
        const matchSpecialAssessment = !advancedSearch.specialAssessment || 
          (result.billType === 'Special Assessment' && 
           result.billNumber.includes(advancedSearch.specialAssessment));
        
        return matchOwnerName && matchParcelId && matchPropertyAddress && matchInvoiceNumber &&
               matchSpecialAssessment;
      });
    }
    
    return results;
  }, [filters, searchQuery, searchMode, advancedSearch, sortField, sortDirection]);

  const handleSort = (field: keyof SearchResult) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: keyof SearchResult }) => {
    if (sortField !== field) return null;
    return (
      <span className="ml-1 inline-block">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  // Reset page when filters change
  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };
  
  // Calculate total pages
  const totalPages = React.useMemo(() => {
    return Math.ceil(filteredResults.length / rowsPerPage);
  }, [filteredResults.length, rowsPerPage]);

  // Reset page when rows per page changes
  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    const newTotalPages = Math.ceil(filteredResults.length / newRowsPerPage);
    const newCurrentPage = Math.min(currentPage, newTotalPages);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(newCurrentPage);
  };

  const exportToCSV = () => {
    // Get the data to export based on selection
    const dataToExport = selectedRows.size > 0
      ? mockResults.filter(result => selectedRows.has(result.id))
      : mockResults;

    // Create CSV header
    const headers = [
      'Bill Number',
      'Tax Year',
      'Parcel ID',
      'Bill Type',
      'Owner Name',
      'Property Address',
      'City/State/Zip',
      'Bill Flag',
      'Bill Amount',
      'Bill Status',
      'Due Amount',
      'Due Date',
      'Interest Begins',
      'Last Payment'
    ].join(',');

    // Convert data to CSV rows
    const csvRows = dataToExport.map(result => [
      `"${result.billNumber}"`,
      result.taxYear,
      `"${result.parcelId}"`,
      `"${result.billType}"`,
      `"${result.ownerName}"`,
      `"${result.propertyAddress.street}"`,
      `"${result.propertyAddress.cityStateZip}"`,
      `"${result.billFlag}"`,
      `"$${result.billAmount.toFixed(2)}"`,
      `"${result.billStatus}"`,
      `"$${result.billDueAmount.toFixed(2)}"`,
      `"${result.dueDate}"`,
      `"${result.billStatus === 'Paid' && result.billDueAmount === 0 ? '' : result.interestBegins}"`,
      `"${result.lastPayment || ''}"`,
    ].join(','));

    // Combine header and rows
    const csvContent = [headers, ...csvRows].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const fileName = selectedRows.size > 0
      ? `selected_tax_bills_${new Date().toISOString().split('T')[0]}.csv`
      : `all_tax_bills_${new Date().toISOString().split('T')[0]}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  
  // Get displayed results for current page
  const displayedResults = filteredResults.slice(startIndex, endIndex);
  
  // Ensure current page is valid when data changes
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <div className="sticky top-16 bg-gray-50 z-40 border-b">
        <div className="max-w-[1600px] mx-auto px-2 sm:px-4 py-4">
          <SearchHeader onPrint={handlePrint} />
          
          <div className="bg-white rounded-lg shadow-md p-2 sm:p-4 mb-4">
            <SearchModeToggle
              searchMode={searchMode}
              onModeChange={setSearchMode}
            />

            {searchMode === 'simple' ? (
              <SimpleSearch
                searchQuery={searchQuery}
                suggestions={suggestions}
                showSuggestions={showSuggestions}
                onSearchChange={handleSearchChange}
                onSuggestionClick={handleSuggestionClick}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onFocus={() => {
                  if (searchQuery.trim()) {
                    setShowSuggestions(true);
                  }
                }}
              />
            ) : (
              <AdvancedSearch
                advancedSearch={advancedSearch}
                advancedSuggestions={advancedSuggestions}
                activeAdvancedField={activeAdvancedField}
                onFieldChange={handleAdvancedSearchChange}
                onSuggestionClick={handleAdvancedSuggestionClick}
                onFieldFocus={setActiveAdvancedField}
                onFieldBlur={() => setTimeout(() => setActiveAdvancedField(null), 200)}
                onClearAll={handleClearAllAdvancedFields}
              />
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-2 sm:px-4">
        <SearchResults
          results={{
            displayedResults,
            filteredResults
          }}
          pagination={{
            currentPage,
            rowsPerPage,
            totalPages,
            startIndex,
            endIndex
          }}
          sorting={{
            sortField,
            sortDirection,
            SortIcon
          }}
          selection={{
            selectedRows,
            heldBills
          }}
          filters={filters}
          errorMessage={errorMessage}
          onSort={handleSort}
          onSelectAll={handleSelectAll}
          onSelectRow={handleSelectRow}
          onHoldForPayment={handleHoldForPayment}
          onMakePayment={handleMakePayment}
          onExportCSV={exportToCSV}
          onRemoveFromHold={removeFromHold}
          onClearAllHolds={clearAllHolds}
          onFiltersChange={handleFiltersChange}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          onNavigate={(billNumber) => navigate(`/taxpayer-apps/bill/${billNumber}`)}
          onPayBill={handlePayBill}
        />
      </div>
    </div>
  );
};

export default BillSearch;