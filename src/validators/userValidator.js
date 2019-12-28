import Joi from '@hapi/joi';

import validate from '../utils/validate';
import * as userService from '../services/userService';

// Validation schema
const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  first_name: Joi.string()
    .label('First Name')
    .max(90)
    .required(),
  last_name: Joi.string()
    .label('Last Name')
    .max(90)
    .required()
});

/**
 * Validate create/update user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function userValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate users existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findUser(req, res, next) {
  return userService
    .getUser(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findUser, userValidator };
