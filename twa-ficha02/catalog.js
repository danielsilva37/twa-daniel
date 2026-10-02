export function byCategory(list, cat) {
  return list.filter((item) => item.category === cat)
}

export function search(list, text) {
  const q = text.toLowerCase()
  return list.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(q)
    const tagsMatch = item.tags.some((tag) => tag.toLowerCase().includes(q))
    return nameMatch || tagsMatch
  })
}

export function total(list) {
  return list.reduce((sum, item) => sum + item.price, 0)
}

export function top(list, n) {
  return [...list].sort((a, b) => b.price - a.price).slice(0, n)
}

export function categories(list) {
  const unique = [...new Set(list.map((item) => item.category))]
  return unique.sort()
}

export function withDiscount(list, pct) {
  return list.map((item) => ({
    ...item,
    price: item.price * (1 - pct / 100),
  }))
}