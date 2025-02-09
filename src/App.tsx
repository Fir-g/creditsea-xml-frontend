import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Upload } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface CreditReport {
  _id: string;
  basicDetails: {
    name: string;
    mobilePhone: string;
    pan: string;
    creditScore: number;
  };
  reportSummary: {
    totalAccounts: number;
    activeAccounts: number;
    closedAccounts: number;
    currentBalanceAmount: number;
    securedAccountsAmount: number;
    unsecuredAccountsAmount: number;
    lastSevenDaysCreditEnquiries: number;
  };
  creditAccounts: Array<{
    type: string;
    bank: string;
    accountNumber: string;
    address: string;
    amountOverdue: number;
    currentBalance: number;
  }>;
  createdAt: string;
}

function App() {
  const [reports, setReports] = useState<CreditReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<CreditReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const BACKEND_BASE_URL = 'http://localhost:3000';

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600 bg-green-50';
    if (score >= 650) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getAmountColor = (amount: number) => {
    if (amount === 0) return 'text-green-600';
    if (amount < 10000) return 'text-yellow-600';
    return 'text-red-600';
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/api/reports`);
      setReports(response.data);
    } catch (error) {
      toast.error('Error fetching reports');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      await axios.post(`${BACKEND_BASE_URL}/api/upload`, formData);
      toast.success('Report uploaded successfully');
      fetchReports();
      event.target.value = ''; // Reset file input
    } catch (error) {
      toast.error('Error uploading report');
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter(report =>
    report.basicDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.basicDetails.pan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white">CreditSea Report Processor</h1>
          <p className="text-blue-100 mt-2">View and manage credit reports efficiently</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Upload Section */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-700">Upload Credit Report</h2>
            {loading && (
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-full">
                <Upload className="h-4 w-4 text-blue-600 animate-spin" />
                <span className="text-blue-600 text-sm">Processing...</span>
              </div>
            )}
          </div>
          <label className="block">
            <input
              type="file"
              accept=".xml"
              onChange={handleFileUpload}
              disabled={loading}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                disabled:opacity-50
                transition-all duration-200"
            />
          </label>
        </div>

        {/* Reports Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Reports List Sidebar */}
          <div className="col-span-1 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Reports</h2>
              <span className="text-sm text-gray-500">{filteredReports.length} reports</span>
            </div>

            {/* Search Box */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by name or PAN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              />
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredReports.map(report => (
                <button
                  key={report._id}
                  onClick={() => setSelectedReport(report)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 hover:shadow-md
                    ${selectedReport?._id === report._id
                      ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                      : 'hover:bg-gray-50 border border-transparent'
                    }`}
                >
                  <div className="font-medium">{report.basicDetails.name}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </div>
                  <div className={`text-sm mt-2 px-3 py-1 rounded-full inline-block ${getCreditScoreColor(report.basicDetails.creditScore)}`}>
                    Score: {report.basicDetails.creditScore}
                  </div>
                </button>
              ))}

              {filteredReports.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                  <p>{searchTerm ? 'No matching reports found' : 'No reports available'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Report Details */}
          <div className="col-span-2">
            {selectedReport ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                {/* Basic Details */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    Basic Details
                    <span className={`ml-4 text-sm px-3 py-1 rounded-full ${getCreditScoreColor(selectedReport.basicDetails.creditScore)}`}>
                      Score: {selectedReport.basicDetails.creditScore}
                    </span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <label className="text-sm text-gray-500">Name</label>
                      <div className="font-medium mt-1">{selectedReport.basicDetails.name}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <label className="text-sm text-gray-500">Mobile Phone</label>
                      <div className="font-medium mt-1">{selectedReport.basicDetails.mobilePhone}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <label className="text-sm text-gray-500">PAN</label>
                      <div className="font-medium mt-1">{selectedReport.basicDetails.pan}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <label className="text-sm text-gray-500">Report Date</label>
                      <div className="font-medium mt-1">
                        {new Date(selectedReport.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Report Summary */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Report Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <label className="text-sm text-gray-500">Total Accounts</label>
                      <div className="font-medium text-blue-600 mt-1">{selectedReport.reportSummary.totalAccounts}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <label className="text-sm text-gray-500">Active Accounts</label>
                      <div className="font-medium text-green-600 mt-1">{selectedReport.reportSummary.activeAccounts}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <label className="text-sm text-gray-500">Current Balance Amount</label>
                      <div className="font-medium text-blue-600 mt-1">
                        ₹{selectedReport.reportSummary.currentBalanceAmount.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <label className="text-sm text-gray-500">Last 7 Days Credit Enquiries</label>
                      <div className={`font-medium mt-1 ${selectedReport.reportSummary.lastSevenDaysCreditEnquiries > 2 ? 'text-red-600' : 'text-green-600'}`}>
                        {selectedReport.reportSummary.lastSevenDaysCreditEnquiries}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <label className="text-sm text-gray-500">Secured Accounts Amount</label>
                      <div className="font-medium text-green-600 mt-1">
                        ₹{selectedReport.reportSummary.securedAccountsAmount.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <label className="text-sm text-gray-500">Unsecured Accounts Amount</label>
                      <div className="font-medium text-yellow-600 mt-1">
                        ₹{selectedReport.reportSummary.unsecuredAccountsAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credit Accounts Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Credit Accounts Information</h3>
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bank
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Account Number
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Address
                            </th>
                            Current Balance
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount Overdue
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedReport.creditAccounts.map((account, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-medium text-gray-900">{account.type}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-500">{account.bank}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-500">{account.accountNumber}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {account.address}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-medium text-blue-600">
                                ₹{account.currentBalance.toLocaleString()}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`text-sm font-medium ${getAmountColor(account.amountOverdue)}`}>
                                ₹{account.amountOverdue.toLocaleString()}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {selectedReport.creditAccounts.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                              No credit accounts found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
                <FileText className="mx-auto h-16 w-16 text-gray-400" />
                <p className="mt-4 text-gray-500">Select a report from the list to view details</p>
                <p className="mt-2 text-sm text-gray-400">
                  You can search for specific reports using the search box
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;