import multer from '@koa/multer'
import Router from '@koa/router'
import { diskStorage } from 'multer'

const router = new Router()
const upload = multer({
	storage: diskStorage({
		destination: './uploads',
		filename: (req, file, cb) => {
			cb(null, file.originalname);
		},
	}),
})

router.post('/signatureUpload', upload.single('file'), (ctx) => {
  console.log(ctx)
	console.log(ctx.request.file);
	console.log(ctx.request.body);
  ctx.body = { message: 'Upload successful!'};
})

export const multerUpload = (app) => {
  app.use(router.routes())
  app.use(router.allowedMethods())
}
