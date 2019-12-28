import jwt from 'jsonwebtoken';

/**
 * Get all users.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function login(req, res, next) {
  console.log('foo');
  const user = req.user.id;
  const secret = process.env.JWT_SECRET;

  const payload = {
    userId: user,
    expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS)
  };

  const token = jwt.sign(payload, secret);

  res.cookie('jwt', token, { httpOnly: true, secure: true });
  res.status(200).send({ user: req.user });
}
