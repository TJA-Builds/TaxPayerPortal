import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CreditCard, Building2, Wallet } from 'lucide-react';

interface PaymentPageProps {}

const Payment: React.FC<PaymentPageProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedBills = location.state?.selectedBills || [];
  
  const handleBackClick = () => {
    localStorage.removeItem('heldBills');
    navigate('/taxpayer-apps/bill-search');
  };
  
  const totalAmount = selectedBills.reduce((sum: number, bill: any) => sum + bill.billDueAmount, 0);

  const handlePayment = (method: string) => {
    // Clear held bills from localStorage
    localStorage.removeItem('heldBills');
    
    // Show success message or handle payment processing here
    alert(`Processing payment via ${method}...`);
    
    // Navigate back to bill search
    navigate('/taxpayer-apps/bill-search');
  };

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={handleBackClick}
          className="flex items-center text-[#002B5B] hover:text-[#003875]"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Bill Search
        </button>
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-800">Total Amount Due: ${totalAmount.toFixed(2)}</p>
          <p className="text-xs text-gray-500">Selected Bills: {selectedBills.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-medium text-gray-800 mb-3">Selected Bills</h2>
          {selectedBills.map((bill: any) => (
            <div key={bill.id} className="border rounded p-2 mb-2 last:mb-0">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <p><span className="text-gray-500">Bill:</span> {bill.billNumber}</p>
                <p><span className="text-gray-500">Owner:</span> {bill.ownerName}</p>
                <p className="text-right"><span className="text-gray-500">Due:</span> ${bill.billDueAmount.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-medium text-gray-800 mb-3">Payment Methods</h2>
          <div className="border rounded p-3 mb-2 hover:shadow-sm transition-shadow">
            <div className="flex items-center mb-2">
              <CreditCard className="w-6 h-6 text-[#002B5B] mr-3" />
              <h3 className="font-medium">Credit/Debit Card</h3>
            </div>
            <p className="text-xs text-gray-600 mb-2">Pay securely using your credit or debit card</p>
            <button 
              onClick={() => handlePayment('card')}
              className="w-full bg-[#002B5B] text-white px-3 py-1.5 rounded text-sm hover:bg-[#003875] transition-colors"
            >
              Pay with Card
            </button>
          </div>

          <div className="border rounded p-3 mb-2 hover:shadow-sm transition-shadow">
            <div className="flex items-center mb-2">
              <Building2 className="w-6 h-6 text-[#002B5B] mr-3" />
              <h3 className="font-medium">Bank Transfer</h3>
            </div>
            <p className="text-xs text-gray-600 mb-2">Pay directly from your bank account</p>
            <button 
              onClick={() => handlePayment('bank')}
              className="w-full bg-[#002B5B] text-white px-3 py-1.5 rounded text-sm hover:bg-[#003875] transition-colors"
            >
              Pay with Bank
            </button>
          </div>

          <div className="border rounded p-3 hover:shadow-sm transition-shadow">
            <div className="flex items-center mb-2">
              <Wallet className="w-6 h-6 text-[#002B5B] mr-3" />
              <h3 className="font-medium">Digital Wallet</h3>
            </div>
            <p className="text-xs text-gray-600 mb-2">Pay using your preferred digital wallet</p>
            <button 
              onClick={() => handlePayment('wallet')}
              className="w-full bg-[#002B5B] text-white px-3 py-1.5 rounded text-sm hover:bg-[#003875] transition-colors"
            >
              Pay with Wallet
            </button>
          </div>

          <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
            <h3 className="font-medium text-gray-800 mb-1">Payment API Integration</h3>
            <p className="text-gray-600">
            This payment interface will be connected with various payment vendors to provide secure payment processing. 
            The actual payment functionality will be implemented when the payment APIs are ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;