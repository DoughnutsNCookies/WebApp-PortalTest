import { app } from './app.js'
import { logger } from './logger.js'

const port = app.get('port')
const host = app.get('host')

process.on('unhandledRejection', (reason) => logger.error('Unhandled Rejection %O', reason))

const LCYAN = '\x1b[96m'
const RESET = '\x1b[0m'

app.listen(port).then(() => {
  logger.info(LCYAN + `Feathers app listening on http://${host}:${port}` + RESET)
})
