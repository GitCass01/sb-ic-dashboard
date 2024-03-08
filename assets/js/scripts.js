import {linePlotPerformanceScore, linePlot, pieChartCoverages, barChart, treeChart, sankeyChart, boxplot} from './createCharts.js'


var patientId = null;
var domain = null;
var variable = null;

//charts

var minCoverageInput = document.getElementById("minCoverage");
createPatientList(minCoverageInput.value);
createDomainList();

minCoverageInput.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        createPatientList(e.target.value);
    }
});

async function createPatientList(minCoverage) {
    await fetch('getAllId', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({minCoverage: minCoverage})
    })
    .then(response => response.json())
    .then(result => {
        var patientListContainer = document.getElementById('patient-list')
        patientListContainer.innerHTML = '';
        result.value.forEach(id => {
            const idItem = document.createElement('a');
            idItem.classList.add('dropdown-item');
            idItem.id = id;
            idItem.textContent = id;
            idItem.onclick = () => selectId(idItem);
            patientListContainer.appendChild(idItem);
        });
    })
}

async function selectId(element) {
    // Deseleziona il vecchio ID
    if (patientId !== null) {
        //patientId.classList.remove('selected');
        patientId.classList.remove('active')
        patientId.classList.remove('bg-info')
        patientId.classList.remove('text-dark')
    }

    // Seleziona il nuovo ID
    //element.classList.add('selected');
    element.classList.add('active')
    element.classList.add('bg-info')
    element.classList.add('text-dark')
    patientId = element;

    const id = {
        patientId: patientId.id
    }

    await generatePatientInfo(id)

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
                icChartCoverageChart()

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
    if (variable !== null) {
        generateVariableChart()
    }

    createTreeChart();
    createSankeyChart();
}

async function createDomainList() {
    var domainList = ['Locomotion', 'Sensory', 'Psychological', 'Cognition', 'Vitality']
    var domainListContainer = document.getElementById('domain-list')
    domainList.forEach(id => {
        const domainItem = document.createElement('div');
        domainItem.classList.add('domainItem');
        domainItem.id = id;
        domainItem.textContent = id;
        domainItem.onclick = () => selectDomain(domainItem);
        domainListContainer.appendChild(domainItem);
    });
}

async function generatePatientInfo(id) {
    await fetch('/patientInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(id)
    })
    .then(response => response.json())
    .then(result => {
        var patientInfoTrow = document.getElementById('patient-info-trow')
        patientInfoTrow.innerHTML = '';

        var arr = result.value
        for (let i = 0; i < arr.length; i++) {
            var rowItem = document.createElement('td')
            if (i == 0) {
                rowItem = document.createElement('th')
                rowItem.scope = 'row'
            }
            rowItem.textContent = arr[i];
            patientInfoTrow.appendChild(rowItem);
        }
    })
    .catch(err => console.log("err: ", err));
}

async function icChartCoverageChart() {
    var domainValue = {
        domain: 'Intrinsic Capacity'
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
        linePlotPerformanceScore('ic-chart', result.data, result.dates, 'Intrinsic Capacity', result.trend)
    })
    .catch(err => console.log("err: ", err));
    

    await fetch('/coverages', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(result => {
            var coverages = result
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

    generateVariableList()

    generateVariableImputationChart()
}

async function generateVariableList() {
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
        var variableListContainer = document.getElementById('variable-list')
        variableListContainer.innerHTML = '';
        result.value.forEach(variable => {
            var tmp = variable
            if (variable.includes('conditions')) {
                tmp = variable.split('_')[0] + ' conditions'
            }

            const variableItem = document.createElement('div');
            variableItem.classList.add('variableItem');
            variableItem.id = variable;
            variableItem.textContent = tmp;
            variableItem.onclick = () => selectVariable(variableItem);
            variableListContainer.appendChild(variableItem);
        });
    })
    .catch(err => console.log("err: ", err));
}

async function selectVariable(element) {
    // Deseleziona il vecchio ID
    if (variable !== null) {
        variable.classList.remove('selected');
    }

    // Seleziona il nuovo ID
    element.classList.add('selected');
    variable = element;

    generateVariableChart()

    generateVariableImputationChart()

    generateVariableBoxplot()
}

async function generateVariableChart() {
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
        if (variable.id.includes('conditions') | variable.id.includes('Score')) {
            linePlot('variable-chart', result.data, result.dates, variable.id, null, 'none')
        } else {
            linePlot('variable-chart', result.data, result.dates, variable.id)
        }
    })
    .catch(err => console.log("err: ", err));
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

async function generateVariableBoxplot() {
    const variableValue = {
        variable: variable.id
    }

    await fetch('/variableBoxplot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(variableValue)
    })
    .then(response => response.json())
    .then(result => {
        boxplot('boxplot-chart', result.data, variable.id + "'s boxplot")
    })
    .catch(err => console.log("err: ", err));
}

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
        linePlotPerformanceScore('domain-chart', result.data, result.dates, domain.id, result.trend)
    })
    .catch(err => console.log("err: ", err));
}

async function createTreeChart() {
    await fetch('/treeChart', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(result => {
        treeChart('tree-chart', result.data, 'IC composition')
    })
    .catch(err => console.log("err: ", err));
}

async function createSankeyChart() {
    await fetch('/sankeyChart', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(result => {
        sankeyChart('sankey-chart', result.data, result.links, 'Domains contribution')
    })
    .catch(err => console.log("err: ", err));
}