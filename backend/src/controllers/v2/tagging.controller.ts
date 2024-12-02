import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { taggingV2Service } from '../../services/v2';

/**
 * Get All Questions Tagging By Subject Id
 */
const getAllQuestionsTaggingBySubjectId = catchAsync(async (req, res) => {
  const { subjectId } = req.params;

  const allTagging = await taggingV2Service.getAllQuestionsTaggingBySubjectId(
    (subjectId as string) ?? '',
    (req.user?.id ?? '') as string
  );
  res.status(httpStatus.OK).send({
    data: allTagging
  });
});

export default {
  getAllQuestionsTaggingBySubjectId
};
