const { error } = require('../utils/index.js');

const json = {
  async loginCheck(req, res, next) {
    if (!req.session.is_logined) {
      res.redirect('/login');
      next(error(`먼저 로그인 해주세요`));
    }
  },
  async notFound(req, res, next) {
    next(error(`notFound`));
  },
  async result(data, req, res, next) {
    if (data instanceof Error) {
      if (!Number.isInteger(data.code)) next(data)
      else res.status(data.code).json({ message: data.message })
    } else {
      res.status(200).json({ ...data })
    }
  },
  async internalServerError(data, req, res, next) {
    if (!data) next(error(`internalServerError`))
    else {
      res.status(500).json({ message: data.message })
    }
  },
};

module.exports = { json };