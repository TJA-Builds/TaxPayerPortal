import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, Search, FileText } from 'lucide-react';

const GrossReceiptReturnVehicleRental: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingData = location.state?.returnData || {};
  
  const [formData, setFormData] = useState({
    filedBy: existingData.filedBy || '',
    forTheMonthOf: existingData.forTheMonthOf || '',
    returnYear: existingData.returnYear || '',
    billDueDate: '',
    excessTax: existingData.excessTax || '',
    creditRefunded: existingData.creditRefunded || '',
    creditToBeApplied: existingData.creditToBeApplied || '',
    grossReceiptsVehicleRental: existingData.grossReceiptsVehicleRental || ''
  });

  // Calculate bill due date when month or year changes
  React.useEffect(() => {
    if (formData.forTheMonthOf && formData.returnYear) {
      const monthIndex = months.indexOf(formData.forTheMonthOf);
      const year = parseInt(formData.returnYear);
      
      // Calculate next month (15th of the month after selected month)
      let nextMonth = monthIndex;
      let nextYear = year;
      
      if (monthIndex === 11) { // December selected, next month is January of next year
        nextMonth = 0; // January (0-indexed)
        nextYear = year + 1;
      } else {
        nextMonth = monthIndex + 1;
      }
      
      // Format as MM/DD/YYYY
      const dueDate = `${String(nextMonth + 1).padStart(2, '0')}/15/${nextYear}`;
      setFormData(prev => ({ ...prev, billDueDate: dueDate }));
    } else {
      setFormData(prev => ({ ...prev, billDueDate: '' }));
    }
  }, [formData.forTheMonthOf, formData.returnYear]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoToFinalReview = () => {
    // Navigate to final review with form data
    navigate('/gross-receipt-bills/final-review', {
      state: {
        returnData: {
          ...formData,
          account: '25',
          returnType: 'GR Vehicle Rental',
          ownerName: 'JESSES TRUCKING',
          ownerAddress: '123 TEST ST PITTSBORO NC 27312',
          monthEnding: formData.forTheMonthOf && formData.returnYear ? 
            `${formData.forTheMonthOf} ${formData.returnYear}` : '',
          locations: [
            {
              name: '1',
              address: 'TEST ST',
              receipts: formData.grossReceiptsVehicleRental || '0.00'
            }
          ]
        }
      }
    });
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <button 
        onClick={() => navigate('/gross-receipt-bills/account-search')}
        className="flex items-center text-[#002B5B] hover:text-[#003875] mb-6 focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:ring-offset-2"
        aria-label="Go back to account search"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Account Search
      </button>

      {/* Navigation breadcrumb for screen readers */}
      <nav aria-label="Breadcrumb" className="sr-only">
        <ol>
          <li>Taxpayer Apps</li>
          <li>Gross Receipt Bills</li>
          <li>Account Search</li>
          <li aria-current="page">Create New Return</li>
        </ol>
      </nav>

      {/* Main navigation buttons */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex justify-end items-center p-4 border-b">
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/gross-receipt-bills')}
              className="flex items-center px-4 py-2 text-[#002B5B] hover:text-[#003875] hover:bg-gray-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:ring-offset-2"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </button>
            <button
              onClick={() => navigate('/gross-receipt-bills/request-pin')}
              className="flex items-center px-4 py-2 text-[#002B5B] hover:text-[#003875] hover:bg-gray-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:ring-offset-2"
            >
              <FileText className="w-4 h-4 mr-2" />
              Request PIN
            </button>
            <button
              onClick={() => navigate('/gross-receipt-bills/account-search')}
              className="flex items-center px-4 py-2 text-[#002B5B] hover:text-[#003875] hover:bg-gray-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:ring-offset-2"
            >
              <Search className="w-4 h-4 mr-2" />
              Account Search
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="p-6">
          <header>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6" id="main-heading">
              Create New Return
            </h1>
          </header>

          <main>
            <form onSubmit={(e) => { e.preventDefault(); handleGoToFinalReview(); }}>
              {/* Account Information Section */}
              <section className="mb-8" aria-labelledby="account-info-heading">
                <h2 id="account-info-heading" className="text-lg font-semibold text-gray-800 mb-4 bg-gray-200 p-3 rounded">
                  Account Information
                </h2>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Account Number:</span>
                    <span className="ml-2">25</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Owner Name:</span>
                    <span className="ml-2">JESSES TRUCKING</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Owner Address:</span>
                    <span className="ml-2">123 TEST ST PITTSBORO NC 27312</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Account Type:</span>
                    <span className="ml-2">GR Vehicle Rental</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Credit Remaining:</span>
                    <span className="ml-2">$0.00</span>
                  </div>
                </div>
              </section>

              {/* Return Information Section */}
              <section className="mb-8" aria-labelledby="return-info-heading">
                <h2 id="return-info-heading" className="text-lg font-semibold text-gray-800 mb-4 bg-gray-200 p-3 rounded">
                  Return Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="filed-by" className="block text-sm font-medium text-gray-700 mb-2 bg-gray-100 p-2 rounded">
                      Filed By
                    </label>
                    <input
                      id="filed-by"
                      type="text"
                      value={formData.filedBy}
                      onChange={(e) => handleInputChange('filedBy', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-[#002B5B]"
                      aria-describedby="filed-by-help"
                    />
                    <p id="filed-by-help" className="sr-only">Enter the name of the person filing this return</p>
                  </div>

                  <div></div>

                  <div>
                    <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 mb-2 bg-gray-100 p-2 rounded">
                      For the month of
                    </label>
                    <select
                      id="month-select"
                      value={formData.forTheMonthOf}
                      onChange={(e) => handleInputChange('forTheMonthOf', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-[#002B5B]"
                      aria-describedby="month-help"
                    >
                      <option value="">Select Month</option>
                      {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <p id="month-help" className="sr-only">Select the month for which you are filing this return</p>
                  </div>

                  <div>
                    <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 mb-2 bg-gray-100 p-2 rounded">
                      Return Year
                    </label>
                    <select
                      id="year-select"
                      value={formData.returnYear}
                      onChange={(e) => handleInputChange('returnYear', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-[#002B5B]"
                      aria-describedby="year-help"
                    >
                      <option value="">Select Year</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <p id="year-help" className="sr-only">Select the year for which you are filing this return</p>
                  </div>

                  <div>
                    <label htmlFor="bill-due-date" className="block text-sm font-medium text-gray-700 mb-2 bg-gray-100 p-2 rounded">
                      Bill Due Date
                    </label>
                    <input
                      id="bill-due-date"
                      type="text"
                      value={formData.billDueDate}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
                      aria-describedby="due-date-help"
                    />
                    <p id="due-date-help" className="text-xs text-gray-600 mt-1">
                      Automatically calculated as the 15th of the month after the selected return month
                    </p>
                  </div>

                  <div>
                    <label htmlFor="excess-tax" className="block text-sm font-medium text-gray-700 mb-2 bg-gray-100 p-2 rounded">
                      Excess Tax $
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        id="excess-tax"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.excessTax}
                        onChange={(e) => handleInputChange('excessTax', e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-[#002B5B] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        aria-describedby="excess-tax-help"
                      />
                    </div>
                    <p id="excess-tax-help" className="text-xs text-gray-600 mt-1">Enter amount in dollars and cents</p>
                  </div>

                  <div>
                    <label htmlFor="credit-refunded" className="block text-sm font-medium text-gray-700 mb-2 bg-gray-100 p-2 rounded">
                      Credit Refunded $
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        id="credit-refunded"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.creditRefunded}
                        onChange={(e) => handleInputChange('creditRefunded', e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-[#002B5B] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        aria-describedby="credit-refunded-help"
                      />
                    </div>
                    <p id="credit-refunded-help" className="text-xs text-gray-600 mt-1">Enter amount in dollars and cents</p>
                  </div>

                  <div>
                    <label htmlFor="credit-applied" className="block text-sm font-medium text-gray-700 mb-2 bg-gray-100 p-2 rounded">
                      Credit To Be Applied $
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        id="credit-applied"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.creditToBeApplied}
                        onChange={(e) => handleInputChange('creditToBeApplied', e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-[#002B5B] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        aria-describedby="credit-applied-help"
                      />
                    </div>
                    <p id="credit-applied-help" className="text-xs text-gray-600 mt-1">Enter amount in dollars and cents</p>
                  </div>
                </div>
              </section>

              {/* Locations Section */}
              <section className="mb-8" aria-labelledby="locations-heading">
                <h2 id="locations-heading" className="text-lg font-semibold text-gray-800 mb-4 bg-gray-200 p-3 rounded">
                  Locations
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300" role="table" aria-label="Location information">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                          Location Name
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                          Address
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                          Jurisdiction
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 text-sm">1</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">TEST ST</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">FORSYTH</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Receipt Information Section */}
              <section className="mb-8" aria-labelledby="receipt-info-heading">
                <h2 id="receipt-info-heading" className="text-lg font-semibold text-gray-800 mb-4 bg-gray-200 p-3 rounded">
                  Receipt Information
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="gross-receipts-vehicle-rental" className="block text-sm font-medium text-gray-700 mb-2 bg-gray-100 p-2 rounded">
                      Gross Receipts for Short Term Rental of Vehicles $
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        id="gross-receipts-vehicle-rental"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.grossReceiptsVehicleRental}
                        onChange={(e) => handleInputChange('grossReceiptsVehicleRental', e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-[#002B5B] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        aria-describedby="vehicle-rental-help"
                      />
                    </div>
                    <p id="vehicle-rental-help" className="text-xs text-gray-600 mt-1">Enter amount in dollars and cents</p>
                  </div>
                </div>
              </section>

              {/* Submit Button */}
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#4A90E2] text-white font-medium rounded-lg hover:bg-[#357ABD] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:ring-offset-2 transition-colors"
                  aria-describedby="submit-help"
                >
                  Go To Final Review
                </button>
                <p id="submit-help" className="sr-only">Click to proceed to the final review of your return</p>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default GrossReceiptReturnVehicleRental;