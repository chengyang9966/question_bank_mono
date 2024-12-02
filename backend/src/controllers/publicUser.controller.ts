import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { publicUserService } from '../services';
import ApiError from '../utils/ApiError';
import pick from '../utils/pick';

const createPublicUser = catchAsync(async (req, res) => {
  const { email, name } = req.body;
  const user = await publicUserService.createPublicUser(email, name);
  res.status(httpStatus.CREATED).send(user);
});

const getPublicUser = catchAsync(async (req, res) => {
  const user = await publicUserService.getPublicUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const getPubicUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'email', 'id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await publicUserService.queryPublicUsers(filter, options);
  res.status(httpStatus.OK).send(result);
});
export default {
  createPublicUser,
  getPublicUser,
  getPubicUsers
};
