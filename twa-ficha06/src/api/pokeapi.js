import { getJSON } from './getJSON.js'

const BASE = 'https://pokeapi.co/api/v2'
export const PAGE = 20

// a página pede "a página 3"; este ficheiro traduz para offset/limit
export const list = (page = 1) =>
  getJSON(`${BASE}/pokemon?limit=${PAGE}&offset=${(page - 1) * PAGE}`) // → { count, results: [{ name, url }] }

export const get = (name) => getJSON(`${BASE}/pokemon/${name}`)