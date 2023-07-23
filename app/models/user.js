const mongoose = require('mongoose')
const inviteRequests = new mongoose.Schema({
  teamID: { type: mongoose.Types.ObjectId, required: true },
  caller: { type: String, required: true, lowercase: true },
  requestDate: { type: Date, default: new Date() },
  status: { type: String, default: 'accepted' },
})
const UserSchima = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    roles: { type: [String], default: ['USER'] },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_image: { type: String, required: false },
    teams: { type: [mongoose.Types.ObjectId], default: [] },
    skills: { type: [String], default: [] },
    token: { type: String, default: '' },
    inviteRequests: { type: [inviteRequests] },
  },
  {
    timestamps: true,
  }
)

const UserModel = mongoose.model('user', UserSchima)

module.exports = {
  UserModel,
}
