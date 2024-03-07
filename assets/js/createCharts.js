function linePlotPerformanceScore(idDiv, data, dates, titleName, trend=null) {
  var chart = echarts.init(document.getElementById(idDiv));
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
        type: 'value',
        min: 1,
        max: 6
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
  chart.setOption(option);
}

function linePlot(idDiv, data, dates, titleName, trend=null) {
  var chart = echarts.init(document.getElementById(idDiv));
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
        data: ['Performance score']
      },
      series: [
      {
        name: 'Performance score',
        data: data,
        type: 'line',
        //smooth: true,
        showAllSymbol:true
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
  chart.setOption(option);
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

function treeChart(idDiv, data, titleName) {
  var chart = echarts.init(document.getElementById(idDiv));

  var option = {
    title: {
      text: titleName,
      left: 'left'
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [{
      type: 'tree',
      data: [data],
      top: '1%',
      left: '10%',
      bottom: '1%',
      right: '15%',
      symbolSize: 7,
      label: {
        position: 'left',
        verticalAlign: 'middle',
        align: 'right',
        fontSize: 9
      },
      leaves: {
        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left'
        }
      },
      emphasis: {
        focus: 'descendant'
      },
      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750
    }]
  }

  chart.setOption(option);
}

function sankeyChart(idDiv, data, links, titleName) {
  var chart = echarts.init(document.getElementById(idDiv));

  var option = {
    title: {
      text: titleName,
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: {
      type: 'sankey',
      layout: 'none',
      data: data,
      links: links,
      right: '26%',
      top: '7%',
      nodeGap: 15,
      nodeWidth: 12,
      lineStyle: {
        color: 'source',
        curveness: 0.7,
        opacity: 0.3
      },
      itemStyle: {
        opacity: 0.8
      }
    }
  };

  chart.setOption(option);
}

function boxplot(idDiv, dataset, titleName) {
  var chart = echarts.init(document.getElementById(idDiv));

  var option = {
    title: [
      {
        text: titleName,
        left: 'center'
      },
      {
        text: 'upper: Q3 + 1.5 * IQR \nlower: Q1 - 1.5 * IQR',
        borderColor: '#999',
        borderWidth: 1,
        textStyle: {
          fontWeight: 'normal',
          fontSize: 14,
          lineHeight: 20
        },
        left: '10%',
        top: '90%'
      }
    ],
    dataset: [
      {
        source: [dataset]
      },
      {
        transform: {
          type: 'boxplot',
          config: { itemNameFormatter: 'expr {value}' }
        }
      },
      {
        fromDatasetIndex: 1,
        fromTransformResult: 1
      }
    ],
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      nameGap: 30,
      splitArea: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      //name: 'km/s minus 299,000',
      splitArea: {
        show: true
      }
    },
    series: [
      {
        name: 'boxplot',
        type: 'boxplot',
        datasetIndex: 1
      },
      {
        name: 'outlier',
        type: 'scatter',
        datasetIndex: 2
      }
    ]
  };

  chart.setOption(option);
}

export {linePlotPerformanceScore, linePlot, pieChartCoverages, barChart, treeChart, sankeyChart, boxplot};