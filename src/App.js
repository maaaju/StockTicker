import React, { Component } from 'react'
import array from 'lodash/array'
import collection from 'lodash/collection'
import io from 'socket.io-client'
import LineChart from './line_chart'

import TickerTable from './ticker_table'

const socket = io.connect(':3001')

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stocks: [
        { symbol: '$AyyyMD', price: 14, change: 0, changePercent: 0 },
        { symbol: '$SNAPisBurning', price: 21, change: 0, changePercent: 0 },
        { symbol: '$GOOGLisKing', price: 32, change: 0, changePercent: 0 },
        { symbol: '$TSLAisCoolCars', price: 24, change: 0, changePercent: 0 },
        { symbol: '$DISownsSW', price: 11, change: 0, changePercent: 0 },
      ],
      chartData: {
        labels: [0],
        datasets: [
          {label: '$AyyyMD', data: [14], borderColor: 'rgba(75,192,192,1)'},
          {label: '$SNAPisBurning', data: [21], borderColor: 'rgba(65,192,102,1)'},
          {label: '$GOOGLisKing', data: [32], borderColor: 'rgba(55,102,192,1)'},
          {label: '$TSLAisCoolCars', data: [24], borderColor: 'rgba(45,142,192,1)'},
          {label: '$DISownsSW', data: [11], borderColor: 'rgba(35,102,102,1)'
          },
        ]
      }
    }
  }

  componentDidMount() {
    socket.on('message', (updateStocks) => {
      // Creating a new object for the stocks in state
      const stateStocks = this.state.stocks
      const allStocks = updateStocks.concat(stateStocks)
      // Filtering so we send the updated prices along with the unchanged stocks,
      // Sorted to keeep the stocks from jumping on screen when changed
      const newStocks = collection.sortBy(array.uniqBy(allStocks, 'symbol'), (stock) => { return stock.symbol})

      // Creating the chartdata
      const latestsTick = updateStocks[0].tickNo
      const newTicks = this.state.chartData.labels
      newTicks.push(latestsTick)
      // Adding the new prices to the dataset
      const chartStocks = this.state.chartData.datasets
      let currentDataLength
      updateStocks.map((stock) => {
        chartStocks.forEach((dataLabel, index) => {
          if (stock.symbol === dataLabel.label) {
            chartStocks[index].data.push(stock.price)
            currentDataLength = chartStocks[index].data.length
          }
        })
      })
      // Syncing all datasets (the ones that wasnt updated gets the same price again)
      chartStocks.map((stock) => {
        if (stock.data.length < currentDataLength) {
          stock.data.push(stock.data[currentDataLength - 2])
        }
      })

      this.setState({
        stocks: newStocks,
        chartData: {
          type: 'line',
          labels: newTicks,
          datasets: chartStocks,
        },
      })
    })
  }

  render() {
    return (
      <div className="App">
        <TickerTable stocks={this.state.stocks} change={this.state.change}/>
        <LineChart data={this.state.chartData} />
      </div>
    )
  }
}

export default App
