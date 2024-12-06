import httpStatus from 'http-status';
import { userFeedbackV2Service } from '../../services/v2';
import catchAsync from '../../utils/catchAsync';
import pick from '../../utils/pick';

/**
 *  Create feedback by question Id and user Id
 */

const createFeedbackByQuestionId = catchAsync(async (req, res) => {
  const feedback = await userFeedbackV2Service.createFeedbackByQuestionId(req.body);

  res.status(httpStatus.OK).send({
    data: feedback
  });
});

/**
 * Get feedback by user Id
 */
const getFeedbackByUserId = catchAsync(async (req, res) => {
  const feedback = await userFeedbackV2Service.getFeedbackByUserId(req.params.userId);

  res.status(httpStatus.OK).send({
    data: feedback
  });
});

/**
 * Get feedback by question Id
 */
const getFeedbacks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['questionId', 'userId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const feedback = await userFeedbackV2Service.getFeedbacks(filter, options);

  res.status(httpStatus.OK).send({
    data: feedback
  });
});

export default {
  createFeedbackByQuestionId,
  getFeedbackByUserId,
  getFeedbacks
};
