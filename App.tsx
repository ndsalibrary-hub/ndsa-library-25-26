
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import RulesPage from './pages/RulesPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import Footer from './components/Footer';

function App() {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen font-sans text-slate-800">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogue" element={<CataloguePage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
