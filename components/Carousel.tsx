
import React, { useState, useEffect, useCallback } from 'react';
import type { Book } from '../types';

interface CarouselProps {
  books: Book[];
}

const Carousel: React.FC<CarouselProps> = ({ books }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === books.length - 1 ? 0 : prevIndex + 1));
  }, [books.length]);

  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? books.length - 1 : prevIndex - 1));
  };
  
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (!books || books.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-2xl" style={{ height: '500px' }}>
      <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {books.map(book => (
          <div key={book.id} className="w-full flex-shrink-0 h-full relative">
            <img src={`${book.coverImage.replace('/400/600', '/1200/800')}`} alt={book.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h3 className="text-3xl lg:text-4xl font-bold">{book.title}</h3>
              <p className="mt-2 text-lg">{book.author}</p>
              <p className="mt-4 max-w-2xl hidden md:block">{book.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full focus:outline-none transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full focus:outline-none transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {books.map((_, index) => (
          <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'} transition-colors`}></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
