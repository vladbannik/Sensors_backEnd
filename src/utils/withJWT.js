const jwt = require('jsonwebtoken');
const getToken = require('./getToken');

module.exports = (req, res, next) => {
  const token = getToken(req);
  if (!token) res.status(401).json({ error: { message: 'Token is required' } });
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    res.decoded = decoded;
  } catch (e) {
    res.status(401).json({ error: { message: 'Invalid token' } });
  }

  next();
};
