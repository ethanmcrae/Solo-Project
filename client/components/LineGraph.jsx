import React from 'react';
import Chart from 'react-apexcharts'

export default ({ remainingWords }) => {
  const state = {
    options: {
      chart: {
        id: 'line-graph',
        toolbar: {
          show: false
        },
      },
      colors: ['#ccc', '#333'],
      xaxis: {
        categories: remainingWords.map((_, i) => !i ? 'Total' : 'Guess ' + i)
      },
      yaxis: {
        title: {
          text: 'Remaining Possible Words'
        },
        logarithmic: true
      }
    },
    series: [{
      name: 'Possible Words',
      data: remainingWords
    }]
  }
  
  return (
    <Chart id='line-graph' options={state.options} series={state.series} type='line' />
  )
}
