import { GeneralError } from '@feathersjs/errors'
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

router.post('/upload', upload.fields([
	{ name: 'icfront', maxCount: 1 },
	{ name: 'icback', maxCount: 1 },
	{ name: 'signature', maxCount: 1 },
	{ name: 'id', maxCount: 1 },
]), async (ctx) => {
	const { id } = ctx.request.body;
	const uploadService = ctx.app.service('signature');

	const data = {
		formId: id,
		icfront: id + "-icfront.png",
		icback: id + "-icback.png",
		signature: id + "-signature.png",
	}
	try {
    const savedData = await uploadService.create(data, ctx.params);
    ctx.body = { savedData: savedData };
  } catch (error) {
		throw new GeneralError('Error saving data:', error);
  }
})

export const multerUpload = (app) => {
  app.use(router.routes())
  app.use(router.allowedMethods())
}
