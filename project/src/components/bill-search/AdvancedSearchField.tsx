import React from 'react';
import { X } from 'lucide-react';
import { SearchResult } from '../../types/bill-search';

interface AdvancedSearchFieldProps {
  field: string;
  label: string;
  placeholder: string;
  value: string;
  suggestions: SearchResult[];
  isActive: boolean;
  onChange: (value: string) => void;
  onSuggestionClick: (suggestion: SearchResult) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const AdvancedSearchField: React.FC<AdvancedSearchFieldProps> = ({
  field,
  label,
  placeholder,
  value,
  suggestions,
  isActive,
  onChange,
  onSuggestionClick,
  onFocus,
  onBlur
}) => {
  const renderSuggestionValue = (suggestion: SearchResult) => {
    switch (field) {
      case 'ownerName':
        return suggestion.ownerName;
      case 'parcelId':
        return suggestion.parcelId;
      case 'propertyAddress':
        return `${suggestion.propertyAddress.street}, ${suggestion.propertyAddress.cityStateZip}`;
      case 'specialAssessment':
        return suggestion.billNumber;
      default:
        return '';
    }
  };

  return (
    <div className="relative">
      <label className="block text-[11px] font-medium text-gray-700 mb-0.5">{label}</label>
      <input
        type="text"
        className="w-full px-2 pr-8 py-1 border rounded text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2 top-6 p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="w-3 h-3 text-gray-400" />
        </button>
      )}
      {isActive && suggestions?.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              className="w-full px-3 py-1.5 text-left hover:bg-gray-50 text-sm"
              onClick={() => onSuggestionClick(suggestion)}
            >
              {field === 'propertyAddress' ? (
                <div className="text-xs">
                  <div>{suggestion.propertyAddress.street}</div>
                  <div className="text-gray-600">{suggestion.propertyAddress.cityStateZip}</div>
                </div>
              ) : (
                renderSuggestionValue(suggestion)
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchField;