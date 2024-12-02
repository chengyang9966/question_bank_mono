import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { adminV2Service } from '../../services/v2';
import { tokenService, userService } from '../../services';
import exclude from '../../utils/exclude';
import pick from '../../utils/pick';

/**
 * Get All Questions Tagging
 */
const getAllQuestionsTagging = catchAsync(async (req, res) => {
  const allTagging = await adminV2Service.getAllQuestionsTagging();
  res.status(httpStatus.OK).send({
    data: allTagging
  });
});

/**
 * Create Questions Tagging
 */
const createQuestionsTagging = catchAsync(async (req, res) => {
  const { tagging } = req.body;
  const allTagging = await adminV2Service.createQuestionTagging(tagging);
  res.status(httpStatus.CREATED).send(allTagging);
});

/**
 * Register Admin
 */
const registerAdmin = catchAsync(async (req, res) => {
  const { email, password, name } = req.body;
  const user = await userService.createUser(email, password, name, 'ADMIN');
  const userWithoutPassword = exclude(user, ['password', 'createdAt', 'updatedAt']);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user: userWithoutPassword, tokens });
});

/**
 * Create Questions Reference
 */
const createQuestionsReference = catchAsync(async (req, res) => {
  const { questionIds, references } = req.body;
  const createReference = await adminV2Service.createReference(questionIds, references);
  res.status(httpStatus.CREATED).send(createReference);
});

/**
 * Get Questions Reference
 */
const getAllQuestionsReference = catchAsync(async (req, res) => {
  const createReference = await adminV2Service.getAllReferences();
  res.status(httpStatus.OK).send({
    data: createReference
  });
});
/**
 * Create Questions
 */
const createQuestions = catchAsync(async (req, res) => {
  const { questions, SubjectId } = req.body;
  const createdQuestion = await adminV2Service.createQuestions(questions, SubjectId);
  res.status(httpStatus.CREATED).send(createdQuestion);
});

/**
 * Get All Questions
 */
const getAllQuestions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const questions = await adminV2Service.getAllQuestions(filter, options);
  res.status(httpStatus.OK).send({
    data: questions
  });
});

export default {
  getAllQuestionsTagging,
  registerAdmin,
  createQuestionsTagging,
  createQuestionsReference,
  getAllQuestionsReference,
  createQuestions,
  getAllQuestions
};
