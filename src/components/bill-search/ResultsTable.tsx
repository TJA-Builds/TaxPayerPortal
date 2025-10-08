import React from 'react';
import { Clock, XCircle, CreditCard } from 'lucide-react';
import { SearchResult } from '../../types/bill-search';

interface ResultsTableProps {
  results: SearchResult[];
  sorting: {
    sortField: keyof SearchResult;
    sortDirection: 'asc' | 'desc';
  };
  selection: {
    selectedRows: Set<string>;
    heldBills: Set<string>;
  };
  onSort: (field: keyof SearchResult) => void;
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectRow: (id: string) => void;
  onRemoveFromHold: (billId: string) => void;
  onNavigate: (billNumber: string) => void;
  onPayBill: (bill: SearchResult) => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({
  results,
  sorting,
  selection,
  onSort,
  onSelectAll,
  onSelectRow,
  onRemoveFromHold,
  onNavigate,
  onPayBill
}) => {
  const SortIcon = ({ field }: { field: keyof SearchResult }) => {
    if (sorting.sortField !== field) return null;
    return (
      <span className="ml-1 inline-block">
        {sorting.sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  return (
    <div className="relative">
      <table className="w-full table-fixed" role="table" aria-label="Tax bill search results">
        <thead className="sticky top-0 bg-gray-50 z-10">
          <tr>
            <th className="w-[25px] px-0.5 py-1 text-left text-[11px] font-medium text-gray-500">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#002B5B] focus:ring-[#002B5B] w-3 h-3"
                checked={results.length > 0 && results.every(result => selection.selectedRows.has(result.id))}
                onChange={onSelectAll}
                aria-label="Select all bills"
              />
            </th>
            <th
              className="w-[140px] px-0.5 py-1 text-left text-[11px] font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('billNumber')}
              role="columnheader"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSort('billNumber');
                }
              }}
              aria-sort={sorting.sortField === 'billNumber' ? (sorting.sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              Bill Number <SortIcon field="billNumber" />
            </th>
            <th 
              className="w-[50px] px-0.5 py-1 text-left text-[11px] font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('taxYear')}
              role="columnheader"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSort('taxYear');
                }
              }}
              aria-sort={sorting.sortField === 'taxYear' ? (sorting.sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              Tax Year <SortIcon field="taxYear" />
            </th>
            <th 
              className="w-[100px] px-0.5 py-1 text-left text-[11px] font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('parcelId')}
              role="columnheader"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSort('parcelId');
                }
              }}
              aria-sort={sorting.sortField === 'parcelId' ? (sorting.sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              Parcel ID <SortIcon field="parcelId" />
            </th>
            <th 
              className="w-[80px] px-0.5 py-1 text-left text-[11px] font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('billType')}
              role="columnheader"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSort('billType');
                }
              }}
              aria-sort={sorting.sortField === 'billType' ? (sorting.sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              Bill Type <SortIcon field="billType" />
            </th>
            <th 
              className="w-[120px] px-0.5 py-1 text-left text-[11px] font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('ownerName')}
              role="columnheader"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSort('ownerName');
                }
              }}
              aria-sort={sorting.sortField === 'ownerName' ? (sorting.sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              Owner Name <SortIcon field="ownerName" />
            </th>
            <th 
              className="w-[160px] px-0.5 py-1 text-left text-[11px] font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('propertyAddress')}
              role="columnheader"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSort('propertyAddress');
                }
              }}
              aria-sort={sorting.sortField === 'propertyAddress' ? (sorting.sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              Property Address <SortIcon field="propertyAddress" />
            </th>
            <th 
              className="w-[60px] px-0.5 py-1 text-left text-[11px] font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('billFlag')}
              role="columnheader"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSort('billFlag');
                }
              }}
              aria-sort={sorting.sortField === 'billFlag' ? (sorting.sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              Flags <SortIcon field="billFlag" />
            </th>
            <th 
              className="w-[80px] px-0.5 py-1 text-right text-[11px] font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('billAmount')}
              role="columnheader"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSort('billAmount');
                }
              }}
              aria-sort={sorting.sortField === 'billAmount' ? (sorting.sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              Original Bill Amount <SortIcon field="billAmount" />
            </th>
            <th 
              className="w-[90px] px-0.5 py-1 text-right text-[11px] font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
              onClick={() => onSort('billDueAmount')}
              role="columnheader"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSort('billDueAmount');
                }
              }}
              aria-sort={sorting.sortField === 'billDueAmount' ? (sorting.sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              Amount Due <SortIcon field="billDueAmount" />
            </th>
            <th 
              className="w-[100px] px-0.5 py-1 text-left text-[11px] font-medium text-gray-500 cursor-pointer hover:bg-gray-100 pl-4"
              onClick={() => onSort('billStatus')}
              role="columnheader"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSort('billStatus');
                }
              }}
              aria-sort={sorting.sortField === 'billStatus' ? (sorting.sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              Bill Status <SortIcon field="billStatus" />
            </th>
            <th className="w-[80px] px-0.5 py-1 text-center text-[11px] font-medium text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id} className="border-t hover:bg-gray-50">
              <td className="px-0.5 py-1">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#002B5B] focus:ring-[#002B5B] w-3 h-3"
                  checked={selection.selectedRows.has(result.id)}
                  onChange={() => onSelectRow(result.id)}
                  aria-label={`Select bill ${result.billNumber}`}
                />
              </td>
              <td className="px-0.5 py-1 text-[11px] font-mono">
                <button
                  type="button"
                  className="bill-number text-[#002B5B] hover:underline font-medium underline-offset-2 focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:ring-offset-1"
                  onClick={() => onNavigate(result.billNumber)}
                  aria-label={`View details for bill ${result.billNumber}`}
                >
                  {result.billNumber}
                </button>
              </td>
              <td className="px-0.5 py-1 text-[11px] truncate">{result.taxYear}</td>
              <td className="px-0.5 py-1 text-[11px] truncate">{result.parcelId}</td>
              <td className="px-0.5 py-1 text-[11px]">{result.billType}</td>
              <td className="px-0.5 py-1 text-[11px] truncate">{result.ownerName}</td>
              <td className="px-0.5 py-1">
                <div>
                  <div className="text-[11px] truncate">{result.propertyAddress.street}</div>
                  <div className="text-[11px] text-gray-500 truncate">{result.propertyAddress.cityStateZip}</div>
                </div>
              </td>
              <td className="px-0.5 py-1 text-[11px]">{result.billFlag}</td>
              <td className="px-0.5 py-1 text-[11px] text-right pr-2">${result.billAmount.toFixed(2)}</td>
              <td className="px-0.5 py-1 text-[11px] text-right pr-2">${result.billDueAmount.toFixed(2)}</td>
              <td className="px-0.5 py-1 text-[11px] pl-4">{result.billStatus}</td>
              <td className="px-0.5 py-1 text-center">
                {(result.billStatus === 'Unpaid' || result.billStatus === 'Partially Paid') && (
                  <button
                    onClick={() => onPayBill(result)}
                    className="inline-flex items-center px-2 py-1 text-[10px] bg-[#002B5B] text-white rounded hover:bg-[#003875] focus:outline-none focus:ring-1 focus:ring-[#002B5B] focus:ring-offset-1"
                    title={`Pay bill ${result.billNumber}`}
                    aria-label={`Pay bill ${result.billNumber}`}
                  >
                    <CreditCard className="w-3 h-3 mr-1" />
                    Pay Bill
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;