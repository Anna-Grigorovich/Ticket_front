import './App.css';
import { NavLink, Route, Router, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
        </Routes> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
