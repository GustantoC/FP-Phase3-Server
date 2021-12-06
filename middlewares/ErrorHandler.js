function ErrorHandler(err, req, res, next) {
  switch (err.name) {
    case 'SequelizeValidationError':
      err.message = err.message.split(',\n')[0].split(': ')[1]
    case 'SequelizeUniqueConstraintError':
    case '400':
      err.message = err.message || 'Bad request'
      res.status(400).json({ message: err.message })
      break;
    case 'JsonWebTokenError':
      err.message = 'Token Invalid'
    case '401':
      err.message = err.message || 'Token Invalid'
      res.status(401).json({ message: err.message })
      break;
    case '403':
      err.message = err.message || 'You can\'t access this'
      res.status(403).json({ message: err.message })
      break;
    case '404':
      err.message = err.message || 'Data not Found'
      res.status(404).json({ message: err.message })
      break;
    default:
      res.status(500).json({ message: 'Internal Server Error' })
      break;
  }
}


module.exports = ErrorHandler;