import './style.css'
import { byCategory, search, categories, sortByPrice } from './catalog.js'

const state = {
  status: 'loading', // 'loading' | 'error' | 'ready'
  error: null,
  items: [],
  query: '',
  category: '',
  sortDir: 'desc',
  selectedId: null,
}

async function load() {
  state.status = 'loading'
  render()
  try {
    const res = await fetch('/items.json')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const items = await res.json()
    state.items = items
    state.status = 'ready'
  } catch (err) {
    state.error = err.message
    state.status = 'error'
  } finally {
    render()
  }
}

function render() {
  const app = document.querySelector('#app') // vamos usar isto só se precisarmos

  renderCategoryOptions()
  renderList()
  renderDetail()
}

function renderCategoryOptions() {
  const select = document.querySelector('#category')
  const current = select.value
  select.innerHTML = '' // aqui é seguro, não há dados do utilizador

  const optAll = document.createElement('option')
  optAll.value = ''
  optAll.textContent = 'Todas as categorias'
  select.appendChild(optAll)

  for (const cat of categories(state.items)) {
    const opt = document.createElement('option')
    opt.value = cat
    opt.textContent = cat
    select.appendChild(opt)
  }
  select.value = current
}

function getVisibleItems() {
  let list = state.items
  if (state.category) list = byCategory(list, state.category)
  if (state.query) list = search(list, state.query)
  list = sortByPrice(list, state.sortDir)
  return list
}

function renderList() {
  const ul = document.querySelector('#list')
  ul.innerHTML = '' // seguro, vamos reconstruir tudo a seguir

  if (state.status === 'loading') {
    const li = document.createElement('li')
    li.textContent = 'A carregar…'
    ul.appendChild(li)
    return
  }

  if (state.status === 'error') {
    const li = document.createElement('li')
    li.textContent = `Erro: ${state.error}`
    ul.appendChild(li)
    return
  }

  const items = getVisibleItems()
  for (const item of items) {
    const li = document.createElement('li')
    li.textContent = `${item.name} — ${item.price}€`
    li.addEventListener('click', () => {
      state.selectedId = item.id
      render()
    })
    ul.appendChild(li)
  }
}

function renderDetail() {
  const section = document.querySelector('#detail')
  section.innerHTML = '' // seguro, reconstruímos a seguir

  const item = state.items.find((i) => i.id === state.selectedId)
  if (!item) return

  const h2 = document.createElement('h2')
  h2.textContent = item.name

  const price = document.createElement('p')
  price.textContent = `Preço: ${item.price}€`

  const tags = document.createElement('p')
  tags.textContent = `Tags: ${item.tags.join(', ')}`

  const author = document.createElement('p')
  author.textContent = `Autor: ${item.author.name} (${item.author.country})`

  section.append(h2, price, tags, author)
}

document.querySelector('#search').addEventListener('input', (e) => {
  state.query = e.target.value
  render()
})

document.querySelector('#category').addEventListener('change', (e) => {
  state.category = e.target.value
  render()
})

document.querySelector('#sort').addEventListener('click', () => {
  state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc'
  render()
})

load()
