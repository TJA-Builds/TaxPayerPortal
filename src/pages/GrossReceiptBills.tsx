import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Search, FileText } from 'lucide-react';

const GrossReceiptBills: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <button 
        onClick={() => navigate('/taxpayer-apps')}
        className="flex items-center text-[#002B5B] hover:text-[#003875] mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Taxpayer Apps
      </button>

      {/* Navigation breadcrumb for screen readers */}
      <nav aria-label="Breadcrumb" className="sr-only">
        <ol>
          <li>Taxpayer Apps</li>
          <li aria-current="page">Gross Receipt Bills</li>
        </ol>
      </nav>

      {/* Main navigation buttons */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex justify-end items-center p-4 border-b">
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/gross-receipt-bills')}
              className="flex items-center px-4 py-2 text-[#002B5B] hover:text-[#003875] hover:bg-gray-50 rounded transition-colors"
              aria-current="page"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </button>
            <button
              onClick={() => navigate('/gross-receipt-bills/request-pin')}
              className="flex items-center px-4 py-2 text-[#002B5B] hover:text-[#003875] hover:bg-gray-50 rounded transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 mr-2" />
              Request PIN
            </button>
            <button
              onClick={() => navigate('/gross-receipt-bills/account-search')}
              className="flex items-center px-4 py-2 text-[#002B5B] hover:text-[#003875] hover:bg-gray-50 rounded transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 mr-2" />
              Account Search
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="p-6">
          <header>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Welcome to the Gross Receipt Taxpayer Portal.
            </h1>
          </header>

          <main>
            <div className="space-y-6 max-w-4xl">
              <section>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To file a return, search for your account from the "Account Search" page using your account number and PIN.
                </p>
              </section>

              <section>
                <p className="text-gray-700 text-lg leading-relaxed">
                  If you do not yet have a PIN, you can request one by printing the PIN request form from the "Request PIN" page, filling it out, and mailing it to the county tax office.
                </p>
              </section>

              {/* Additional helpful information */}
              <section className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <h2 className="text-lg font-medium text-blue-900 mb-2">
                  Getting Started
                </h2>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>New users should start by requesting a PIN using the "Request PIN" page</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Existing users can proceed directly to "Account Search" with their account number and PIN</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>For assistance, contact the county tax office during business hours</span>
                  </li>
                </ul>
              </section>

              {/* Accessibility notice */}
              <section className="mt-8 p-4 bg-gray-50 border rounded-lg">
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Accessibility
                </h2>
                <p className="text-gray-700">
                  This portal is designed to be accessible to all users. If you encounter any accessibility issues or need assistance, 
                  please contact our support team. We are committed to providing equal access to all taxpayers.
                </p>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default GrossReceiptBills;