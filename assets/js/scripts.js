var patientId = null;
var domain = null;
var variable = null;

var minCoverageInput = document.getElementById("minCoverage");
getAllPatientId(minCoverageInput.value)

minCoverageInput.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        getAllPatientId(e.target.value);
    }
});

async function getAllPatientId(minCoverage) {
    await fetch('getAllId', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({minCoverage: minCoverage})
    })
    .then(response => response.json())
    .then(result => {
        createPatientList(result.value)
    })
}

async function selectId(element) {
    // Deseleziona il vecchio ID
    if (patientId !== null) {
        patientId.classList.remove('selected');
    }

    // Seleziona il nuovo ID
    element.classList.add('selected');
    patientId = element;

    const id = {
        patientId: patientId.id
    }

    await fetch('/setId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id),
        })
        .then(response => response.json())
        .then(result => {
            if (result.code === 'Success') {
                generateCharts();
                if (domain !== null) {
                    generateDomainChart()
                }
            } else {
                alert('id not sended');
            }
        })
        .catch(err => console.log("err: ", err));
    
    if (domain !== null) {
        generateVariableImputationChart()
    }
}

async function createPatientList(idList) {
    var patientListContainer = document.getElementById('patient-list')
    idList.forEach(id => {
        const idItem = document.createElement('div');
        idItem.classList.add('idItem');
        idItem.id = id;
        idItem.textContent = id;
        idItem.onclick = () => selectId(idItem);
        patientListContainer.appendChild(idItem);
    });
}

async function generateCharts() {
    await fetch('/icChart', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(result => {
            linePlot('ic-chart', result.data, result.dates, 'Intrinsic Capacity')
        })
        .catch(err => console.log("err: ", err));
    

    await fetch('/coverages', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(result => {
            coverages = result
            document.getElementById('ic-coverage').innerHTML = 'IC coverage: ' + coverages[5]['value'] + '%';
            coverages.pop()
            pieChartCoverages('coverage-pie', coverages)
        })
        .catch(err => console.log("err: ", err));
}


async function selectDomain(element) {
    // Deseleziona il vecchio ID
    if (domain !== null) {
        domain.classList.remove('selected');
    }

    // Seleziona il nuovo ID
    element.classList.add('selected');
    domain = element;    

    await generateDomainChart();

    const domainValue = {
        domain: domain.id
    }

    await fetch('/domainVariables', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(domainValue)
    })
    .then(response => response.json())
    .then(result => {
        generateVariableList(result.value)
    })
    .catch(err => console.log("err: ", err));

    generateVariableImputationChart()
}

async function generateVariableList(variableList) {
    var variableListContainer = document.getElementById('variable-list')

    variableListContainer.innerHTML = '';

    variableList.forEach(variable => {
        const variableItem = document.createElement('div');
        variableItem.classList.add('idItem');
        variableItem.id = variable;
        variableItem.textContent = variable;
        variableItem.onclick = () => selectVariable(variableItem);
        variableListContainer.appendChild(variableItem);
    });
}

async function selectVariable(element) {
    // Deseleziona il vecchio ID
    if (variable !== null) {
        variable.classList.remove('selected');
    }

    // Seleziona il nuovo ID
    element.classList.add('selected');
    variable = element;

    const variableValue = {
        variable: variable.id
    }

    await fetch('/variableChart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(variableValue)
    })
    .then(response => response.json())
    .then(result => {
        linePlot('variable-chart', result.data, result.dates, variable.id)
    })
    .catch(err => console.log("err: ", err));

    generateVariableImputationChart()
}

async function generateVariableImputationChart() {
    const domainValue = {
        domain: domain.id
    }

    await fetch('/variableImputation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(domainValue)
    })
    .then(response => response.json())
    .then(result => {
        barChart('variable-imputation-chart', result.data, result.variables, domain.id+"'s variables imputation [%]")
    })
    .catch(err => console.log("err: ", err));
}

// CREATION OF CHARTS
async function generateDomainChart() {
    const domainValue = {
        domain: domain.id
    }

    await fetch('/domainChart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(domainValue)
    })
    .then(response => response.json())
    .then(result => {
        linePlot('domain-chart', result.data, result.dates, domain.id)
    })
    .catch(err => console.log("err: ", err));
}

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