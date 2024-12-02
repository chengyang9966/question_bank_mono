import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { publicUserSessionService } from '../services';

const createPublicUserSessionByUserId = catchAsync(async (req, res) => {
  const publicUserSession = await publicUserSessionService.createPublicUserSessionByUserId(
    req.params.userId
  );
  res.status(httpStatus.CREATED).send(publicUserSession);
});
const createQuestionsForPublicUserSessionBySessionId = catchAsync(async (req, res) => {
  const { sessionId, questionsTaggingId, numberOfQuestions, mcq, difficulty } = req.body;
  const questionsByTagging = await publicUserSessionService.generateQuestionsForPublicUserSession(
    sessionId,
    questionsTaggingId,
    numberOfQuestions,
    mcq,
    difficulty
  );
  res.status(httpStatus.CREATED).send(questionsByTagging);
});

const createAnswerBySessionId = catchAsync(async (req, res) => {
  const { questionId, answerIds } = req.body;
  const createAnswerBySessionId =
    await publicUserSessionService.createPublicSessionUserIdWithAnswer(
      req.params.sessionId,
      questionId,
      answerIds
    );
  res.status(httpStatus.CREATED).send(createAnswerBySessionId);
});

const getPublicUserSessionByUserId = catchAsync(async (req, res) => {
  const publicUserSession = await publicUserSessionService.getPublicUserSessionById(
    req.params.sessionId
  );
  res.status(httpStatus.OK).send(publicUserSession);
});

export default {
  createPublicUserSessionByUserId,
  createQuestionsForPublicUserSessionBySessionId,
  createAnswerBySessionId,
  getPublicUserSessionByUserId
};
