const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
function hashString(str) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(str, salt)
}

function tokenGenerator(payload) {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '365 days',
  })
  return token
}

function verifyJwtToken(token) {
  const result = jwt.verify(token, process.env.SECRET_KEY)
  if (!result?.username)
    throw { status: 401, message: 'لطفا وارد حساب کاربری خود شوید!' }
  return result
}

function createUploadPath() {
  let d = new Date()
  const Year = '' + d.getFullYear()
  const Month = '' + d.getMonth()
  const Day = '' + d.getDate()
  const uploadPath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'upload',
    Year,
    Month,
    Day
  )
  fs.mkdirSync(uploadPath, { recursive: true })
  return path.join('public', 'upload', Year, Month, Day)
}

function createLinkForFile(fileAddress, req) {
  return fileAddress
    ? req.protocol +
        '://' +
        req.get('host') +
        '/' +
        fileAddress.replace(/[\\\\]/gm, '/')
    : undefined
}

module.exports = {
  hashString,
  createLinkForFile,
  tokenGenerator,
  verifyJwtToken,
  createUploadPath,
}
