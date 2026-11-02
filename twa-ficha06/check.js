import assert from 'node:assert/strict'
import { items } from './src/data.js'
import { byCategory, search, total, top, categories, withDiscount, sortByPrice } from './src/catalog.js'

// byCategory
assert.equal(byCategory(items, 'fantasy').length, 5)

// search (nome ou tags, case-insensitive)
assert.equal(search(items, 'HARRY').length, 1)

// total
assert.equal(total(items), items.reduce((s, i) => s + i.price, 0))

// top
assert.deepEqual(
  top(items, 2).map((i) => i.id),
  [...items].sort((a, b) => b.price - a.price).slice(0, 2).map((i) => i.id),
)

// categories (únicas e ordenadas)
const cats = categories(items)
assert.deepEqual(cats, [...cats].sort())
assert.equal(new Set(cats).size, cats.length)

// withDiscount (não deve alterar o original)
const originalFirstPrice = items[0].price
withDiscount(items, 10)
assert.equal(items[0].price, originalFirstPrice)

// sortByPrice (ordem correta e não altera o original)
const originalOrder = items.map((i) => i.id)
const asc = sortByPrice(items, 'asc')
assert.deepEqual(
  asc.map((i) => i.price),
  [...asc.map((i) => i.price)].sort((a, b) => a - b),
)
const desc = sortByPrice(items, 'desc')
assert.deepEqual(
  desc.map((i) => i.price),
  [...desc.map((i) => i.price)].sort((a, b) => b - a),
)
assert.deepEqual(items.map((i) => i.id), originalOrder)