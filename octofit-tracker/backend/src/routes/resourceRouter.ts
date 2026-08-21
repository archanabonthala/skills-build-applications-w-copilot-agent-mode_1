import { Router } from 'express'
import type { Model } from 'mongoose'

export function createResourceRouter(resource: string, resourceModel: Model<unknown>) {
  const router = Router()

  router.get('/', async (_request, response, next) => {
    try {
      const data = await resourceModel.find().lean()
      response.json({ resource, data })
    } catch (error) {
      next(error)
    }
  })

  router.get('/:id', async (request, response, next) => {
    try {
      const data = await resourceModel.findById(request.params.id).lean()
      if (!data) {
        response.status(404).json({ error: `${resource} record not found` })
        return
      }
      response.json({ resource, data })
    } catch (error) {
      next(error)
    }
  })

  router.post('/', async (request, response, next) => {
    try {
      const data = await resourceModel.create(request.body)
      response.status(201).json({ resource, data })
    } catch (error) {
      next(error)
    }
  })

  return router
}