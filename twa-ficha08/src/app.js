import express from 'express'
import itemsRouter from './items/router.js'

const app = express()

// 1º — corre em todos os pedidos
app.use((req, res, next) => {
  console.log(req.method, req.url)
  next() // passa ao seguinte; sem isto, o pedido fica pendurado
})

app.use(express.json()) // 2º — antes das rotas

app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date() })
})

app.use('/api/items', itemsRouter) // 3º

// último — só chega aqui o que ninguém respondeu
app.use((req, res) => res.status(404).json({ error: 'not found' }))

app.listen(3000, () => console.log('http://localhost:3000'))