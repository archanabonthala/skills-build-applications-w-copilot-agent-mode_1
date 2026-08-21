import { Router } from 'express'

export function createResourceRouter(resource: string) {
  const router = Router()

  router.get('/', (_request, response) => {
    response.json({ resource, data: [] })
  })

  router.get('/:id', (request, response) => {
    response.json({ resource, id: request.params.id })
  })

  router.post('/', (request, response) => {
    response.status(201).json({ resource, data: request.body })
  })

  return router
}