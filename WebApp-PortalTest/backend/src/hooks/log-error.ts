// For more information about this file see https://dove.feathersjs.com/guides/cli/log-error.html
import type { HookContext, NextFunction } from '../declarations'
import { logger } from '../logger'

const showError = false

export const logError = async (context: HookContext, next: NextFunction) => {
  try {
    await next()
  } catch (error: any) {
    if (showError) logger.error(error.stack)

    // Log validation errors
    if (error.data && showError) {
      logger.error('Data: %O', error.data)
    }

    throw error
  }
}
