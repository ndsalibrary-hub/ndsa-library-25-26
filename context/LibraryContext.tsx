
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Book, Student, Notice, Rule } from '../types';
import { INITIAL_BOOKS, INITIAL_STUDENTS, INITIAL_NOTICES, INITIAL_RULES, ADMIN_PASSWORD } from '../constants';
import { generateBookDescription } from '../services/geminiService';

interface LibraryContextType {
  books: Book[];
  students: Student[];
  notices: Notice[];
  rules: Rule[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isAdminAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  addBook: (book: Omit<Book, 'id' | 'isAvailable'>) => void;
  deleteBook: (id: string) => void;
  addStudent: (student: Omit<Student, 'id'>) => void;
  deleteStudent: (id: string) => void;
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  deleteNotice: (id: string) => void;
  updateRules: (newRules: Rule[]) => void;
  generateDescription: (title: string, author: string) => Promise<string>;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [rules, setRules] = useState<Rule[]>(INITIAL_RULES);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
  };

  const addBook = (book: Omit<Book, 'id' | 'isAvailable'>) => {
    const newBook: Book = {
      ...book,
      id: Date.now().toString(),
      isAvailable: true,
    };
    setBooks(prev => [newBook, ...prev]);
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };
  
  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent: Student = {
        ...student,
        id: Date.now().toString(),
    };
    setStudents(prev => [newStudent, ...prev]);
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const addNotice = (notice: Omit<Notice, 'id'>) => {
    const newNotice: Notice = {
        ...notice,
        id: Date.now().toString(),
    };
    setNotices(prev => [newNotice, ...prev]);
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
  };
  
  const updateRules = (newRules: Rule[]) => {
      setRules(newRules);
  };

  const generateDescription = async (title: string, author: string): Promise<string> => {
    try {
        return await generateBookDescription(title, author);
    } catch (error) {
        console.error("Failed to generate description:", error);
        return "Error generating description. Please try again or enter one manually.";
    }
  };


  return (
    <LibraryContext.Provider value={{ 
        books, students, notices, rules, searchTerm, setSearchTerm, 
        isAdminAuthenticated, login, logout,
        addBook, deleteBook, addStudent, deleteStudent, addNotice, deleteNotice,
        updateRules, generateDescription
    }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = (): LibraryContextType => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
