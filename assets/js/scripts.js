import dataset from './../datasets/dataset.json' assert { type: 'json' };
import { locomotion_list, sensory_list, psychological_list, cognition_list, vitality_list, locomotion_list_ps, sensory_list_ps, 
    psychological_list_ps, cognition_list_ps, vitality_list_ps, locomotion_list_imputed, sensory_list_imputed, 
    psychological_list_imputed, cognition_list_imputed, vitality_list_imputed, domains, domains_coverage, domains_imputed }
    from './data_lists.js';

import { filterData, getData, getDates, computeTrend, getDates2, getDomainCoverage } from './utility.js';

import { linePlotDomain, pieChartCoverages } from './createCharts.js';

var patientData = filterData(dataset, 'Patient_id', '1065442966')
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