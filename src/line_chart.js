import React, { PropTypes } from 'react'
import { Line } from 'react-chartjs-2'


function LineChart(props) {
  return (
    <Line data={props.data} width={600} height={250} options={{ animation: false }} redraw/>
  )
}

LineChart.propTypes = {
  data: PropTypes.object.isRequired,
}

export default LineChart
