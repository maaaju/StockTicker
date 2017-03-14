import React, { PropTypes } from 'react'

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

function TickerTable(props) {
  const renderTableBody = props =>  {

    const maxTickNo = Math.max.apply(Math,props.stocks.map((s) => { return s.tickNo } ))

    const stocksBody = props.stocks.map((stock) => {
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
        {renderTableBody(props)}
      </TableBody>
    </Table>
  )
}

TickerTable.propTypes = {
  stocks: PropTypes.array,
}

export default TickerTable
