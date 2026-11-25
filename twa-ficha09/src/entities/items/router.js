import { Router } from 'express'
import { search } from '../../catalog.js'
import { notFound } from '../../errors.js'
import { validate } from '../../validate.js'
import { items, nextId, indexOf } from './data.js'
import { itemSchema, itemPatchSchema, listQuerySchema } from './schema.js'

const router = Router()

router.get('/', (req, res) => {
  const { q, page, limit } = listQuerySchema.parse(req.query)
  const list = q ? search(items, q) : items

  if (page === undefined && limit === undefined) {
    return res.json(list)
  }

  const currentPage = page ?? 1
  const pageSize = limit ?? 20
  const pages = Math.max(1, Math.ceil(list.length / pageSize))

  if (currentPage > pages) {
    throw notFound(`page ${currentPage} of ${pages}`)
  }

  const start = (currentPage - 1) * pageSize
  res.json({
    count: list.length,
    page: currentPage,
    pages,
    results: list.slice(start, start + pageSize),
  })
})

router.get('/:id', (req, res) => {
  res.json(items[indexOf(req.params.id)])
})

router.post('/', validate(itemSchema), (req, res) => {
  const item = { ...req.body, id: nextId() }
  items.push(item)
  res.status(201).location(`/api/items/${item.id}`).json(item)
})

router.put('/:id', validate(itemSchema), (req, res) => {
  const i = indexOf(req.params.id)
  items[i] = { ...req.body, id: items[i].id }
  res.json(items[i])
})

router.patch('/:id', validate(itemPatchSchema), (req, res) => {
  const i = indexOf(req.params.id)
  items[i] = { ...items[i], ...req.body }
  res.json(items[i])
})

router.delete('/:id', (req, res) => {
  items.splice(indexOf(req.params.id), 1)
  res.status(204).end()
})

export default router