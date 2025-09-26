
import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import type { Book, Student, Notice, Rule } from '../types';
import { BookOpenIcon } from '../components/icons/BookOpenIcon';
import { UserGroupIcon } from '../components/icons/UserGroupIcon';
import { ClipboardListIcon } from '../components/icons/ClipboardListIcon';
import { ScaleIcon } from '../components/icons/ScaleIcon';

const AdminLogin: React.FC<{ onLogin: (password: string) => boolean }> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(password)) {
      setError('Invalid password.');
    } else {
      setError('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Admin Login</h2>
        <div className="mb-4">
          <label className="block text-slate-700 mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button type="submit" className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition-colors">
          Login
        </button>
      </form>
    </div>
  );
};

type AdminSection = 'books' | 'students' | 'notices' | 'rules';

const AdminPage: React.FC = () => {
  const { 
    isAdminAuthenticated, login, logout,
    books, addBook, deleteBook,
    students, addStudent, deleteStudent,
    notices, addNotice, deleteNotice,
    rules, updateRules, generateDescription
  } = useLibrary();
  
  const [activeSection, setActiveSection] = useState<AdminSection>('books');

  const [newBook, setNewBook] = useState({ title: '', author: '', category: '', description: '', coverImage: 'https://picsum.photos/400/600' });
  const [newStudent, setNewStudent] = useState({ name: '', studentId: '' });
  const [newNotice, setNewNotice] = useState({ title: '', content: '', date: new Date().toISOString().split('T')[0] });
  const [currentRules, setCurrentRules] = useState(rules.map(r => r.text).join('\n'));
  const [isGenerating, setIsGenerating] = useState(false);


  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newBook.title && newBook.author && newBook.category && newBook.description) {
      addBook(newBook);
      setNewBook({ title: '', author: '', category: '', description: '', coverImage: 'https://picsum.photos/400/600' });
    }
  };
  
  const handleGenerateDesc = async () => {
      if(!newBook.title || !newBook.author) {
          alert("Please enter a title and author first.");
          return;
      }
      setIsGenerating(true);
      const desc = await generateDescription(newBook.title, newBook.author);
      setNewBook(prev => ({ ...prev, description: desc }));
      setIsGenerating(false);
  }

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if(newStudent.name && newStudent.studentId) {
      addStudent(newStudent);
      setNewStudent({ name: '', studentId: '' });
    }
  };

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if(newNotice.title && newNotice.content){
      addNotice(newNotice);
      setNewNotice({ title: '', content: '', date: new Date().toISOString().split('T')[0] });
    }
  };

  const handleUpdateRules = (e: React.FormEvent) => {
    e.preventDefault();
    const ruleArray: Rule[] = currentRules.split('\n').filter(text => text.trim() !== '').map((text, index) => ({ id: `r${index+1}`, text }));
    updateRules(ruleArray);
    alert('Rules updated successfully!');
  };

  if (!isAdminAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }
  
  const renderSection = () => {
    switch(activeSection) {
      case 'books':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Add New Book</h3>
            <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-md">
              <input type="text" placeholder="Title" value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} className="p-2 border rounded" required/>
              <input type="text" placeholder="Author" value={newBook.author} onChange={e => setNewBook({...newBook, author: e.target.value})} className="p-2 border rounded" required/>
              <input type="text" placeholder="Category" value={newBook.category} onChange={e => setNewBook({...newBook, category: e.target.value})} className="p-2 border rounded" required/>
              <input type="text" placeholder="Cover Image URL" value={newBook.coverImage} onChange={e => setNewBook({...newBook, coverImage: e.target.value})} className="p-2 border rounded" required/>
              <textarea placeholder="Description" value={newBook.description} onChange={e => setNewBook({...newBook, description: e.target.value})} className="p-2 border rounded md:col-span-2 h-24" required/>
              <div className="md:col-span-2 flex items-center gap-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Book</button>
                <button type="button" onClick={handleGenerateDesc} disabled={isGenerating} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:bg-purple-300">
                    {isGenerating ? 'Generating...' : 'Generate Description with AI'}
                </button>
              </div>
            </form>
            <h3 className="text-xl font-semibold mt-8 mb-4">Manage Books</h3>
            <div className="space-y-2">
                {books.map(book => (
                    <div key={book.id} className="flex justify-between items-center p-2 bg-white rounded shadow-sm">
                        <span>{book.title} by {book.author}</span>
                        <button onClick={() => deleteBook(book.id)} className="text-red-500 hover:text-red-700">Delete</button>
                    </div>
                ))}
            </div>
          </div>
        );
      case 'students':
        return (
           <div>
            <h3 className="text-xl font-semibold mb-4">Add New Student</h3>
            <form onSubmit={handleAddStudent} className="flex gap-4 bg-slate-50 p-4 rounded-md">
                <input type="text" placeholder="Student Name" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="p-2 border rounded flex-grow" required />
                <input type="text" placeholder="Student ID" value={newStudent.studentId} onChange={e => setNewStudent({...newStudent, studentId: e.target.value})} className="p-2 border rounded" required />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Student</button>
            </form>
             <h3 className="text-xl font-semibold mt-8 mb-4">Manage Students</h3>
            <div className="space-y-2">
                {students.map(s => (
                    <div key={s.id} className="flex justify-between items-center p-2 bg-white rounded shadow-sm">
                        <span>{s.name} ({s.studentId})</span>
                        <button onClick={() => deleteStudent(s.id)} className="text-red-500 hover:text-red-700">Delete</button>
                    </div>
                ))}
            </div>
          </div>
        );
      case 'notices':
        return (
            <div>
                <h3 className="text-xl font-semibold mb-4">Add New Notice</h3>
                <form onSubmit={handleAddNotice} className="flex flex-col gap-4 bg-slate-50 p-4 rounded-md">
                    <input type="text" placeholder="Title" value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} className="p-2 border rounded" required />
                    <textarea placeholder="Content" value={newNotice.content} onChange={e => setNewNotice({...newNotice, content: e.target.value})} className="p-2 border rounded h-24" required />
                    <input type="date" value={newNotice.date} onChange={e => setNewNotice({...newNotice, date: e.target.value})} className="p-2 border rounded self-start" required />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-start">Add Notice</button>
                </form>
                <h3 className="text-xl font-semibold mt-8 mb-4">Manage Notices</h3>
                <div className="space-y-2">
                    {notices.map(n => (
                        <div key={n.id} className="flex justify-between items-center p-2 bg-white rounded shadow-sm">
                            <span>{n.title}</span>
                            <button onClick={() => deleteNotice(n.id)} className="text-red-500 hover:text-red-700">Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        );
      case 'rules':
         return (
             <div>
                <h3 className="text-xl font-semibold mb-4">Edit Rules</h3>
                <p className="text-sm text-slate-500 mb-2">Enter one rule per line.</p>
                <form onSubmit={handleUpdateRules}>
                    <textarea value={currentRules} onChange={e => setCurrentRules(e.target.value)} className="w-full p-2 border rounded h-64 font-mono"></textarea>
                    <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save Rules</button>
                </form>
            </div>
         );
      default: return null;
    }
  };

  const NavButton: React.FC<{ section: AdminSection; label: string; icon: React.ReactNode }> = ({ section, label, icon }) => (
    <button 
        onClick={() => setActiveSection(section)} 
        className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors w-full text-left ${activeSection === section ? 'bg-sky-600 text-white' : 'hover:bg-sky-100'}`}
    >
        {icon}
        <span>{label}</span>
    </button>
  );

  return (
    <div>
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Admin Panel</h1>
            <button onClick={logout} className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-600 transition-colors">Logout</button>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
            <aside className="md:w-1/4 lg:w-1/5">
                <nav className="space-y-2">
                    <NavButton section="books" label="Books" icon={<BookOpenIcon className="h-5 w-5" />} />
                    <NavButton section="students" label="Students" icon={<UserGroupIcon className="h-5 w-5" />} />
                    <NavButton section="notices" label="Notices" icon={<ClipboardListIcon className="h-5 w-5" />} />
                    <NavButton section="rules" label="Rules" icon={<ScaleIcon className="h-5 w-5" />} />
                </nav>
            </aside>
            <main className="flex-1 bg-white p-6 rounded-lg shadow-lg">
                {renderSection()}
            </main>
        </div>
    </div>
  );
};

export default AdminPage;
