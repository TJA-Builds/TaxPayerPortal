import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Printer, CreditCard, Download, Calculator, AlertCircle, Info } from 'lucide-react';

interface BillDetailProps {}

const BillDetail: React.FC<BillDetailProps> = () => {
  const navigate = useNavigate();
  const { billNumber } = useParams();
  const [billStatus, setBillStatus] = useState('Unpaid');
  const [interestDate, setInterestDate] = useState('01/06/2025');
  const [dueAmount, setDueAmount] = useState(123.76);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [interestCalculatedTo, setInterestCalculatedTo] = useState<string | null>(null);
  const [originalAmount, setOriginalAmount] = useState(123.76);
  const [showNotes, setShowNotes] = useState(false);

  const taxRates = [
    { rate: '.6778', district: 'FORSYTH', description: 'Tax', amount: 302.40 },
    { rate: '', district: 'FORSYTH', description: 'Late List Penalty', amount: 90.72 },
    { rate: '', district: 'FORSYTH', description: 'Garnishment Fee', amount: 30.00 },
    { rate: '.0039', district: 'COUNTYWIDE FIRE', description: 'Tax', amount: 1.74 },
    { rate: '', district: 'COUNTYWIDE FIRE', description: 'Late List Penalty', amount: 0.52 },
    { rate: '.1000', district: 'TALLEYS CROSSING', description: 'Tax', amount: 44.62 },
    { rate: '', district: 'TALLEYS CROSSING', description: 'Late List Penalty', amount: 13.39 }
  ];

  const totalInterest = 22.68;
  const totalBilled = 506.06;

  const propertyValues = [
    { id: '123456798', description: 'MACHINERY AND EQUIPMENT - B50', value: 100000 },
    { id: '456789123', description: 'FURNITURE AND FIXTURES - K8', value: 24000 },
    { id: '146789213', description: 'SUPPLIES', value: 2500 }
  ];

  const totalValue = propertyValues.reduce((sum, item) => sum + item.value, 0);

  const handleBackClick = () => {
    navigate('/taxpayer-apps/bill-search');
  };

  const handleRecalculateInterest = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDatePicker(true);
  };

  const handleClearInterest = () => {
    setDueAmount(originalAmount);
    setInterestCalculatedTo(null);
  };

  const handleDateSubmit = () => {
    if (!selectedDate) {
      setDateError('Please select a date');
      return;
    }

    const calculationDate = new Date(selectedDate);
    const interestStartDate = new Date('2025-01-06');

    if (calculationDate < interestStartDate) {
      setDateError('Selected date must be after interest begin date');
      return;
    }

    const daysDiff = Math.floor((calculationDate.getTime() - interestStartDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff > 0) {
      const dailyInterestRate = 0.02 / 30;
      const interestAmount = dueAmount * dailyInterestRate * daysDiff;
      const newTotal = dueAmount + interestAmount;
      setInterestCalculatedTo(selectedDate);
      setDueAmount(Number(newTotal.toFixed(2)));
      setShowDatePicker(false);
      setSelectedDate('');
      setDateError('');
    }
  };

  const handlePrintBill = () => {
    window.print();
  };

  const handleExportBillHistory = () => {
    const billHistory = [
      {
        billNumber: '0123456789-2024-2024-0000-00',
        ownerName: 'Cookies and More Bakery',
        totalBilled: 5023.34,
        totalPaid: 5023.34,
        currentDue: 0.00
      },
      {
        billNumber: '0123456789-2023-2023-0000-00',
        ownerName: 'Cookies and More Bakery',
        totalBilled: 5023.34,
        totalPaid: 5023.34,
        currentDue: 0.00
      }
    ];

    const headers = [
      'Bill Number',
      'Owner Name',
      'Total Billed',
      'Total Paid',
      'Current Due'
    ].join(',');

    const csvRows = billHistory.map(bill => [
      bill.billNumber,
      `"${bill.ownerName}"`,
      bill.totalBilled.toFixed(2),
      bill.totalPaid.toFixed(2),
      bill.currentDue.toFixed(2)
    ].join(','));

    const csvContent = [headers, ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const fileName = `bill_history_${billNumber}_${new Date().toISOString().split('T')[0]}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePayBill = () => {
    const billData = {
      id: '1',
      billNumber: billNumber,
      billDueAmount: 123.76,
      ownerName: 'Cookies and More Bakery'
    };
    
    navigate('/taxpayer-apps/payment', { 
      state: { 
        selectedBills: [billData]
      } 
    });
  };

  const formatBillNumber = (number: string | undefined) => {
    if (!number) return '';
    const base = number.padStart(10, '0');
    const year = '2025';
    return `${base}-${year}-${year}-0000-00`;
  };

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <Info className="w-3 h-3" />
            View Implementation Notes
          </button>
        </div>

        {showNotes && (
          <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs font-medium text-blue-800 mb-1">Note: This is an initial display of the Bill Detail Page.</p>
            <ul className="list-disc pl-4 text-xs text-blue-800 space-y-0.5">
              <li>The page should be designed to be modular, allowing components and attributes to be shown or hidden based on user preferences.</li>
              <li>Print Bill/view PDF features should follow the same design principles for consistency with bill detail. Ideally they should be same.</li>
              <li>Component selection and information display on this page should be determined through:
                <ul className="list-disc pl-4 mt-0.5">
                  <li>Extensive product discovery with customers.</li>
                  <li>Research of existing taxpayer bill search websites.</li>
                </ul>
              </li>
            </ul>
          </div>
        )}

        <div className="border-b pb-2 mb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-2">
                <h1 className="text-xl font-semibold text-gray-800">Bill # {formatBillNumber(billNumber)}</h1>
                <button 
                  onClick={handleBackClick}
                  className="flex items-center text-[#002B5B] hover:text-[#003875] text-sm"
                >
                  <ArrowLeft className="w-3 h-3 mr-1" />
                  Back to Bill Search
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                {/* First Column */}
                <div className="space-y-1">
                  <div className="grid grid-cols-2 text-xs">
                    <span className="text-gray-600">Bill Type:</span>
                    <span>BUS</span>
                  </div>
                  <div className="grid grid-cols-2 text-xs">
                    <span className="text-gray-600">Description:</span>
                    <span>Business Personal Property</span>
                  </div>
                  <div className="grid grid-cols-2 text-xs">
                    <span className="text-gray-600">Parcel ID:</span>
                    <span>123456789</span>
                  </div>
                  <div className="grid grid-cols-2 text-xs">
                    <span className="text-gray-600">Bill Due Date:</span>
                    <span className="text-red-600 font-medium">09/01/2025</span>
                  </div>
                  <div className="grid grid-cols-2 text-xs">
                    <span className="text-gray-600">Bill Flags:</span>
                    <span className="text-red-600 font-medium">Delinquent</span>
                  </div>
                </div>

                {/* Second Column */}
                <div className="space-y-1">
                  <div className="grid grid-cols-2 text-xs">
                    <span className="text-gray-600">Owner Name:</span>
                    <span>Cookies and More Bakery</span>
                  </div>
                  <div className="grid grid-cols-2 text-xs">
                    <span className="text-gray-600">DBA:</span>
                    <span>Jens Treats</span>
                  </div>
                  <div className="grid grid-cols-2 text-xs">
                    <span className="text-gray-600">Mailing Address:</span>
                    <div>
                      <p>123 Main St</p>
                      <p>Mytown, NC 23232</p>
                    </div>
                  </div>
                </div>

                {/* Third Column - Empty for spacing */}
                <div></div>
              </div>
            </div>
            
            <div className="text-right ml-4">
              <p className="text-red-600 font-semibold text-base">Amount Due ${dueAmount.toFixed(2)}</p>
              <div className="mt-0.5 flex flex-col items-end gap-0.5">
                <div className="text-right">
                  <p className="text-[10px] text-gray-500">Interest Begins: {interestDate}</p>
                  {interestCalculatedTo && (
                    <p className="text-[10px] text-gray-500">
                      Interest calculated to: {new Date(interestCalculatedTo).toLocaleDateString()}{' '}
                      <button
                        onClick={handleClearInterest}
                        className="text-red-600 hover:text-red-800 text-[10px] ml-1"
                      >
                        (Clear)
                      </button>
                    </p>
                  )}
                </div>
                <button
                  onClick={(e) => handleRecalculateInterest(e)}
                  disabled={billStatus === 'Paid'}
                  className={`text-[10px] px-1.5 py-0.5 rounded inline-flex items-center gap-1
                    ${billStatus === 'Paid' 
                      ? 'text-gray-400 border border-gray-300 cursor-not-allowed'
                      : 'text-[#002B5B] hover:bg-gray-50 border border-[#002B5B]'
                    }`}
                >
                  <Calculator className="w-2.5 h-2.5" />
                  Recalculate Interest
                </button>
                {showDatePicker && (
                  <div className="absolute top-16 right-0 bg-white border rounded-lg shadow-lg p-3 z-50">
                    <h4 className="text-xs font-medium mb-1.5">Select Date for Interest Calculation</h4>
                    <div className="mb-2">
                      <input
                        type="date"
                        className="w-full px-1.5 py-0.5 border rounded text-xs"
                        min={interestDate.split('/').reverse().join('-')}
                        value={selectedDate}
                        onChange={(e) => {
                          setSelectedDate(e.target.value);
                          setDateError('');
                        }}
                      />
                      {dateError && (
                        <p className="text-[10px] text-red-600 mt-0.5 flex items-center">
                          <AlertCircle className="w-2.5 h-2.5 mr-1" />
                          {dateError}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end gap-1.5">
                      <button onClick={() => setShowDatePicker(false)} className="text-[10px] px-1.5 py-0.5 border rounded">
                        Cancel
                      </button>
                      <button onClick={handleDateSubmit} className="text-[10px] px-1.5 py-0.5 bg-[#002B5B] text-white rounded">
                        Calculate
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-1 space-x-1">
                <button 
                  className="text-xs px-2 py-1 bg-[#002B5B] text-white rounded hover:bg-[#003875] inline-flex items-center"
                  onClick={handlePayBill}
                >
                  <CreditCard className="w-3 h-3 mr-1" />
                  Pay Bill
                </button>
                <button 
                  className="text-xs px-2 py-1 border border-[#002B5B] text-[#002B5B] rounded hover:bg-gray-50 inline-flex items-center"
                  onClick={handlePrintBill}
                  type="button"
                >
                  <Printer className="w-3 h-3 mr-1" />
                  Print Bill
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Bill & Property Information</h2>
            <div className="space-y-1">
              <div className="grid grid-cols-2 text-xs">
                <span className="text-gray-600">Listing Information</span>
                <div className="flex items-center gap-2">
                  <span>On Time</span>
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#002B5B] hover:text-[#003875] underline underline-offset-2"
                  >
                    Online Listing Website
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 text-xs">
                <span className="text-gray-600">Listing Received Date</span>
                <span>1/15/2025</span>
              </div>
              <div className="grid grid-cols-2 text-xs">
                <span className="text-gray-600">Physical Location</span>
                <div>
                  <p>123 Main St</p>
                  <p>Mytown, NC 23232</p>
                </div>
              </div>
              <div className="grid grid-cols-2 text-xs">
                <span className="text-gray-600">Taxing Jurisdictions</span>
                <div>
                  <p>County</p>
                  <p>City</p>
                  <p>Fire</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Property Values</h2>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-1 px-2 text-[10px] font-medium text-gray-500">Property ID</th>
                  <th className="text-left py-1 px-2 text-[10px] font-medium text-gray-500">Description</th>
                  <th className="text-right py-1 px-2 text-[10px] font-medium text-gray-500">Value</th>
                </tr>
              </thead>
              <tbody>
                {propertyValues.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="py-1 px-2">{item.id}</td>
                    <td className="py-1 px-2">{item.description}</td>
                    <td className="py-1 px-2 text-right">${item.value.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="border-t bg-gray-50 font-medium">
                  <td className="py-1 px-2" colSpan={2}>Total Value</td>
                  <td className="py-1 px-2 text-right">${totalValue.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Tax Bill Breakdown</h2>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-1 px-2 text-[10px] font-medium text-gray-500">Rate</th>
                  <th className="text-left py-1 px-2 text-[10px] font-medium text-gray-500">Tax Districts</th>
                  <th className="text-left py-1 px-2 text-[10px] font-medium text-gray-500">Description</th>
                  <th className="text-right py-1 px-2 text-[10px] font-medium text-gray-500">Amount</th>
                </tr>
              </thead>
              <tbody>
                {taxRates.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-1 px-2">{item.rate}</td>
                    <td className="py-1 px-2">{item.district}</td>
                    <td className="py-1 px-2">{item.description}</td>
                    <td className="py-1 px-2 text-right">${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="border-t">
                  <td colSpan={3} className="py-1 px-2 text-right font-medium">Interest:</td>
                  <td className="py-1 px-2 text-right">${totalInterest.toFixed(2)}</td>
                </tr>
                <tr className="border-t bg-gray-50 font-medium">
                  <td colSpan={3} className="py-1 px-2 text-right">Total Billed:</td>
                  <td className="py-1 px-2 text-right">${totalBilled.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Payment History</h2>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-1 px-2 text-[10px] font-medium text-gray-500">Date</th>
                  <th className="text-left py-1 px-2 text-[10px] font-medium text-gray-500">Type</th>
                  <th className="text-left py-1 px-2 text-[10px] font-medium text-gray-500">Paid By</th>
                  <th className="text-left py-1 px-2 text-[10px] font-medium text-gray-500">Trans #</th>
                  <th className="text-right py-1 px-2 text-[10px] font-medium text-gray-500">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-1 px-2">7/15/2024</td>
                  <td className="py-1 px-2">Payment</td>
                  <td className="py-1 px-2">Cookies and More Bakery</td>
                  <td className="py-1 px-2">12345</td>
                  <td className="py-1 px-2 text-right">5023.34</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold text-gray-800">Bill History</h2>
            <button
              onClick={handleExportBillHistory}
              className="flex items-center px-1.5 py-0.5 text-[10px] text-[#002B5B] hover:bg-gray-50 border border-[#002B5B] rounded"
            >
              <Download className="w-2.5 h-2.5 mr-1" />
              Export History
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-1 px-2 text-[10px] font-medium text-gray-500">Bill Number</th>
                  <th className="text-left py-1 px-2 text-[10px] font-medium text-gray-500">Owner Name</th>
                  <th className="text-right py-1 px-2 text-[10px] font-medium text-gray-500">Total Billed</th>
                  <th className="text-right py-1 px-2 text-[10px] font-medium text-gray-500">Total Paid</th>
                  <th className="text-right py-1 px-2 text-[10px] font-medium text-gray-500">Current Due</th>
                  <th className="text-center py-1 px-2 text-[10px] font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-1 px-2">0123456789-2024-2024-0000-00</td>
                  <td className="py-1 px-2">Cookies and More Bakery</td>
                  <td className="py-1 px-2 text-right">5023.34</td>
                  <td className="py-1 px-2 text-right">5023.34</td>
                  <td className="py-1 px-2 text-right">0.00</td>
                  <td className="py-1 px-2 text-center">
                    <button 
                      type="button"
                      onClick={() => window.print()}
                      className="text-[10px] text-[#002B5B] hover:underline"
                    >
                      Print Bill
                    </button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="py-1 px-2">0123456789-2023-2023-0000-00</td>
                  <td className="py-1 px-2">Cookies and More Bakery</td>
                  <td className="py-1 px-2 text-right">5023.34</td>
                  <td className="py-1 px-2 text-right">5023.34</td>
                  <td className="py-1 px-2 text-right">0.00</td>
                  <td className="py-1 px-2 text-center">
                    <button 
                      type="button"
                      onClick={() => window.print()}
                      className="text-[10px] text-[#002B5B] hover:underline"
                    >
                      Print Bill
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillDetail;