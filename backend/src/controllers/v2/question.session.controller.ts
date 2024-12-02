import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { questionSessionV2Service } from '../../services/v2';

const getQuestionSessionBySessionId = catchAsync(async (req, res) => {
  const questionSession = await questionSessionV2Service.getQuestionSessionBySessionId(
    req.params.sessionId
  );
  res.status(httpStatus.OK).send({
    data: [questionSession]
  });
});

export default {
  getQuestionSessionBySessionId
};
