import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Search, FileText, Printer } from 'lucide-react';

const RequestPin: React.FC = () => {
  const navigate = useNavigate();

  const handlePrintForm = () => {
    // Create a printable PIN request form
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PIN Request Form</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 8.5in;
              margin: 0 auto;
              padding: 1in;
              line-height: 1.4;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #000;
              padding-bottom: 20px;
            }
            .form-section {
              margin-bottom: 25px;
            }
            .form-row {
              display: flex;
              margin-bottom: 15px;
              align-items: center;
            }
            .form-label {
              font-weight: bold;
              min-width: 150px;
              margin-right: 10px;
            }
            .form-line {
              border-bottom: 1px solid #000;
              flex: 1;
              height: 20px;
              margin-right: 20px;
            }
            .instructions {
              background-color: #f5f5f5;
              padding: 15px;
              border: 1px solid #ccc;
              margin-bottom: 20px;
            }
            .signature-section {
              margin-top: 40px;
              border-top: 1px solid #000;
              padding-top: 20px;
            }
            @media print {
              body { margin: 0; padding: 0.5in; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Gross Receipt Tax PIN Request Form</h1>
            <p>County Tax Office</p>
          </div>
          
          <div class="instructions">
            <h2>Instructions:</h2>
            <p>Please complete this form and mail it to the county tax office to request your PIN for online access to gross receipt tax services.</p>
            <p><strong>Mailing Address:</strong><br>
            County Tax Office<br>
            [Address Line 1]<br>
            [City, State ZIP Code]</p>
          </div>

          <div class="form-section">
            <h2>Business Information</h2>
            <div class="form-row">
              <span class="form-label">Business Name:</span>
              <div class="form-line"></div>
            </div>
            <div class="form-row">
              <span class="form-label">Account Number:</span>
              <div class="form-line"></div>
            </div>
            <div class="form-row">
              <span class="form-label">Federal Tax ID:</span>
              <div class="form-line"></div>
            </div>
            <div class="form-row">
              <span class="form-label">Business Address:</span>
              <div class="form-line"></div>
            </div>
            <div class="form-row">
              <span class="form-label">City, State, ZIP:</span>
              <div class="form-line"></div>
            </div>
          </div>

          <div class="form-section">
            <h2>Contact Information</h2>
            <div class="form-row">
              <span class="form-label">Contact Name:</span>
              <div class="form-line"></div>
            </div>
            <div class="form-row">
              <span class="form-label">Title:</span>
              <div class="form-line"></div>
            </div>
            <div class="form-row">
              <span class="form-label">Phone Number:</span>
              <div class="form-line"></div>
            </div>
            <div class="form-row">
              <span class="form-label">Email Address:</span>
              <div class="form-line"></div>
            </div>
          </div>

          <div class="form-section">
            <h2>Mailing Address (if different from business address)</h2>
            <div class="form-row">
              <span class="form-label">Mailing Address:</span>
              <div class="form-line"></div>
            </div>
            <div class="form-row">
              <span class="form-label">City, State, ZIP:</span>
              <div class="form-line"></div>
            </div>
          </div>

          <div class="signature-section">
            <div class="form-row">
              <span class="form-label">Signature:</span>
              <div class="form-line"></div>
              <span class="form-label">Date:</span>
              <div class="form-line" style="max-width: 150px;"></div>
            </div>
            <div class="form-row">
              <span class="form-label">Print Name:</span>
              <div class="form-line"></div>
            </div>
          </div>

          <div style="margin-top: 30px; font-size: 12px; color: #666;">
            <p><strong>For Office Use Only:</strong></p>
            <div class="form-row">
              <span class="form-label">PIN Assigned:</span>
              <div class="form-line"></div>
              <span class="form-label">Date:</span>
              <div class="form-line" style="max-width: 150px;"></div>
            </div>
            <div class="form-row">
              <span class="form-label">Processed By:</span>
              <div class="form-line"></div>
            </div>
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
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
          <li aria-current="page">Request PIN</li>
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
              aria-current="page"
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
              Request PIN for Gross Receipt Tax Portal
            </h1>
          </header>

          <main>
            <div className="space-y-6 max-w-4xl">
              <section>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  To access your gross receipt tax account online, you need a Personal Identification Number (PIN). 
                  If you don't have a PIN yet, you can request one by printing and completing the PIN request form below.
                </p>
              </section>

              {/* Print PIN Request Form Button */}
              <section className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">
                  Print PIN Request Form
                </h2>
                <p className="text-blue-800 mb-4">
                  Click the button below to print the PIN request form. After printing, complete the form and mail it to the county tax office.
                </p>
                <button
                  onClick={handlePrintForm}
                  className="inline-flex items-center px-6 py-3 bg-[#002B5B] text-white font-medium rounded-lg hover:bg-[#003875] focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:ring-offset-2 transition-colors"
                  aria-describedby="print-form-description"
                >
                  <Printer className="w-5 h-5 mr-2" aria-hidden="true" />
                  Print PIN Request Form
                </button>
                <p id="print-form-description" className="text-sm text-blue-700 mt-2">
                  This will open a printable version of the PIN request form in a new window
                </p>
              </section>

              {/* Instructions */}
              <section className="mt-8 p-4 bg-gray-50 border rounded-lg">
                <h2 className="text-lg font-medium text-gray-900 mb-3">
                  How to Request Your PIN
                </h2>
                <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                  <li>Click the "Print PIN Request Form" button above</li>
                  <li>Complete all required fields on the printed form</li>
                  <li>Sign and date the form</li>
                  <li>Mail the completed form to the county tax office</li>
                  <li>You will receive your PIN by mail within 5-7 business days</li>
                </ol>
              </section>

              {/* Contact Information */}
              <section className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                <h2 className="text-lg font-medium text-yellow-900 mb-2">
                  Need Help?
                </h2>
                <p className="text-yellow-800">
                  If you have questions about the PIN request process or need assistance, 
                  please contact the county tax office during business hours at (555) 444-5555 
                  or email tax@abc.nc.gov.
                </p>
              </section>

              {/* Accessibility notice */}
              <section className="mt-8 p-4 bg-gray-50 border rounded-lg">
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Accessibility
                </h2>
                <p className="text-gray-700">
                  This form is designed to be accessible to all users. If you need assistance with printing 
                  or completing the form, or require an alternative format, please contact our support team. 
                  We are committed to providing equal access to all taxpayers.
                </p>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RequestPin;