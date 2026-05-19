export interface Pillar {
  id: string;
  name: string;
  icon: string; // Lucide icon name string for mapping
  color: string;
  levels: number;
  description: string;
  challenges: string[];
}

export interface Comment {
  id: string;
  userName: string;
  text: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  comments?: Comment[];
}

export interface Message {
  role: 'user' | 'ai';
  content: string;
}
