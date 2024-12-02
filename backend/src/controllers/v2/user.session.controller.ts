import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { userSessionV2 } from '../../services/v2';

const createUserSessionByUserId = catchAsync(async (req, res) => {
  const { questionsTaggingId, numberOfQuestions, mcq, difficulty } = req.body;
  const userSession = await userSessionV2.createUserSessionByUserId(req.params.userId, {
    questionsTaggingId,
    numberOfQuestions,
    mcq,
    difficulty
  });
  res.status(httpStatus.CREATED).send(userSession);
});

const getUserSessionByUserId = catchAsync(async (req, res) => {
  const userSession = await userSessionV2.getUserSessionByUserId(req.params.userId);
  res.status(httpStatus.OK).send({
    data: userSession || []
  });
});
const putUserSessionByUserId = catchAsync(async (req, res) => {
  const userSession = await userSessionV2.answerSessionQuestion({
    ...req.body,
    userId: req.params.userId
  });
  res.status(httpStatus.OK).send({
    data: userSession || []
  });
});

export default {
  createUserSessionByUserId,
  putUserSessionByUserId,
  //   createQuestionsForPublicUserSessionBySessionId,
  //   createAnswerBySessionId,
  getUserSessionByUserId
};
