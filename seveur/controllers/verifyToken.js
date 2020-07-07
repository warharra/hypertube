const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization
  if (!authorization) {
    return res.status(403).json({ auth: false, msg: 'No token provided.' })
  }
  token = authorization.split(' ')[1]
  if (!token)
    return res.status(403).json({ auth: false, msg: 'No token provided.' })

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ auth: false, message: 'Failed to authenticate token.' })
    }
    req.userUuid = decoded._id

    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({
          err: 'Internal error - Db down',
        })
      } else {
        connection.query(
          'SELECT UserName FROM User WHERE  Uuid = ?',
          [req.userUuid],
          (err, result) => {
            if (err) {
              error.handleError(res, err, 'Internal error', 500, connection)
            } else {
              connection.release()
              res.userName = result[0].userName
            }
          },
        )
      }
    })
    next()
  })
}
