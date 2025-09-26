
import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import { useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousel';
import NoticeBoard from '../components/NoticeBoard';
import { SearchIcon } from '../components/icons/SearchIcon';

const HomePage: React.FC = () => {
  const { books, notices, searchTerm, setSearchTerm } = useLibrary();
  const navigate = useNavigate();
  const featuredBooks = books.filter(book => book.featured);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/catalogue');
  };

  return (
    <div className="space-y-12">
      <section className="text-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight sm:text-5xl">Welcome to NDSA Digital Library</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">Your gateway to knowledge and adventure. Find your next favorite book today.</p>
        <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, author, or category..."
            className="w-full px-4 py-3 rounded-l-md border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
          />
          <button type="submit" className="bg-sky-600 text-white px-6 py-3 rounded-r-md hover:bg-sky-700 transition-colors flex items-center">
            <SearchIcon className="h-5 w-5" />
            <span className="ml-2 hidden sm:inline">Search</span>
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Featured Books</h2>
        <Carousel books={featuredBooks} />
      </section>

      <section>
        <NoticeBoard notices={notices} />
      </section>
    </div>
  );
};

export default HomePage;
