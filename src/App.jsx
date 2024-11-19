import './App.css';
import {  Route,  Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import Events from './page/Events/Events';
// import Home from './page/Home/Home';
import EventDetail from './components/EventDetail/EventDetail';
import TicketPurchasePage from './components/TicketPurchasePage/TicketPurchasePage';
import CheckoutPage from './components/CheckoutPage/CheckoutPage';
import AboutPage from './page/AboutPage/AboutPage';
import ContactsPage from './page/ContactsPage/ContactsPage';
import OfferPage from './page/OfferPage/OfferPage';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/offer" element={<OfferPage />} />

          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/purchase/:eventId" element={<TicketPurchasePage />} />
          <Route path="/checkout/:eventId" element={<CheckoutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
