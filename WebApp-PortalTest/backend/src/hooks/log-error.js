import { logger } from '../logger.js'

const showError = false

export const logError = async (context, next) => {
  try {
    await next()
  } catch (error) {
    if (showError) logger.error(error.stack)

    // Log validation errors
    if (error.data && showError) {
      logger.error('Data: %O', error.data)
    }

    throw error
  }
}
