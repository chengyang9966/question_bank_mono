import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import pick from '../utils/pick';
import Joi from 'joi';

/**
 * Middleware to validate request data against a Joi schema.
 *
 * @param {object} schema - Joi schema object to validate against.
 * @returns {Function} Middleware function to validate request.
 */
const validate = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
  // Pick only the 'params', 'query', and 'body' properties from the schema
  const validSchema = pick(schema, ['params', 'query', 'body']);

  // Pick the corresponding properties from the request object
  const obj = pick(req, Object.keys(validSchema));

  // Validate the request data against the schema
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(obj);

  // If validation fails, create an error message and pass it to the next middleware
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  // If validation succeeds, assign the validated values back to the request object
  Object.assign(req, value);

  // Proceed to the next middleware
  return next();
};

export default validate;
