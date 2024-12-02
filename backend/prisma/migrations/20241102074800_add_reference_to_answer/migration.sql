-- AddForeignKey
ALTER TABLE "PublicUserAnswers" ADD CONSTRAINT "PublicUserAnswers_answer_fkey" FOREIGN KEY ("answer") REFERENCES "QuestionsAnswers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
