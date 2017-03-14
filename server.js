
const express = require('express')
const array = require('lodash/array')
const app = express()

const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = 3001

http.listen(port, () => {
  console.log(`API running on port ${port}`)
})

io.on('connection', (socket) => {
  console.log('Someone connected')
})

let stocks = [
  { symbol: '$AyyyMD', price: 14, change: 0, changePercent: 0 },
  { symbol: '$SNAPisBurning', price: 21, change: 0, changePercent: 0 },
  { symbol: '$GOOGLisKing', price: 32, change: 0, changePercent: 0 },
  { symbol: '$TSLAisCoolCars', price: 24, change: 0, changePercent: 0 },
  { symbol: '$DISownsSW', price: 11, change: 0, changePercent: 0 },
]
let tickNo = 0

setInterval(() => {
  tickNo = tickNo + 1
  let updateStocks = []
  for (let i = 0; i <= 2; i ++) {
    const pickedStock = Math.floor(Math.random() * stocks.length)
    const randFloat = (Math.random() * 10) - 5
    const change = Math.round(randFloat * 100) / 100 // Can lead to rounding errors, should be okay for this purpose
    stocks[pickedStock].price += change
    stocks[pickedStock].change = change
    stocks[pickedStock].changePercent = (change / stocks[pickedStock].price) * 100
    updateStocks.push({
      symbol: stocks[pickedStock].symbol,
      price: stocks[pickedStock].price + change,
      change,
      changePercent: (change/stocks[pickedStock].price) * 100,
      tickNo
     })
    updateStocks = array.uniqBy(updateStocks, 'symbol')
  }
  io.emit('message', updateStocks)
}, 500)
