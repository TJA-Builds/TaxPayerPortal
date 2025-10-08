import React from 'react';
import { X } from 'lucide-react';
import { SearchResult } from '../../types/bill-search';
import AdvancedSearchField from './AdvancedSearchField';

interface AdvancedSearchProps {
  advancedSearch: {
    ownerName: string;
    parcelId: string;
    propertyAddress: string;
    specialAssessment: string;
    billAmount: string;
    lastPayment: string;
    billFlags: string;
  };
  advancedSuggestions: {
    [key: string]: SearchResult[];
  };
  activeAdvancedField: string | null;
  onFieldChange: (field: string, value: string) => void;
  onSuggestionClick: (field: string, suggestion: SearchResult) => void;
  onFieldFocus: (field: string) => void;
  onFieldBlur: () => void;
  onClearAll: () => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  advancedSearch,
  advancedSuggestions,
  activeAdvancedField,
  onFieldChange,
  onSuggestionClick,
  onFieldFocus,
  onFieldBlur,
  onClearAll
}) => {
  const fields = [
    { key: 'ownerName', label: 'Owner Name', placeholder: 'Enter owner name...' },
    { key: 'parcelId', label: 'Parcel ID', placeholder: 'Enter parcel ID...' },
    { key: 'propertyAddress', label: 'Property Address', placeholder: 'Enter property address...' },
    { key: 'invoiceNumber', label: 'Invoice Number', placeholder: 'Enter invoice number...' },
    { key: 'specialAssessment', label: 'Special Assessment Project #', placeholder: 'Enter special assessment project number...' }
  ];

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          onClick={onClearAll}
          className="flex items-center text-sm text-gray-600 hover:text-gray-800"
        >
          <X className="w-4 h-4 mr-1" />
          Clear All Fields
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {fields.map(field => (
          <AdvancedSearchField
            key={field.key}
            field={field.key}
            label={field.label}
            placeholder={field.placeholder}
            value={advancedSearch[field.key as keyof typeof advancedSearch]}
            suggestions={advancedSuggestions[field.key]}
            isActive={activeAdvancedField === field.key}
            onChange={(value) => onFieldChange(field.key, value)}
            onSuggestionClick={(suggestion) => onSuggestionClick(field.key, suggestion)}
            onFocus={() => onFieldFocus(field.key)}
            onBlur={onFieldBlur}
          />
        ))}
      </div>
    </div>
  );
};

export default AdvancedSearch;