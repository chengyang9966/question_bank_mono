import Joi from 'joi';
import { password } from './custom.validation';

const register = {
  body: Joi.object().keys({
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().required().custom(password),
    name: Joi.string().trim().optional()
  })
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().trim().required(),
    password: Joi.string().trim().required()
  })
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().trim().required()
  })
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().trim().required()
  })
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().trim().email().required()
  })
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().trim().required()
  }),
  body: Joi.object().keys({
    password: Joi.string().trim().required().custom(password)
  })
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().trim().required()
  })
};

const sendVerificationEmail = {
  body: Joi.object().keys({
    email: Joi.string().trim().required()
  })
};

export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sendVerificationEmail
};
