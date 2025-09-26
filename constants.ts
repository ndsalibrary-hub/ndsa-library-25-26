
import type { Book, Notice, Rule, Student } from './types';

export const ADMIN_PASSWORD = 'admin';

export const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    category: 'Fantasy',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    coverImage: 'https://picsum.photos/id/10/400/600',
    isAvailable: true,
    featured: true,
  },
  {
    id: '2',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    category: 'Sci-Fi',
    description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.',
    coverImage: 'https://picsum.photos/id/20/400/600',
    isAvailable: false,
    featured: true,
  },
  {
    id: '3',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    category: 'Dystopian',
    description: 'A story of Klara, an Artificial Friend with outstanding observational qualities, who, from her place in the store, watches carefully the behavior of those who come in to browse.',
    coverImage: 'https://picsum.photos/id/30/400/600',
    isAvailable: true,
    featured: true,
  },
  {
    id: '4',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-Help',
    description: 'An easy and proven way to build good habits and break bad ones. Tiny changes, remarkable results.',
    coverImage: 'https://picsum.photos/id/40/400/600',
    isAvailable: true,
  },
   {
    id: '5',
    title: 'Dune',
    author: 'Frank Herbert',
    category: 'Sci-Fi',
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange.',
    coverImage: 'https://picsum.photos/id/50/400/600',
    isAvailable: false,
  },
  {
    id: '6',
    title: 'Educated: A Memoir',
    author: 'Tara Westover',
    category: 'Memoir',
    description: 'A memoir about a young woman who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
    coverImage: 'https://picsum.photos/id/60/400/600',
    isAvailable: true,
    featured: true,
  },
];

export const INITIAL_STUDENTS: Student[] = [
    { id: 's1', name: 'Alice Johnson', studentId: 'STU001' },
    { id: 's2', name: 'Bob Smith', studentId: 'STU002' },
];

export const INITIAL_NOTICES: Notice[] = [
  { id: 'n1', title: 'Library Closure for Holidays', content: 'The library will be closed from Dec 24th to Jan 2nd for the holiday season.', date: '2024-12-15' },
  { id: 'n2', title: 'New Book Arrivals - Sci-Fi Section', content: 'Check out the new collection of Sci-Fi books available from this week.', date: '2024-12-10' },
];

export const INITIAL_RULES: Rule[] = [
    { id: 'r1', text: 'Maintain silence inside the library premises.' },
    { id: 'r2', text: 'No food or drinks are allowed near the reading areas.' },
    { id: 'r3', text: 'Return books on or before the due date to avoid fines.' },
    { id: 'r4', text: 'Handle books and library property with care.' },
];
