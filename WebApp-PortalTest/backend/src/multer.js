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
    const { formId, signature } = ctx.request.body
    for (const fileObj in ctx.request.files) {
      const file = ctx.request.files[fileObj][0]
      fs.rename(
        './uploads/' + file.originalname,
        './uploads/' + formId + '-' + file.fieldname + '.png',
        (err) => {}
      )
    }

    const signatureService = ctx.app.service('signature')
    const data = {
      formId: formId,
      icfront: formId + '-icfront.png',
      icback: formId + '-icback.png',
      signature: signature
    }
    try {
      const savedData = await signatureService.create(data, ctx.params)
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
