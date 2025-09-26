
import React, { useMemo } from 'react';
import { useLibrary } from '../context/LibraryContext';
import BookCard from '../components/BookCard';
import { SearchIcon } from '../components/icons/SearchIcon';

const CataloguePage: React.FC = () => {
  const { books, searchTerm, setSearchTerm } = useLibrary();

  const filteredBooks = useMemo(() => {
    if (!searchTerm) return books;
    const lowercasedTerm = searchTerm.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(lowercasedTerm) ||
      book.author.toLowerCase().includes(lowercasedTerm) ||
      book.category.toLowerCase().includes(lowercasedTerm)
    );
  }, [books, searchTerm]);

  return (
    <div className="space-y-8">
      <div>
          <h1 className="text-3xl font-bold text-slate-800">Library Catalogue</h1>
          <p className="mt-2 text-slate-600">Browse our collection or search for specific books.</p>
      </div>

       <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, author, or category..."
            className="w-full px-4 py-3 pl-10 rounded-md border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        </div>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <p className="text-slate-500 text-lg">No books found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default CataloguePage;
