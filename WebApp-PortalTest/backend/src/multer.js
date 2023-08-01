import { GeneralError } from '@feathersjs/errors'
import multer from '@koa/multer'
import Router from '@koa/router'
import { diskStorage } from 'multer'
import fs from 'fs'

const router = new Router()
const upload = multer({
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
})

router.post(
  '/upload',
  upload.fields([
    { name: 'icfront', maxCount: 1 },
    { name: 'icback', maxCount: 1 },
    { name: 'signature', maxCount: 1 },
    { name: 'formId', maxCount: 1 }
  ]),
  async (ctx) => {
    const { id, signature } = ctx.request.body
    for (const fileObj in ctx.request.files) {
      const file = ctx.request.files[fileObj][0]
      fs.rename(
        './uploads/' + file.originalname,
        './uploads/' + id + '-' + file.fieldname + '.png',
        (err) => {}
      )
    }

    const uploadService = ctx.app.service('signature')
    const data = {
      formId: id,
      icfront: id + '-icfront.png',
      icback: id + '-icback.png',
      signature: signature
    }
    try {
      const savedData = await uploadService.create(data, ctx.params)
      ctx.body = { savedData: savedData }
    } catch (error) {
      throw new GeneralError('Error saving data:', error)
    }
  }
)

export const multerUpload = (app) => {
  app.use(router.routes())
  app.use(router.allowedMethods())
}
