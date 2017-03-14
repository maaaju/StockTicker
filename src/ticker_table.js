import React, { Component } from 'react'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

const styles = {
  drop: { backgroundColor: 'red'},
  increase: { backgroundColor: 'green'},
}

class TickerTable extends Component {
  renderTableBody() {
    const { stocks } = this.props
    const maxTickNo = Math.max.apply(Math,stocks.map((s) => { return s.tickNo } ))

    const stocksBody = stocks.map((stock) => {
      if(stock.tickNo === maxTickNo) {
        return (
          <TableRow key={stock.symbol}>
            <TableRowColumn style={stock.change > 0 ? styles.increase : styles.drop }>{stock.symbol}</TableRowColumn>
            <TableRowColumn style={stock.change > 0 ? styles.increase : styles.drop }>{stock.price}</TableRowColumn>
            <TableRowColumn style={stock.change > 0 ? styles.increase : styles.drop }>{stock.change}</TableRowColumn>
            <TableRowColumn style={stock.change > 0 ? styles.increase : styles.drop }>{stock.changePercent}</TableRowColumn>
          </TableRow>
        )
      }
      return (
        <TableRow key={stock.symbol}>
          <TableRowColumn>{stock.symbol}</TableRowColumn>
          <TableRowColumn>{stock.price}</TableRowColumn>
          <TableRowColumn>{stock.change}</TableRowColumn>
          <TableRowColumn>{stock.changePercent}</TableRowColumn>
        </TableRow>
      )
    })
    return stocksBody
  }

  render() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Symbol</TableHeaderColumn>
            <TableHeaderColumn>Price</TableHeaderColumn>
            <TableHeaderColumn>Change</TableHeaderColumn>
            <TableHeaderColumn>Change %</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.renderTableBody()}
        </TableBody>
      </Table>
    )
  }
}

export default TickerTable
