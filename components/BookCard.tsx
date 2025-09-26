
import React from 'react';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative h-64">
        <img className="w-full h-full object-cover" src={book.coverImage} alt={book.title} />
        <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold text-white rounded-full ${book.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}>
          {book.isAvailable ? 'Available' : 'Borrowed'}
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-sky-600 font-semibold">{book.category}</p>
        <h3 className="text-lg font-bold text-slate-800 mt-1 truncate group-hover:text-sky-700">{book.title}</h3>
        <p className="text-sm text-slate-600">{book.author}</p>
        <p className="text-sm text-slate-500 mt-2 h-20 overflow-hidden text-ellipsis">
          {book.description}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
