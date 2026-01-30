const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

// In-memory data
let users = {
  1: { id: 1, name: 'Alice', coins: 100 }
}

let orders = {
  1: { id: 1, userId: 1, status: 'Paid', amount: 10 },
  2: { id: 2, userId: 1, status: 'Refund Reviewing', amount: 5 }
}

app.get('/api/orders', (req, res) => {
  res.json(Object.values(orders))
})

app.get('/api/orders/:id', (req, res) => {
  const o = orders[req.params.id]
  if (!o) return res.status(404).json({ error: 'Not found' })
  res.json(o)
})

app.post('/api/orders/:id/refund-request', (req, res) => {
  const o = orders[req.params.id]
  if (!o) return res.status(404).json({ error: 'Not found' })
  if (o.status !== 'Paid') return res.status(400).json({ error: 'Invalid status' })
  o.status = 'Refund Reviewing'
  res.json(o)
})

app.get('/admin/orders', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin_orders.html'))
})

app.post('/admin/api/orders/:id/pass-refund', (req, res) => {
  const o = orders[req.params.id]
  if (!o) return res.status(404).json({ error: 'Not found' })
  if (o.status !== 'Refund Reviewing') return res.status(400).json({ error: 'Invalid status' })
  o.status = 'Refund Passed'
  // refund coins
  const u = users[o.userId]
  if (u) u.coins += o.amount
  res.json({ order: o, user: u })
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/order/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'order.html'))
})

app.get('/api/users/:id', (req, res) => {
  const u = users[req.params.id]
  if (!u) return res.status(404).json({ error: 'Not found' })
  res.json(u)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server running on', port))
