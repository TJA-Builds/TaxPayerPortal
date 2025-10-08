import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import FarragutAdmin from './pages/FarragutAdmin';
import CountyAdmin from './pages/CountyAdmin';
import TaxpayerApps from './pages/TaxpayerApps';
import BillSearch from './pages/BillSearch';
import Payment from './pages/Payment';
import BillDetail from './pages/BillDetail';
import Reports from './pages/Reports';
import SystemRequirements from './pages/SystemRequirements';
import GrossReceiptBills from './pages/GrossReceiptBills';
import RequestPin from './pages/RequestPin';
import AccountSearch from './pages/AccountSearch';
import GrossReceiptReturn from './pages/GrossReceiptReturn';
import GrossReceiptReturnTrucking from './pages/GrossReceiptReturnTrucking';
import GrossReceiptReturnRoomOccupancy from './pages/GrossReceiptReturnRoomOccupancy';
import GrossReceiptReturnVehicleRental from './pages/GrossReceiptReturnVehicleRental';
import GrossReceiptFinalReview from './pages/GrossReceiptFinalReview';
import ChatWidget from './components/ChatWidget';
import SubscriptionManagement from './pages/SubscriptionManagement';

function App() {
  return (
    <MainLayout>
      <ChatWidget />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/farragut-admin" element={<FarragutAdmin />} />
        <Route path="/county-admin" element={<CountyAdmin />} />
        <Route path="/taxpayer-apps" element={<TaxpayerApps />} />
        <Route path="/taxpayer-apps/bill-search" element={<BillSearch />} />
        <Route path="/taxpayer-apps/payment" element={<Payment />} />
        <Route path="/taxpayer-apps/bill/:billNumber" element={<BillDetail />} />
        <Route path="/taxpayer-apps/reports" element={<Reports />} />
        <Route path="/system-requirements" element={<SystemRequirements />} />
        <Route path="/account/subscriptions" element={<SubscriptionManagement />} />
        <Route path="/gross-receipt-bills" element={<GrossReceiptBills />} />
        <Route path="/gross-receipt-bills/request-pin" element={<RequestPin />} />
        <Route path="/gross-receipt-bills/account-search" element={<AccountSearch />} />
        <Route path="/gross-receipt-bills/return" element={<GrossReceiptReturn />} />
        <Route path="/gross-receipt-bills/return-trucking" element={<GrossReceiptReturnTrucking />} />
        <Route path="/gross-receipt-bills/return-room-occupancy" element={<GrossReceiptReturnRoomOccupancy />} />
        <Route path="/gross-receipt-bills/return-vehicle-rental" element={<GrossReceiptReturnVehicleRental />} />
        <Route path="/gross-receipt-bills/final-review" element={<GrossReceiptFinalReview />} />
      </Routes>
    </MainLayout>
  );
}

export default App;