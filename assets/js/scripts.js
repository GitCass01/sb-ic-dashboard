import dataset from './../datasets/dataset.json' assert { type: 'json' };
import { locomotion_list, sensory_list, psychological_list, cognition_list, vitality_list, locomotion_list_ps, sensory_list_ps, 
    psychological_list_ps, cognition_list_ps, vitality_list_ps, locomotion_list_imputed, sensory_list_imputed, 
    psychological_list_imputed, cognition_list_imputed, vitality_list_imputed, domains, domains_coverage, domains_imputed }
    from './data_lists.js';

import { filterData, getData, getDates, computeTrend, getDates2, getDomainCoverage } from './utility.js';

import { linePlotDomain, pieChartCoverages } from './createCharts.js';

var patientId = '1065442966';

/*function selectId(element) {
    console.log(element)
    // Deseleziona il vecchio ID
    if (patientId !== null) {
        patientId.classList.remove('selected');
    }

    // Seleziona il nuovo ID
    element.classList.add('selected');
    patientId = element;
}

document.getElementById('1065442966').addEventListener('click', selectId);*/

var patientData = filterData(dataset, 'Patient_id', patientId)
var coverages = []
getDomainCoverage(patientData, domains).map((e, index) => {
    var tmp = {}
    tmp['name'] = domains[index]
    tmp['value'] = e
    coverages.push(tmp)
})
document.getElementById('ic-coverage').innerHTML = 'IC coverage: ' + coverages[5]['value'] + '%';
coverages.pop()

linePlotDomain('ic-chart', patientData, 'Intrinsic Capacity')
pieChartCoverages('coverage-pie', coverages)