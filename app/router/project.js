const fileUpload = require('express-fileupload')
const { ProjectController } = require('../http/controllers/project.controller')
const { checkLogin } = require('../http/middlewares/autoLogin')
const { expressValidatorMapper } = require('../http/middlewares/checkErrors')
const { createProjectValidator } = require('../http/validations/project')
const { uploadFile } = require('../modules/express-fileupload')
const { mongoIDValodator } = require('../http/validations/public')

const router = require('express').Router()
router.post(
  '/create',
  fileUpload(),
  checkLogin,
  uploadFile,
  createProjectValidator(),
  expressValidatorMapper,
  ProjectController.createProject
)
router.get(
  '/list',
  checkLogin,
  ProjectController.getAllProject.bind(ProjectController)
)
router.get(
  '/:id',
  checkLogin,
  mongoIDValodator(),
  expressValidatorMapper,
  ProjectController.getProjectById.bind(ProjectController)
)
router.delete(
  '/remove/:id',
  checkLogin,
  mongoIDValodator(),
  expressValidatorMapper,
  ProjectController.removeProject.bind(ProjectController)
)
router.put(
  '/edit/:id',
  checkLogin,
  mongoIDValodator(),
  expressValidatorMapper,
  ProjectController.updateProject.bind(ProjectController)
)
router.patch(
  '/edit-projectImage/:id',
  fileUpload(),
  checkLogin,
  uploadFile,
  mongoIDValodator(),
  expressValidatorMapper,
  ProjectController.updateProjectImage.bind(ProjectController)
)
module.exports = {
  projectRoutes: router,
}
