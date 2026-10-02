import assert from 'node:assert/strict'
import { items } from './data.js'
import { byCategory, search, total, top, categories, withDiscount } from './catalog.js'

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