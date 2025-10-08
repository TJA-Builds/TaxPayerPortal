import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, Search, FileText } from 'lucide-react';

const GrossReceiptReturnTrucking: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingData = location.state?.returnData || {};
  
  const [formData, setFormData] = useState({
    filedBy: existingData.filedBy || '',
    quarterEnding: existingData.quarterEnding || '',
    returnYear: existingData.returnYear || '',
    billDueDate: '',
    excessTax: existingData.excessTax || '',
    creditRefunded: existingData.creditRefunded || '',
    creditToBeApplied: existingData.creditToBeApplied || '',
    location1Receipts: existingData.location1Receipts || '',
    location2Receipts: existingData.location2Receipts || '',
    location3Receipts: existingData.location3Receipts || ''
  });

  // Calculate bill due date when quarter or year changes
  React.useEffect(() => {
    if (formData.quarterEnding && formData.returnYear) {
      const year = parseInt(formData.returnYear);
      let dueDate = '';
      
      // Calculate due date based on quarter ending (15th of month after quarter ends)
      switch (formData.quarterEnding) {
        case 'March':
          dueDate = `04/15/${year}`; // April 15th
          break;
        case 'June':
          dueDate = `07/15/${year}`; // July 15th
          break;
        case 'September':
          dueDate = `10/15/${year}`; // October 15th
          break;
        case 'December':
          dueDate = `01/15/${year + 1}`; // January 15th of next year
          break;
        default:
          dueDate = '';
      }
      
      setFormData(prev => ({ ...prev, billDueDate: dueDate }));
    } else {
      setFormData(prev => ({ ...prev, billDueDate: '' }));
    }
  }, [formData.quarterEnding, formData.returnYear]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoToFinalReview = () => {
    // Navigate to final review with form data
    navigate('/gross-receipt-bills/final-review', {
      state: {
        returnData: {
          ...formData,
          account: '22',
          returnType: 'GR Heavy Equipments',
          ownerName: 'JESSES TRUCKING',
          ownerAddress: '123 TEST ST PITTSBORO NC 27312',
          monthEnding: formData.quarterEnding && formData.returnYear ? 
            `Quarter ending ${formData.quarterEnding} ${formData.returnYear}` : '',
          locations: [
            {
              name: '1',
              address: '12 EAST LANE',
              receipts: formData.location1Receipts || '0.00',
              nonPreparedReceipts: '0.00'
            },
            {
              name: '2', 
              address: '34 TRUCKING WAY',
              receipts: formData.location2Receipts || '0.00',
              nonPreparedReceipts: '0.00'
            },
            {
              name: '3',
              address: '36 BUSY LANE', 
              receipts: formData.location3Receipts || '0.00',
              nonPreparedReceipts: '0.00'
            }
          ]
        }
      }
    });
  };

  const quarters = ['March', 'June', 'September', 'December'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <button 
        onClick={() => navigate('/gross-receipt-bills/account-search')}
        className="flex items-center text-[#002B5B] hover:text-[#003875] mb-6"
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
              Create New Return
            </h1>
          </header>

          <main>
            <form onSubmit={(e) => { e.preventDefault(); handleGoToFinalReview(); }}>
              {/* Account Information Section */}
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 bg-gray-200 p-3 rounded">
                  Account Information
                </h2>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Account Number:</span>
                    <span className="ml-2">22</span>
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
                    <span className="ml-2">GR Heavy Equipments</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Credit Remaining:</span>
                    <span className="ml-2">$0.00</span>
                  </div>
                </div>
              </section>

              {/* Return Information Section */}
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 bg-gray-200 p-3 rounded">
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
                    <label htmlFor="quarter-select" className="block text-sm font-medium text-gray-700 mb-2 bg-gray-100 p-2 rounded">
                      For the quarter ending
                    </label>
                    <select
                      id="quarter-select"
                      value={formData.quarterEnding}
                      onChange={(e) => handleInputChange('quarterEnding', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-[#002B5B]"
                      aria-describedby="quarter-help"
                    >
                      <option value="">Select Quarter Ending</option>
                      {quarters.map(quarter => (
                        <option key={quarter} value={quarter}>{quarter}</option>
                      ))}
                    </select>
                    <p id="quarter-help" className="sr-only">Select the quarter ending month for which you are filing this return</p>
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
                      Automatically calculated as the 15th of the month after the selected quarter ending
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
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 bg-gray-200 p-3 rounded">
                  Locations
                </h2>
                
                {/* Location 1 */}
                <div className="mb-6 border border-gray-300 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 p-3 border-b">
                    <div className="grid grid-cols-3 gap-4 text-sm font-medium">
                      <span>Location Name</span>
                      <span>Address</span>
                      <span>Jurisdiction</span>
                    </div>
                  </div>
                  <div className="p-3 border-b">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <span>1</span>
                      <span>12 EAST LANE</span>
                      <span>UNION CROSS</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <label htmlFor="location1-receipts" className="block text-sm font-medium text-gray-700 mb-2">
                      Gross Receipts for Short-Term Heavy Equipment Rental (Excluding Sales Tax) $
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        id="location1-receipts"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.location1Receipts}
                        onChange={(e) => handleInputChange('location1Receipts', e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-[#002B5B] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Enter amount in dollars and cents</p>
                  </div>
                </div>

                {/* Location 2 */}
                <div className="mb-6 border border-gray-300 rounded-lg overflow-hidden">
                  <div className="p-3 border-b">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <span>2</span>
                      <span>34 TRUCKING WAY</span>
                      <span>FORSYTH</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <label htmlFor="location2-receipts" className="block text-sm font-medium text-gray-700 mb-2">
                      Gross Receipts for Short-Term Heavy Equipment Rental (Excluding Sales Tax) $
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        id="location2-receipts"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.location2Receipts}
                        onChange={(e) => handleInputChange('location2Receipts', e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-[#002B5B] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Enter amount in dollars and cents</p>
                  </div>
                </div>

                {/* Location 3 */}
                <div className="mb-6 border border-gray-300 rounded-lg overflow-hidden">
                  <div className="p-3 border-b">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <span>3</span>
                      <span>36 BUSY LANE</span>
                      <span>BELEWS CREEK</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <label htmlFor="location3-receipts" className="block text-sm font-medium text-gray-700 mb-2">
                      Gross Receipts for Short-Term Heavy Equipment Rental (Excluding Sales Tax) $
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        id="location3-receipts"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.location3Receipts}
                        onChange={(e) => handleInputChange('location3Receipts', e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-[#002B5B] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Enter amount in dollars and cents</p>
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

export default GrossReceiptReturnTrucking;