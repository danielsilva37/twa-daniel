import { z, ZodError } from 'zod'

export class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

export const notFound = (message = 'not found') => new HttpError(404, message)

export const fieldErrors = (error) =>
  Object.fromEntries(
    Object.entries(z.flattenError(error).fieldErrors)
      .map(([field, messages]) => [field, messages[0]]),
  )

export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({ errors: fieldErrors(err) })
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'invalid JSON body' })
  }

  const status = err.status ?? 500
  if (status >= 500) {
    console.error(err)
  }

  return res.status(status).json({
    error: status >= 500 ? 'internal error' : err.message,
  })
}