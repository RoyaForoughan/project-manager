const { body } = require('express-validator')
const { TeamModel } = require('../../models/team')

function createTeamValidator() {
  return [
    body('name')
      .isLength({ min: 5 })
      .withMessage('نام تیم نمیتواد کمتر از 5 نویسه باشد'),
    body('description').notEmpty().withMessage('توضیحات نمیتواد خالی باشد'),
    body('username').custom(async (username) => {
      if (username) {
        const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
        if (usernameRegex.test(username)) {
          const team = await TeamModel.findOne({ username: username })
          if (team) throw 'این نام کاربری توسط تیم دیگری انتخاب شده است'
          return true
        }
      }
      throw 'نام کاربری را به صورت صحیح وارد کنید'
    }),
  ]
}

module.exports = {
  createTeamValidator,
}
