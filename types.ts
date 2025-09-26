
export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverImage: string;
  isAvailable: boolean;
  featured?: boolean;
}

export interface Student {
  id: string;
  name: string;
  studentId: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface Rule {
  id: string;
  text: string;
}
