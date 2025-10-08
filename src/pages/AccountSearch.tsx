import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Search, FileText, AlertCircle } from 'lucide-react';

const AccountSearch: React.FC = () => {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!accountNumber.trim()) {
      setError('Please enter your account number');
      setLoading(false);
      return;
    }

    if (!pin.trim()) {
      setError('Please enter your PIN');
      setLoading(false);
      return;
    }

    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      setError('PIN must be exactly 4 digits');
      setLoading(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in real app this would call an API
      if (accountNumber === '4' && pin === '7557') {
        // Successful login for account 4 - redirect to return page
        navigate('/gross-receipt-bills/return');
      } else if (accountNumber === '22' && pin === '6669') {
        // Successful login for account 22 - redirect to trucking return page
        navigate('/gross-receipt-bills/return-trucking');
      } else if (accountNumber === '23' && pin === '4227') {
        // Successful login for account 23 - redirect to room occupancy return page
        navigate('/gross-receipt-bills/return-room-occupancy');
      } else if (accountNumber === '25' && pin === '6186') {
        // Successful login for account 25 - redirect to vehicle rental return page
        navigate('/gross-receipt-bills/return-vehicle-rental');
      } else if (accountNumber === '12345' && pin === '1234') {
        // Successful login - redirect to account dashboard or filing page
        alert('Login successful! Redirecting to your account...');
        navigate('/gross-receipt-bills'); // Or wherever successful login should go
      } else {
        setError('Invalid account number or PIN. Please check your credentials and try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(value);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <button 
        onClick={() => navigate('/gross-receipt-bills')}
        className="flex items-center text-[#002B5B] hover:text-[#003875] mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Gross Receipt Bills
      </button>

      {/* Navigation breadcrumb for screen readers */}
      <nav aria-label="Breadcrumb" className="sr-only">
        <ol>
          <li>Taxpayer Apps</li>
          <li>Gross Receipt Bills</li>
          <li aria-current="page">Account Search</li>
        </ol>
      </nav>

      {/* Main navigation buttons */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex justify-end items-center p-4 border-b">
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/gross-receipt-bills')}
              className="flex items-center px-4 py-2 text-[#002B5B] hover:text-[#003875] hover:bg-gray-50 rounded transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </button>
            <button
              onClick={() => navigate('/gross-receipt-bills/request-pin')}
              className="flex items-center px-4 py-2 text-[#002B5B] hover:text-[#003875] hover:bg-gray-50 rounded transition-colors"
            >
              <FileText className="w-4 h-4 mr-2" />
              Request PIN
            </button>
            <button
              onClick={() => navigate('/gross-receipt-bills/account-search')}
              className="flex items-center px-4 py-2 text-[#002B5B] hover:text-[#003875] hover:bg-gray-50 rounded transition-colors"
              aria-current="page"
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
              Account Search
            </h1>
          </header>

          <main>
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label 
                    htmlFor="account-number" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Account #
                  </label>
                  <input
                    id="account-number"
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-[#002B5B]"
                    placeholder="Enter your account number"
                    aria-describedby="account-help"
                    required
                  />
                  <p id="account-help" className="mt-1 text-sm text-gray-600">
                    Enter the account number from your gross receipt tax bill
                  </p>
                </div>

                <div>
                  <label 
                    htmlFor="pin" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    PIN
                  </label>
                  <input
                    id="pin"
                    type="password"
                    value={pin}
                    onChange={handlePinChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-[#002B5B]"
                    placeholder="Enter your 4-digit PIN"
                    aria-describedby="pin-help"
                    maxLength={4}
                    pattern="\d{4}"
                    required
                  />
                  <p id="pin-help" className="mt-1 text-sm text-gray-600">
                    Enter your 4-digit Personal Identification Number
                  </p>
                </div>

                {error && (
                  <div 
                    className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start"
                    role="alert"
                    aria-live="polite"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#4A90E2] text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-[#357ABD] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-describedby="search-button-help"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
                <p id="search-button-help" className="text-sm text-gray-600 text-center">
                  Click to search for your gross receipt tax account
                </p>
              </form>

              {/* Help section */}
              <section className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <h2 className="text-lg font-medium text-blue-900 mb-2">
                  Need Help?
                </h2>
                <div className="space-y-2 text-blue-800 text-sm">
                  <p>
                    <strong>Don't have a PIN?</strong> Use the "Request PIN" page to print and mail a PIN request form.
                  </p>
                  <p>
                    <strong>Forgot your account number?</strong> Check your most recent gross receipt tax bill or contact the county tax office.
                  </p>
                  <p>
                    <strong>Need assistance?</strong> Call (555) 444-5555 or email tax@abc.nc.gov during business hours.
                  </p>
                </div>
              </section>

              {/* Demo credentials */}
              <section className="mt-6 p-4 bg-gray-50 border rounded-lg">
                <h2 className="text-sm font-medium text-gray-900 mb-2">
                  Demo Credentials
                </h2>
                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Account Number:</strong> 4 (for return creation)</p>
                  <p><strong>PIN:</strong> 7557</p>
                  <p><strong>Alternative:</strong> Account 22, PIN 6669 (trucking business)</p>
                  <p><strong>Alternative:</strong> Account 23, PIN 4227 (room occupancy)</p>
                  <p><strong>Alternative:</strong> Account 25, PIN 6186 (vehicle rental)</p>
                  <p><strong>Alternative:</strong> Account 12345, PIN 1234 (general access)</p>
                  <p className="text-xs text-gray-600 mt-2">
                    Use these credentials to test the account search functionality
                  </p>
                </div>
              </section>

              {/* Accessibility notice */}
              <section className="mt-6 p-4 bg-gray-50 border rounded-lg">
                <h2 className="text-sm font-medium text-gray-900 mb-2">
                  Accessibility
                </h2>
                <p className="text-sm text-gray-700">
                  This form is designed to be accessible to all users. If you need assistance or require an alternative format, 
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

export default AccountSearch;