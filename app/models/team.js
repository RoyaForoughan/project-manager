const mongoose = require('mongoose')
const TeamSchima = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    username: { type: String, unique: true, required: true },
    users: { type: [mongoose.Types.ObjectId], default: [] },
    owner: { type: [mongoose.Types.ObjectId], required: true },
  },
  {
    timestamps: true,
  }
)

const TeamModel = mongoose.model('team', TeamSchima)

module.exports = {
  TeamModel,
}
