import { writeFile } from 'node:fs/promises'
import { items } from './data.js'
import { byCategory, search, top, total, categories } from './catalog.js'

const [cmd, arg] = process.argv.slice(2)

function printList(list) {
  list.forEach((item) => {
    console.log(`${item.id} · ${item.name} (${item.category}) - ${item.price}€`)
  })
}

if (!cmd) {
  // node app.js -> lista tudo
  printList(items)
} else if (cmd === 'search') {
  // node app.js search clean -> pesquisa
  printList(search(items, arg))
} else if (cmd === 'top') {
  // node app.js top 3 -> os n mais caros
  printList(top(items, Number(arg)))
} else if (cmd === 'report') {
  // node app.js report -> escreve report.json
  const report = {
    count: items.length,
    total: total(items),
    categories: categories(items),
    top3: top(items, 3).map((item) => item.name),
  }
  await writeFile('report.json', JSON.stringify(report, null, 2))
  console.log('report.json criado')
} else {
  // node app.js book -> trata o argumento como categoria
  printList(byCategory(items, cmd))
}