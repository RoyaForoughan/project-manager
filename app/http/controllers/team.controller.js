//const { default: autoBind } = require('auto-bind')
const { TeamModel } = require('../../models/team')
const { UserModel } = require('../../models/user')
//import autobind = require("autobind-decorator");
const autoBind = (...args) =>
  import('auto-bind').then(({ default: autoBind }) => autoBind(...args))

class TeamController {
  constructor() {
    autoBind(this)
  }
  async createTeam(req, res, next) {
    try {
      const { name, description, username } = req.body
      const owner = req.user._id
      const team = await TeamModel.create({
        name,
        description,
        username,
        owner,
      })
      if (!team) throw { status: 500, message: 'ایجاد تیم با مشکل مواجه شد' }
      return res.status(200).json({
        status: 200,
        success: true,
        message: 'ایجاد تیم با موفقیت انجام شد ',
      })
    } catch (error) {
      next(error)
    }
  }
  async getListOfTeam(req, res, next) {
    try {
      const teams = await TeamModel.find({})
      return res.status(200).json({
        status: 200,
        success: true,
        teams,
      })
    } catch (error) {
      next(error)
    }
  }
  async getTeamById(req, res, next) {
    try {
      const teamID = req.params.id
      const team = await TeamModel.findById(teamID)
      if (!team) throw { status: 404, message: 'تیمی یافت نشد' }
      return res.status(200).json({
        status: 200,
        success: true,
        team,
      })
    } catch (error) {
      next(error)
    }
  }
  async getMyTeams(req, res, next) {
    try {
      const userID = req.user._id
      const teams = await TeamModel.aggregate([
        {
          $match: {
            $or: [{ owner: userID }, { users: userID }],
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'owner',
            foreignField: '_id',
            as: 'owner',
          },
        },
        {
          $project: {
            'owner.roles': 0,
            'owner.password': 0,
            'owner.token': 0,
            'owner.teams': 0,
            'owner.skills': 0,
            'owner.inviteRequests': 0,
          },
        },
        {
          $unwind: '$owner',
        },
      ])
      return res.status(200).json({
        status: 200,
        success: true,
        teams,
      })
    } catch (error) {
      next(error)
    }
  }

  async removeTeamById(req, res, next) {
    try {
      const teamID = req.params.id
      const team = await TeamModel.findById(teamID)
      if (!team) throw { status: 404, message: 'تیمی یافت نشد' }
      const result = await TeamModel.deleteOne({ _id: teamID })
      if (result.deletedCount == 0)
        throw { status: 500, message: 'حذف تیم انجام نشد مجددا تلاش کنید' }
      return res.status(200).json({
        status: 200,
        success: true,
        message: 'حذف تیم با موفقیت انجام شد',
      })
    } catch (error) {
      next(error)
    }
  }
  async findUserInTeam(teamID, userID) {
    const result = await TeamModel.findOne({
      $or: [{ owner: userID }, { users: userID }],
      _id: teamID,
    })
    return !!result
  }
  async inviteUserToTeam(req, res, next) {
    try {
      const userID = req.user._id
      const { teamID, username } = req.params
      //const team = await findUserInTeam(teamID, userID)
      const team = await TeamModel.findOne({
        $or: [{ owner: userID }, { users: userID }],
        _id: teamID,
      })
      if (!team) throw { status: 400, message: 'تیمی جهت دعوت کردن یافت نشد' }
      const user = await UserModel.findOne({ username })
      if (!user)
        throw {
          status: 400,
          message: 'کاربر مورد نظر جهت دعوت به تیم یافت نشد',
        }
      //const userInvited = await this.findUserInTeam(teamID, user._id)
      const userInvited = await TeamModel.findOne({
        $or: [{ owner: user._id }, { users: user._id }],
        _id: teamID,
      })
      if (userInvited)
        throw {
          status: 400,
          message: 'کاربر مورد نظر قبلا به تیم دعوت شده است',
        }
      const requests = {
        caller: req.user.username,
        requestDate: new Date(),
        teamID,
        status: 'pending',
      }
      const updateUserResult = await UserModel.updateOne(
        { username: username },
        {
          $push: { inviteRequests: requests },
        }
      )
      if (updateUserResult.modifiedCount == 0)
        throw { status: 500, message: 'ثبت درخواست دعوت ثبت نشد' }
      return res.status(200).json({
        status: 200,
        success: true,
        message: 'ثبت درخواست با موفقیت انجام شد',
      })
    } catch (error) {
      next(error)
    }
  }
  async updateTeam(req, res, next) {
    try {
      const data = { ...req.body }
      Object.keys(data).forEach((key) => {
        if (!data[key]) delete data[key]
        if (['', ' ', NaN, null, undefined, 0].includes(data[key]))
          delete data[key]
      })
      const userID = req.user._id
      const { teamID } = req.params
      const team = await TeamModel.findOne({ owner: userID, _id: teamID })
      if (!team) throw { status: 404, message: 'تیمی با این مشخصات یافت نشد' }
      const teamEditResult = await TeamModel.updateOne(
        { _id: teamID },
        { $set: data }
      )
      if (teamEditResult.modifiedCount == 0)
        throw { status: 500, message: 'بروزرسانی مشخصات تیم انجام نشد' }
      return res.status(200).json({
        status: 200,
        success: true,
        message: 'بروزرسانی با موفقیت انجام شد',
      })
    } catch (error) {
      next(error)
    }
  }
  removeUserfromTeam() {}
}

module.exports = {
  TeamController: new TeamController(),
}
