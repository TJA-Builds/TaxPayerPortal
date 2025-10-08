import React from 'react';

interface SearchModeToggleProps {
  searchMode: 'simple' | 'advanced';
  onModeChange: (mode: 'simple' | 'advanced') => void;
}

const SearchModeToggle: React.FC<SearchModeToggleProps> = ({ searchMode, onModeChange }) => {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => onModeChange('simple')}
        className={`px-3 py-1.5 rounded text-sm ${
          searchMode === 'simple' 
            ? 'bg-[#002B5B] text-white' 
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        Simple Search
      </button>
      <button
        onClick={() => onModeChange('advanced')}
        className={`px-3 py-1.5 rounded text-sm ${
          searchMode === 'advanced' 
            ? 'bg-[#002B5B] text-white' 
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        Advanced Search
      </button>
    </div>
  );
};

export default SearchModeToggle;