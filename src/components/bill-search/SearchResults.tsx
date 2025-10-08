import React from 'react';
import { AlertCircle, Clock, XCircle, Download } from 'lucide-react';
import { SearchResult } from '../../types/bill-search';
import ResultsHeader from './ResultsHeader';
import ResultsTable from './ResultsTable';
import ResultsFilters from './ResultsFilters';
import PaginationControls from './PaginationControls';

interface SearchResultsProps {
  results: {
    displayedResults: SearchResult[];
    filteredResults: SearchResult[];
  };
  pagination: {
    currentPage: number;
    rowsPerPage: number;
    totalPages: number;
    startIndex: number;
    endIndex: number;
  };
  sorting: {
    sortField: keyof SearchResult;
    sortDirection: 'asc' | 'desc';
  };
  selection: {
    selectedRows: Set<string>;
    heldBills: Set<string>;
  };
  filters: {
    billType: string;
    status: string;
  };
  errorMessage: string | null;
  onSort: (field: keyof SearchResult) => void;
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectRow: (id: string) => void;
  onHoldForPayment: () => void;
  onMakePayment: () => void;
  onExportCSV: () => void;
  onRemoveFromHold: (billId: string) => void;
  onClearAllHolds: () => void;
  onFiltersChange: (newFilters: { billType: string; status: string }) => void;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onNavigate: (billNumber: string) => void;
  onPayBill: (bill: SearchResult) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  pagination,
  sorting,
  selection,
  filters,
  errorMessage,
  onSort,
  onSelectAll,
  onSelectRow,
  onHoldForPayment,
  onMakePayment,
  onExportCSV,
  onRemoveFromHold,
  onClearAllHolds,
  onFiltersChange,
  onPageChange,
  onRowsPerPageChange,
  onNavigate,
  onPayBill
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="sticky top-[172px] bg-white z-30 border-b">
        <div className="px-2 sm:px-4 py-3">
          <ResultsHeader
            heldBills={selection.heldBills}
            selectedRows={selection.selectedRows}
            errorMessage={errorMessage}
            onHoldForPayment={onHoldForPayment}
            onMakePayment={onMakePayment}
            onExportCSV={onExportCSV}
            onClearAllHolds={onClearAllHolds}
          />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mt-3">
            <ResultsFilters
              filters={filters}
              onChange={onFiltersChange}
            />
            <PaginationControls
              pagination={pagination}
              totalResults={results.filteredResults.length}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="h-[calc(100vh-400px)] overflow-y-auto overflow-x-auto sm:overflow-x-hidden">
          <ResultsTable
            results={results.displayedResults}
            sorting={sorting}
            selection={selection}
            onSort={onSort}
            onSelectAll={onSelectAll}
            onSelectRow={onSelectRow}
            onRemoveFromHold={onRemoveFromHold}
            onNavigate={onNavigate}
            onPayBill={onPayBill}
          />
        </div>

        <div className="px-2 sm:px-4 py-3 border-t bg-white">
          <div className="flex justify-end">
            <PaginationControls
              pagination={pagination}
              totalResults={results.filteredResults.length}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;