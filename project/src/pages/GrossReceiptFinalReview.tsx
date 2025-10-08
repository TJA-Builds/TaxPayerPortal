import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, FileText } from 'lucide-react';

const GrossReceiptFinalReview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const returnData = location.state?.returnData || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calculate totals based on locations data
  const calculateTotals = () => {
    if (returnData.returnType === 'GR Food and Beverage' && returnData.locations) {
      const totalSalesValue = returnData.locations.reduce((sum: number, location: any) => {
        const receipts = parseFloat(location.receipts?.replace(/,/g, '') || '0');
        const nonPrepared = parseFloat(location.nonPreparedReceipts?.replace(/,/g, '') || '0');
        return sum + (receipts - nonPrepared);
      }, 0);
      
      const baseTax = totalSalesValue * 0.015;
      const excessTax = parseFloat(returnData.excessTax || '0');
      const taxTotal = baseTax + excessTax;
      
      return {
        totalSalesValue: totalSalesValue.toFixed(2),
        taxTotal: taxTotal.toFixed(2)
      };
    }
    
    if (returnData.returnType === 'GR Heavy Equipments' && returnData.locations) {
      const totalSalesValue = returnData.locations.reduce((sum: number, location: any) => {
        const receipts = parseFloat(location.receipts?.replace(/,/g, '') || '0');
        return sum + receipts;
      }, 0);
      
      const baseTax = totalSalesValue * 0.015;
      const excessTax = parseFloat(returnData.excessTax || '0');
      const taxTotal = baseTax + excessTax;
      
      return {
        totalSalesValue: totalSalesValue.toFixed(2),
        taxTotal: taxTotal.toFixed(2)
      };
    }
    
    if (returnData.returnType === 'GR Room Occupancy' && returnData.locations) {
      const totalSalesValue = returnData.locations.reduce((sum: number, location: any) => {
        const receipts = parseFloat(location.receipts?.replace(/,/g, '') || '0');
        const extendedStays = parseFloat(location.extendedStays?.replace(/,/g, '') || '0');
        const governmentExemptions = parseFloat(location.governmentExemptions?.replace(/,/g, '') || '0');
        const nonOccupancy = parseFloat(location.nonOccupancy?.replace(/,/g, '') || '0');
        return sum + (receipts - extendedStays - governmentExemptions - nonOccupancy);
      }, 0);
      
      const baseTax = totalSalesValue * 0.015;
      const excessTax = parseFloat(returnData.excessTax || '0');
      const taxTotal = baseTax + excessTax;
      
      return {
        totalSalesValue: totalSalesValue.toFixed(2),
        taxTotal: taxTotal.toFixed(2)
      };
    }
    
    if (returnData.returnType === 'GR Vehicle Rental' && returnData.locations) {
      const totalSalesValue = returnData.locations.reduce((sum: number, location: any) => {
        const receipts = parseFloat(location.receipts?.replace(/,/g, '') || '0');
        return sum + receipts;
      }, 0);
      
      const baseTax = totalSalesValue * 0.015;
      const excessTax = parseFloat(returnData.excessTax || '0');
      const taxTotal = baseTax + excessTax;
      
      return {
        totalSalesValue: totalSalesValue.toFixed(2),
        taxTotal: taxTotal.toFixed(2)
      };
    }
    
    // For other return types, use the original values
    const baseTax = parseFloat(returnData.grossRetailReceipts || '990.00') * 0.015;
    const excessTax = parseFloat(returnData.excessTax || '0');
    const taxTotal = baseTax + excessTax;
    
    return {
      totalSalesValue: returnData.grossRetailReceipts || '990.00',
      taxTotal: taxTotal.toFixed(2)
    };
  };

  const calculatedTotals = calculateTotals();

  // Calculate penalty components - only if bill is past due
  const taxTotalValue = parseFloat(calculatedTotals.taxTotal);
  const billDueDate = new Date(returnData.billDueDate || '');
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day for comparison
  billDueDate.setHours(0, 0, 0, 0); // Set to start of day for comparison
  
  const isPastDue = billDueDate < today;
  const failureToPay = isPastDue ? (taxTotalValue * 0.1).toFixed(2) : '0.00';
  const failureToFile = isPastDue ? (taxTotalValue * 0.05).toFixed(2) : '0.00';
  const penaltiesTotal = isPastDue ? (parseFloat(failureToPay) + parseFloat(failureToFile)).toFixed(2) : '0.00';
  
  // Calculate Current Due as Tax Total + Penalties Total
  const currentDue = (taxTotalValue + parseFloat(penaltiesTotal)).toFixed(2);
  
  // Calculate Balance Due as Current Due - Credit Refunded
  const creditToBeApplied = parseFloat(returnData.creditToBeApplied || '0');
  const balanceDue = (parseFloat(currentDue) - creditToBeApplied).toFixed(2);

  // Mock data based on the image - in a real app this would come from the form data
  const summaryData = {
    account: returnData.account || '4',
    billNumber: '0003703546-2025-2024-0000-00',
    returnType: returnData.returnType || 'GR Food and Beverage',
    dateSubmitted: new Date().toLocaleDateString(),
    monthEnding: returnData.monthEnding || '1/31/2025',
    billDueDate: returnData.billDueDate || '2/25/2025',
    filedBy: returnData.filedBy || 'jennifer tester',
    totalSalesValue: calculatedTotals.totalSalesValue,
    excessTaxAmount: returnData.excessTax || '0.00',
    currentDue: currentDue,
    creditRefunded: returnData.creditRefunded || '0.00',
    creditToBeApplied: returnData.creditToBeApplied || '0.00',
    penaltiesTotal: penaltiesTotal,
    failureToPay: failureToPay,
    failureToFile: failureToFile,
    taxTotal: calculatedTotals.taxTotal,
    balanceDue: balanceDue,
    ownerName: returnData.ownerName || 'JENS BAKERY',
    ownerAddress: returnData.ownerAddress || '123 SUGAR WAY PITTSBORO NC 27312',
    locations: returnData.locations || [
      {
        name: '1',
        address: 'SUGAR HWYO',
        receipts: returnData.grossRetailReceipts || '1,000.00',
        nonPreparedReceipts: returnData.nonPreparedFoodBeverageReceipts || '10.00'
      }
    ]
  };

  const handleRedoReturn = () => {
    // Navigate back to the appropriate return page with the current data
    if (returnData.account === '22') {
      // For trucking business (account 22), go to trucking return page
      navigate('/gross-receipt-bills/return-trucking', {
        state: { returnData }
      });
    } else if (returnData.account === '23') {
      // For room occupancy business (account 23), go to room occupancy return page
      navigate('/gross-receipt-bills/return-room-occupancy', {
        state: { returnData }
      });
    } else if (returnData.account === '25') {
      // For vehicle rental business (account 25), go to vehicle rental return page
      navigate('/gross-receipt-bills/return-vehicle-rental', {
        state: { returnData }
      });
    } else {
      // For other businesses (like account 4), go to regular return page
      navigate('/gross-receipt-bills/return', {
        state: { returnData }
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate submission process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      alert('Return submitted successfully! You will receive a confirmation email shortly.');
    } catch (error) {
      alert('There was an error submitting your return. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePayBillNow = () => {
    // Navigate to payment page or handle payment
    alert('Redirecting to payment...');
    navigate('/gross-receipt-bills');
  };
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Navigation breadcrumb for screen readers */}
      <nav aria-label="Breadcrumb" className="sr-only">
        <ol>
          <li>Taxpayer Apps</li>
          <li>Gross Receipt Bills</li>
          <li>Account Search</li>
          <li>Create New Return</li>
          <li aria-current="page">Final Review</li>
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
          <main>
            {/* Warning Message */}
            <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded-lg">
              <p className="text-blue-800 text-sm">
                Please verify the return information before submitting. After submission, you will have to contact the county tax office to change your return.
              </p>
            </div>

            {/* Return Summary */}
            <div className="bg-white border rounded-lg p-6 mb-6">
              {/* Header Information */}
              <div className="text-center mb-6 space-y-2">
                <div className="flex justify-center items-center gap-8">
                  <div>
                    <span className="font-medium">Account:</span> {summaryData.account}
                  </div>
                  <div>
                    <span className="font-medium">Bill Number:</span> {summaryData.billNumber}
                  </div>
                </div>
                <div className="flex justify-center items-center gap-8">
                  <div>
                    <span className="font-medium">Account Type:</span> {summaryData.returnType}
                  </div>
                  <div>
                    <span className="font-medium">Date Submitted:</span> {summaryData.dateSubmitted}
                  </div>
                </div>
                <div className="flex justify-center items-center gap-8">
                  <div>
                    <span className="font-medium">Month Ending:</span> {summaryData.monthEnding}
                  </div>
                </div>
                <div className="flex justify-center items-center gap-8">
                  <div>
                    <span className="font-medium">Bill Due Date:</span> {summaryData.billDueDate}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Filed By:</span> {summaryData.filedBy}
                </div>
              </div>

              {/* Financial Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">Total Sales Value:</span>
                  <span className="font-medium">${parseFloat(summaryData.totalSalesValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Excess Tax Amount:</span>
                  <span>${parseFloat(summaryData.excessTaxAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Current Due:</span>
                  <span>${parseFloat(summaryData.currentDue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="text-xs text-gray-600 ml-4">
                  *Current Due does not include the credit to be applied
                </div>
                <div className="flex justify-between items-center">
                  <span>Credit Refunded:</span>
                  <span>${parseFloat(summaryData.creditRefunded).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Credit To Be Applied:</span>
                  <span>${parseFloat(summaryData.creditToBeApplied).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Failure to Pay:</span>
                  <span>${parseFloat(summaryData.failureToPay).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Failure to File:</span>
                  <span>${parseFloat(summaryData.failureToFile).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Penalties Total:</span>
                  <span>${parseFloat(summaryData.penaltiesTotal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Tax Total:</span>
                  <span>${parseFloat(summaryData.taxTotal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center font-medium text-lg">
                  <span>Balance Due:</span>
                  <span>${parseFloat(summaryData.balanceDue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              {/* Owner Information */}
              <div className="text-center mb-6">
                <div className="font-medium text-blue-600">{summaryData.ownerName}</div>
                <div className="text-blue-600">{summaryData.ownerAddress}</div>
              </div>

              {/* Locations Table */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-center mb-4">Locations</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-center font-medium">Location Number</th>
                        <th className="border border-gray-300 px-4 py-2 text-center font-medium">Address</th>
                        {summaryData.returnType === 'GR Food and Beverage' && (
                          <>
                            <th className="border border-gray-300 px-4 py-2 text-center font-medium">Gross Retail Receipts ($)</th>
                            <th className="border border-gray-300 px-4 py-2 text-center font-medium">Non-Prepared Receipts ($)</th>
                            <th className="border border-gray-300 px-4 py-2 text-center font-medium">Total Sales</th>
                          </>
                        )}
                        {summaryData.returnType === 'GR Heavy Equipments' && (
                          <th className="border border-gray-300 px-4 py-2 text-center font-medium">Total Sales ($)</th>
                        )}
                        {summaryData.returnType === 'GR Vehicle Rental' && (
                          <th className="border border-gray-300 px-4 py-2 text-center font-medium">Total Sales ($)</th>
                        )}
                        {summaryData.returnType === 'GR Room Occupancy' && (
                          <>
                            <th className="border border-gray-300 px-4 py-2 text-center font-medium">Gross Retail Receipts ($)</th>
                            <th className="border border-gray-300 px-4 py-2 text-center font-medium">Extended Stays ($)</th>
                            <th className="border border-gray-300 px-4 py-2 text-center font-medium">Government Exemptions ($)</th>
                            <th className="border border-gray-300 px-4 py-2 text-center font-medium">Non-Occupancy ($)</th>
                            <th className="border border-gray-300 px-4 py-2 text-center font-medium">Total Sales ($)</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {summaryData.locations.map((location, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 px-4 py-2 text-center">{location.name}</td>
                          <td className="border border-gray-300 px-4 py-2 text-center">{location.address}</td>
                          {summaryData.returnType === 'GR Food and Beverage' && (
                            <>
                              <td className="border border-gray-300 px-4 py-2 text-center">${parseFloat(location.receipts.replace(/,/g, '')).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">${parseFloat(location.nonPreparedReceipts.replace(/,/g, '')).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                ${(() => {
                                  const receipts = parseFloat(location.receipts.replace(/,/g, '')) || 0;
                                  const nonPrepared = parseFloat(location.nonPreparedReceipts.replace(/,/g, '')) || 0;
                                  return (receipts - nonPrepared).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                })()}
                              </td>
                            </>
                          )}
                          {summaryData.returnType === 'GR Heavy Equipments' && (
                            <td className="border border-gray-300 px-4 py-2 text-center">${parseFloat(location.receipts.replace(/,/g, '')).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          )}
                          {summaryData.returnType === 'GR Vehicle Rental' && (
                            <td className="border border-gray-300 px-4 py-2 text-center">${parseFloat(location.receipts.replace(/,/g, '')).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          )}
                          {summaryData.returnType === 'GR Room Occupancy' && (
                            <>
                              <td className="border border-gray-300 px-4 py-2 text-center">${parseFloat(location.receipts?.replace(/,/g, '') || '0').toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">${parseFloat(location.extendedStays?.replace(/,/g, '') || '0').toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">${parseFloat(location.governmentExemptions?.replace(/,/g, '') || '0').toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">${parseFloat(location.nonOccupancy?.replace(/,/g, '') || '0').toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">
                                ${(() => {
                                  const receipts = parseFloat(location.receipts?.replace(/,/g, '') || '0');
                                  const extendedStays = parseFloat(location.extendedStays?.replace(/,/g, '') || '0');
                                  const governmentExemptions = parseFloat(location.governmentExemptions?.replace(/,/g, '') || '0');
                                  const nonOccupancy = parseFloat(location.nonOccupancy?.replace(/,/g, '') || '0');
                                  return (receipts - extendedStays - governmentExemptions - nonOccupancy).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                })()}
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                {!isSubmitted ? (
                  <>
                    <button
                      onClick={handleRedoReturn}
                      className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                      disabled={isSubmitting}
                    >
                      Redo Return
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-[#002B5B] text-white rounded hover:bg-[#003875] transition-colors disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Return'}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handlePrint}
                      className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                      Print
                    </button>
                    <button
                      onClick={handlePayBillNow}
                      className="px-6 py-2 bg-[#002B5B] text-white rounded hover:bg-[#003875] transition-colors"
                    >
                      Pay Bill Now
                    </button>
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default GrossReceiptFinalReview;