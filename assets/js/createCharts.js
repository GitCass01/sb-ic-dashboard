function linePlot(idDiv, data, dates, titleName, trend=null) {
  var icChart = echarts.init(document.getElementById(idDiv));
  //myChart.showLoading();
  //myChart.hideLoading();    

  // Specify the configuration items and data for the chart
  var option = {
      title: {
        text: titleName
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: dates
      },
      yAxis: {
        name: 'performance score',
        //nameLocation:'middle',
        type: 'value'
      },
      legend:{
        data: ['Performance score', 'Trend line']
      },
      series: [
      {
        name: 'Performance score',
        data: data,
        type: 'line',
        //smooth: true,
        showAllSymbol:true
      },
      {
        name: 'Trend line',
        data: trend,
        type:'line',
        showSymbol:false,
        lineStyle: {
          type: 'dashed'
        }
      }
      ],
      dataZoom: [
      {
        type: 'slider',
        xAxisIndex: [0],
        start: 0,
        end: 100
      },
      {
        type: 'inside',
        xAxisIndex: [0],
        start: 0,
        end: 100
      },
      {
        type: 'slider',
        yAxisIndex: [0],
        start: 0,
        end: 100,
        zoomOnMouseWheel: false
      },
      {
        type: 'inside',
        yAxisIndex: [0],
        start: 0,
        end: 100,
        zoomOnMouseWheel: false
      }
      ]
  };

  // Display the chart using the configuration items and data just specified.
  icChart.setOption(option);
}

function pieChartCoverages(idDiv, coverages) {
  var chart = echarts.init(document.getElementById(idDiv));
  
  var option = {
      title: {
        text: 'Coverages for each domain',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Domains Coverages',
          type: 'pie',
          radius: '50%',
          data: coverages,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    chart.setOption(option);
}

function barChart(idDiv, data, variables, titleName) {
  var chart = echarts.init(document.getElementById(idDiv));
  var option = {
      title: {
          text: titleName,
          left: 'center'
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      xAxis: {
        type: 'category',
        data: variables,
        axisLabel: {
          interval: 0,
          rotate: 30
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: data,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
          label: {
            show: true,
            position: 'inside'
          },
        }
      ]
  };
  chart.setOption(option);
}

export {linePlot, pieChartCoverages, barChart};