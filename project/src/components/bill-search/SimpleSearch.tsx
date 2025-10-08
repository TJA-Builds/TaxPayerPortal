import React from 'react';
import { Search, X } from 'lucide-react';
import { SearchResult } from '../../types/bill-search';

interface SimpleSearchProps {
  searchQuery: string;
  suggestions: SearchResult[];
  showSuggestions: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSuggestionClick: (suggestion: SearchResult, type: 'term' | 'name' | 'address') => void;
  onBlur: () => void;
  onFocus: () => void;
}

const SimpleSearch: React.FC<SimpleSearchProps> = ({
  searchQuery,
  suggestions,
  showSuggestions,
  onSearchChange,
  onSuggestionClick,
  onBlur,
  onFocus
}) => {
  // Group suggestions by type
  const groupedSuggestions = React.useMemo(() => {
    const searchTerm = searchQuery.toLowerCase();
    if (!searchTerm) return null;

    const names = new Set<string>();
    const addresses = new Set<string>();

    suggestions.forEach(suggestion => {
      if (suggestion.ownerName.toLowerCase().includes(searchTerm)) {
        names.add(suggestion.ownerName);
      }
      if (suggestion.propertyAddress.street.toLowerCase().includes(searchTerm)) {
        addresses.add(suggestion.propertyAddress.street);
      }
      if (suggestion.propertyAddress.cityStateZip.toLowerCase().includes(searchTerm)) {
        addresses.add(suggestion.propertyAddress.cityStateZip);
      }
    });

    return {
      term: searchTerm,
      names: Array.from(names),
      addresses: Array.from(addresses)
    };
  }, [searchQuery, suggestions]);

  return (
    <div className="relative z-10">
      <div className="flex items-center border rounded-lg overflow-hidden relative">
        <Search className="w-4 h-4 text-gray-400 ml-3" />
        <input
          type="text"
          placeholder="Search by owner name, bill number, invoice number, parcel ID, or property address..."
          className="w-full px-3 pr-8 py-1.5 focus:outline-none text-sm"
          value={searchQuery}
          onChange={onSearchChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
            className="absolute right-2 p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
      {showSuggestions && groupedSuggestions && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {/* Search term */}
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 border-b"
            onClick={() => onSuggestionClick(suggestions[0], 'term')}
          >
            <span className="text-sm">{groupedSuggestions.term}</span>
          </button>

          {/* Names */}
          {groupedSuggestions.names.length > 0 && (
            <div className="border-b">
              <div className="px-4 py-1 bg-gray-50 text-xs font-medium text-gray-500">Name</div>
              {groupedSuggestions.names.map((name, index) => (
                <button
                  key={`name-${index}`}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  onClick={() => onSuggestionClick(
                    suggestions.find(s => s.ownerName === name) || suggestions[0],
                    'name'
                  )}
                >
                  <span className="text-sm">{name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Addresses */}
          {groupedSuggestions.addresses.length > 0 && (
            <div>
              <div className="px-4 py-1 bg-gray-50 text-xs font-medium text-gray-500">Address</div>
              {groupedSuggestions.addresses.map((address, index) => (
                <button
                  key={`address-${index}`}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  onClick={() => onSuggestionClick(
                    suggestions.find(s => 
                      s.propertyAddress.street === address || 
                      s.propertyAddress.cityStateZip === address
                    ) || suggestions[0],
                    'address'
                  )}
                >
                  <span className="text-sm">{address}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleSearch;