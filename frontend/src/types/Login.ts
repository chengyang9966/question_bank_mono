export interface LoginTypeResponse {
  user: User;
  tokens: Tokens;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  Subjects: Subject[];
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tokens {
  access: Access;
  refresh: Refresh;
}

export interface Access {
  token: string;
  expires: string;
}

export interface Refresh {
  token: string;
  expires: string;
}
