const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');  // necessario per leggere il contenuto del 'body' di una richiesta in POST

const app = express();
const port = process.env.PORT || 8080;

const dataset = require('./assets/datasets/dataset2.json');
//const dataLists = require('./assets/js/data_lists.js');
const utility = require('./assets/js/utility.js');
//const chartCreation = require('./assets/js/createCharts.js');
const dataLists = require('./assets/js/dataLists.js')

//Express static file module
app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.json());

// index.html
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/index', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/index.html', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

var patientId = ''
var patientData = dataset

app.post('/getAllId', async function (req, res) {
    var ids = utility.getAllId(dataset, req.body.minCoverage)
    res.send({value: ids})
})

app.post('/setId', async function (req, res) {
    patientId = req.body.patientId
    patientData = utility.filterData(dataset, 'Patient_id', patientId)
    console.log('New patient id: ' + patientId)
    res.send({ code: 'Success' });
})

app.post('/patientInfo', async function (req, res) {
    res.send({value: utility.getPatientInfo(req.body.patientId)})
})

app.post('/domainChart', async function (req, res) {
    var response = {}
    response['data'] = utility.getData(patientData, req.body.domain)
    response['dates'] = utility.getDates(patientData)
    response['trend'] = utility.computeTrend(patientData, req.body.domain)
    res.send(response)
})

app.get('/coverages', async function (req, res) {
    var coverages = []
    utility.getDomainCoverage(patientData, dataLists['domains']).map((e, index) => {
        var tmp = {}
        tmp['name'] = dataLists['domains'][index]
        tmp['value'] = e
        coverages.push(tmp)
    })
    res.json(coverages)
});

app.post('/domainVariables', async function (req, res) {
    res.send({value: utility.getNonNullVariables(patientData)[req.body.domain]})
})

app.post('/variableChart', async function (req, res) {
    var response = {}
    response['data'] = utility.getData(patientData, req.body.variable)
    response['dates'] = utility.getDates(patientData)
    // response['trend'] = ...
    res.send(response)
})

app.post('/variableImputation', async function (req, res) {
    var response = {}
    response['variables'] = utility.getNonNullVariables(patientData)[req.body.domain]
    response['data'] = utility.getVariableImputation(patientData, req.body.domain)
    res.send(response)
})

app.get('/treeChart', async function (req, res) {
    res.send({data: utility.generateTree(patientData)})
})

app.get('/sankeyChart', async function (req, res) {
    var data = []
    dataLists.domains.forEach(element => {
        data.push({'name': element})
    });

    res.send({data: data, links: utility.getSankeyLinks(patientData)})
})

app.post('/variableBoxplot', async function (req, res) {
    res.send({data: utility.getData(patientData, req.body.variable)})
})

app.listen(port);