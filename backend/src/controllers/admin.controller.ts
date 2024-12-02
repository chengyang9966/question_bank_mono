import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { adminService } from '../services';
import pick from '../utils/pick';
import { generateFile } from '../helper/files.helper';

/**
 * Create Questions
 */
const createQuestions = catchAsync(async (req, res) => {
  const { questions } = req.body;
  const createdQuestion = await adminService.createQuestions(questions);
  res.status(httpStatus.CREATED).send(createdQuestion);
});

/**
 * Get All Questions
 */
const getAllQuestions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const questions = await adminService.getAllQuestions(filter, options);
  res.status(httpStatus.OK).send({
    data: questions
  });
});

/**
 * Get Questions by Id
 */
const getQuestionsById = catchAsync(async (req, res) => {
  const questions = await adminService.getQuestionsById(req.params.questionId);
  res.status(httpStatus.OK).send({
    data: questions
  });
});

/**
 * Update Questions Answers by Question Id
 */
const updateQuestionsAnswersByQuestionId = catchAsync(async (req, res) => {
  const { questions } = req.body;
  const updatedQuestions = await adminService.updateQuestionsAnswersByQuestionId(questions);
  res.status(httpStatus.OK).send({
    data: updatedQuestions
  });
});

/**
 * Get All Tagging
 */
const getAllTagging = catchAsync(async (req, res) => {
  const allTagging = await adminService.getAllTagging();
  res.status(httpStatus.OK).send({
    data: allTagging
  });
});

/**
 * Create Tagging
 */
const createTagging = catchAsync(async (req, res) => {
  const { tagging } = req.body;
  const questions = await adminService.createTagging(tagging);
  res.status(httpStatus.CREATED).send(questions);
});

/**
 * Get Questions by Tagging Id or Title
 */
const getQuestionsByTaggingIdOrTitle = catchAsync(async (req, res) => {
  const taggingId = req.query.taggingId as string | undefined;
  const searchText = req.query.searchText as string | undefined;
  if (taggingId) {
    const allTagging = await adminService.getQuestionsByTaggingId(taggingId);
    return res.status(httpStatus.OK).send({
      data: allTagging
    });
  }
  if (searchText) {
    const allTagging = await adminService.getQuestionsByTaggingTitle(searchText);
    return res.status(httpStatus.OK).send({
      data: allTagging
    });
  }
  return res.status(httpStatus.BAD_REQUEST).send({
    data: [],
    message: 'Please provide either taggingId or searchText'
  });
});

/**
 * Create Questions Reference
 */
const createQuestionsReference = catchAsync(async (req, res) => {
  const { questionIds, references } = req.body;
  const createReference = await adminService.createReference(questionIds, references);
  res.status(httpStatus.CREATED).send(createReference);
});

/**
 * Get References by Question Id
 */
const getReferencesByQuestionId = catchAsync(async (req, res) => {
  const questions = await adminService.getReferencesByQuestionId(req.params.questionId);
  res.status(httpStatus.OK).send({
    data: questions
  });
});

/*
 * Update Questions Reference
 */
const updateQuestionsReference = catchAsync(async (req, res) => {
  const { references } = req.body;
  const createReference = await adminService.updateQuestionsReference({
    questionId: req.params.questionId,
    references
  });
  res.status(httpStatus.CREATED).send(createReference);
});

/**
 * Get All References
 */
const getAllReferences = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['reference', 'sequence', 'questionId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  console.log('🚀 ~ getAllReferences ~ filter:', filter);
  const questions = await adminService.getAllReferences(filter, options);
  res.status(httpStatus.OK).send({
    data: questions
  });
});

/**
 * Upload File References
 */
const uploadFileReferences = catchAsync(async (req, res) => {
  const files = req.files as Express.Multer.File[];
  const { questionId } = req.body;
  const responseFiles = await generateFile(files, questionId);
  const createReference = await adminService.createReference(
    questionId,
    responseFiles.map((file, index) => {
      return {
        reference: file.destination,
        format: file.mimetype,
        sequence: index + 1
      };
    })
  );
  res.status(httpStatus.CREATED).send({
    data: createReference
  });
});

export default {
  createQuestions,
  getQuestionsById,
  getAllQuestions,
  createTagging,
  getAllTagging,
  createQuestionsReference,
  getReferencesByQuestionId,
  getAllReferences,
  updateQuestionsReference,
  uploadFileReferences,
  getQuestionsByTaggingIdOrTitle,
  updateQuestionsAnswersByQuestionId
};
