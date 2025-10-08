import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Home, Receipt, FileText, MoreHorizontal, Construction } from 'lucide-react';

const handleBillSearchClick = (navigate: (path: string) => void) => {
  localStorage.removeItem('heldBills');
  navigate('/taxpayer-apps/bill-search');
};

const TaxpayerApps: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-[calc(100vh-8rem)]" role="main">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-[#002B5B] hover:text-[#003875] mb-6 focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:ring-offset-2"
        aria-label="Go back to home page"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </button>
      
      <h1 className="text-3xl font-semibold text-gray-800 mb-8" id="main-heading">Taxpayer Applications</h1>
      
      <section className="bg-white rounded-lg shadow-md p-4 md:p-6" aria-labelledby="main-heading">
        <p className="text-gray-600 mb-6">Welcome to the Taxpayer Applications Portal</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" role="list">
          <article 
            onClick={() => handleBillSearchClick(navigate)}
            className="p-4 md:p-6 border-2 border-blue-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-blue-50 relative focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:ring-offset-2"
            role="listitem"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleBillSearchClick(navigate);
              }
            }}
            aria-label="Bill Search - Search and view your tax bills quickly and easily"
          >
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium" aria-label="Status: In Development">
              In Development
            </div>
            <div className="flex items-center mb-4">
              <Search className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg md:text-xl font-medium text-gray-800">Bill Search</h3>
            </div>
            <p className="text-sm md:text-base text-gray-600">Search and view your tax bills quickly and easily</p>
          </article>

          <article className="p-4 md:p-6 border border-gray-200 rounded-lg bg-gray-50 relative opacity-75" role="listitem" aria-label="Real Property Search - Coming Soon">
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs font-medium flex items-center gap-1" aria-label="Status: Coming Soon">
              <Construction className="w-3 h-3" />
              Coming Soon
            </div>
            <div className="flex items-center mb-4">
              <Home className="w-6 h-6 text-[#002B5B] mr-3" />
              <h3 className="text-lg md:text-xl font-medium text-gray-800">Real Property Search</h3>
            </div>
            <p className="text-sm md:text-base text-gray-600">Access detailed information about real property records</p>
          </article>

          <article 
            onClick={() => navigate('/gross-receipt-bills')}
            className="p-4 md:p-6 border-2 border-blue-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-blue-50 relative focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:ring-offset-2"
            role="listitem"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate('/gross-receipt-bills');
              }
            }}
            aria-label="Gross Receipt Bills - View and manage gross receipt tax bills"
          >
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium" aria-label="Status: In Development">
              In Development
            </div>
            <div className="flex items-center mb-4">
              <Receipt className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg md:text-xl font-medium text-gray-800">Gross Receipt Bills</h3>
            </div>
            <p className="text-sm md:text-base text-gray-600">View and manage gross receipt tax bills</p>
          </article>

          <article className="p-4 md:p-6 border border-gray-200 rounded-lg bg-gray-50 relative opacity-75" role="listitem" aria-label="Online Appeals - In Development">
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs font-medium flex items-center gap-1" aria-label="Status: In Development">
              <Construction className="w-3 h-3" />
              In Development
            </div>
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg md:text-xl font-medium text-gray-800">Online Appeals</h3>
            </div>
            <p className="text-sm md:text-base text-gray-600">Submit and track your tax assessment appeals</p>
          </article>

          <article className="p-4 md:p-6 border border-gray-200 rounded-lg bg-gray-50 relative opacity-75" role="listitem" aria-label="Online Listing - Coming Soon">
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs font-medium flex items-center gap-1" aria-label="Status: Coming Soon">
              <Construction className="w-3 h-3" />
              Coming Soon
            </div>
            <div className="flex items-center mb-4">
              <Home className="w-6 h-6 text-[#002B5B] mr-3" />
              <h3 className="text-lg md:text-xl font-medium text-gray-800">Online Listing</h3>
            </div>
            <p className="text-sm md:text-base text-gray-600">Submit and manage your property listings online</p>
          </article>

          <article className="p-4 md:p-6 border border-gray-200 rounded-lg bg-gray-50 relative opacity-75" role="listitem" aria-label="Other Services - Coming Soon">
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs font-medium flex items-center gap-1" aria-label="Status: Coming Soon">
              <Construction className="w-3 h-3" />
              Coming Soon
            </div>
            <div className="flex items-center mb-4">
              <MoreHorizontal className="w-6 h-6 text-[#002B5B] mr-3" />
              <h3 className="text-lg md:text-xl font-medium text-gray-800">Other</h3>
            </div>
            <p className="text-sm md:text-base text-gray-600">Access additional taxpayer services and resources</p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default TaxpayerApps