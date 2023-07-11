const { UserModel } = require('../../models/user')
const { createLinkForFile } = require('../../modules/function')

class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user
      user.profile_image = createLinkForFile(user.profile_image, req)
      return res.status(200).json({
        status: 200,
        success: true,
        user,
      })
    } catch (error) {
      next(error)
    }
  }
  async editProfile(req, res, next) {
    try {
      let data = { ...req.body }
      const userID = req.user._id
      let feilds = ['first_name', 'last_name', 'skills']
      let badValues = ['', ' ', null, undefined, 0, NaN, -1, {}, []]
      Object.entries(data).forEach(([key, value]) => {
        console.log(key, value)
        if (!feilds.includes(key)) delete data[key]
        if (badValues.includes(value)) delete data[key]
      })
      console.log(data)
      const result = await UserModel.updateOne({ _id: userID }, { $set: data })
      if (result.modifiedCount > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: 'بروزرسانی با موفقیت انجام شد',
        })
      }
      throw { status: 400, message: 'بروزرسانی انجام نشد' }
    } catch (error) {
      next(error)
    }
  }

  async uploadProfileImage(req, res, next) {
    try {
      const userID = req.user._id
      const filePath = req.file?.path.substring(7)
      const result = await UserModel.updateOne(
        { _id: userID },
        { $set: { profile_image: filePath } }
      )
      if (result.modifiedCount == 0)
        throw { status: 400, message: 'بروزرسانی انجام نشد' }
      return res.status(200).json({
        status: 200,
        success: true,
        message: 'بروز رسانی با موفقیت انجام شد',
      })
    } catch (error) {
      next(error)
    }
  }
  addSkills() {}
  editSkills() {}
  acceptInvitInTeam() {}
  rejectInvitInTeam() {}
}

module.exports = {
  UserController: new UserController(),
}
