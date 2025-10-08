import React from 'react';
import { AlertCircle, Clock, XCircle, Download } from 'lucide-react';

interface ResultsHeaderProps {
  heldBills: Set<string>;
  selectedRows: Set<string>;
  errorMessage: string | null;
  onHoldForPayment: () => void;
  onMakePayment: () => void;
  onExportCSV: () => void;
  onClearAllHolds: () => void;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  heldBills,
  selectedRows,
  errorMessage,
  onHoldForPayment,
  onMakePayment,
  onExportCSV,
  onClearAllHolds
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Search Results</h2>
          {heldBills.size > 0 && (
            <div className="mt-1 text-sm flex items-center gap-3">
              <span className="text-blue-600 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {heldBills.size} {heldBills.size === 1 ? 'bill' : 'bills'} on hold for payment
              </span>
              <button
                onClick={onClearAllHolds}
                className="text-red-600 hover:text-red-800 flex items-center"
                title="Clear all held bills"
              >
                <XCircle className="w-4 h-4 mr-1" />
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3" style={{ display: 'none' }}>
        {errorMessage && (
          <div className="flex items-center text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errorMessage}
          </div>
        )}
        <button
          onClick={onHoldForPayment}
          disabled={selectedRows.size === 0}
          className={`flex items-center px-3 py-1.5 rounded text-sm ${
            selectedRows.size > 0
              ? 'bg-[#002B5B] text-white hover:bg-[#003875]'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          title="Add selected bills to cart"
        > 
          Add to Cart ({selectedRows.size})
        </button>
        <button
          onClick={onMakePayment}
          disabled={heldBills.size === 0}
          className={`flex items-center px-3 py-1.5 rounded text-sm ${
            heldBills.size > 0
              ? 'bg-[#002B5B] text-white hover:bg-[#003875]'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          title="Proceed to payment for held bills"
        >
          Make Payment ({heldBills.size})
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onExportCSV}
          className="flex items-center px-3 py-1.5 bg-[#002B5B] text-white rounded text-sm hover:bg-[#003875]"
          title={selectedRows.size > 0 ? `Export ${selectedRows.size} selected bills` : 'Export all bills'}
        >
          <Download className="w-4 h-4 mr-1" />
          {selectedRows.size > 0 ? `Export Selected (${selectedRows.size})` : 'Export All'}
        </button>
      </div>
    </div>
  );
};

export default ResultsHeader;