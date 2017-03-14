import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'


class LineChart extends Component {
  render() {
    const { data } = this.props
    return <Line data={data} width={600} height={250} options={{ animation: false }} redraw/>
  }
}

export default LineChart
