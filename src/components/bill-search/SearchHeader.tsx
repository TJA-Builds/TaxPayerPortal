import React from 'react';
import { Printer, FileSpreadsheet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchHeaderProps {
  onPrint: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ onPrint }) => {
  const navigate = useNavigate();
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 
        className="text-2xl font-semibold text-gray-800" 
        data-date={date}
        data-time={time}
      >
        Bill Search
      </h1>
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/taxpayer-apps/reports')}
          className="flex items-center px-3 py-1.5 bg-[#002B5B] text-white rounded text-sm hover:bg-[#003875]"
          title="Access Reports"
        >
          <FileSpreadsheet className="w-4 h-4 mr-1" />
          Reports
        </button>
      </div>
    </div>
  );
};

export default SearchHeader;