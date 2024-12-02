export interface QuestionSessionAnswerResponse {
  questionStatistic: {
    totalAttempts: number;
    isCorrect: number;
  };
  answerStatistic: Record<string, number>;
  correctAnswer: Array<{ id: string; text: string }>;
}
