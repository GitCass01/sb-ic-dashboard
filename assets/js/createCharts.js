import { filterData, getData, getDates, computeTrend, getDates2, getDomainCoverage } from './utility.js';

import { locomotion_list, sensory_list, psychological_list, cognition_list, vitality_list, locomotion_list_ps, sensory_list_ps, 
    psychological_list_ps, cognition_list_ps, vitality_list_ps, locomotion_list_imputed, sensory_list_imputed, 
    psychological_list_imputed, cognition_list_imputed, vitality_list_imputed, domains, domains_coverage, domains_imputed }
    from './data_lists.js'; 

function linePlotDomain(idDiv, patientData, domain) {
    var data = getData(patientData, 'Intrinsic Capacity')
    var dates = getDates(patientData)
    //var trend = computeTrend(getDates2(patientData), data)

    // Initialize the echarts instance based on the prepared dom
    var icChart = echarts.init(document.getElementById(idDiv));
    //myChart.showLoading();
    //myChart.hideLoading();    

    // Specify the configuration items and data for the chart
    var option = {
        title: {
        text: domain
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
            showAllSymbol:true
        }/*,
        {
            name: 'Trend line',
            data: trend,
            type:'line',
            showSymbol:false,
            lineStyle: {
            type: 'dashed'
            }
        }*/
        ],
        dataZoom: [
        {
            type: 'slider',
            xAxisIndex: [0],
            start: 0,
            end: 50
        },
        {
            type: 'inside',
            xAxisIndex: [0],
            start: 0,
            end: 50
        },
        {
            type: 'slider',
            yAxisIndex: [0],
            start: 60,
            end: 100,
            zoomOnMouseWheel: false
        },
        {
            type: 'inside',
            yAxisIndex: [0],
            start: 60,
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
    console.log(coverages)
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

export {linePlotDomain, pieChartCoverages};