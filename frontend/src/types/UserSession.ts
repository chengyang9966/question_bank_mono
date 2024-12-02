export interface UserSessionResponse {
  id: string;
  userId: string;
  status: string;
  expiresAt: string;
  createdAt: string;
  UserSessionSummary: UserSessionSummary[];
  SessionQuestion: SessionQuestion[];
}

export interface UserSessionSummary {
  correctAnswer: number;
  score: number;
  totalQuestions: number;
}

export interface SessionQuestion {
  question: Question;
  userAnswer: UserAnswer[];
}

export interface Question {
  id: string;
  text: string;
  description: string;
  difficulty: number;
  isMultipleChoice: boolean;
  isPublic: boolean;
  TaggingQuestions: TaggingQuestion[];
  Answer: Answer[];
  Reference: Reference[];
}

export interface TaggingQuestion {
  id: string;
  tag: string;
}

export interface Answer {
  id: string;
  text: string;
  sequence: number;
  isCorrect?: boolean;
}

export interface UserAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Reference {
  id: string;
  description: string;
  sequence: number;
}
