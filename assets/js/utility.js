const ecStat = require('echarts-stat')
const dataLists = require('./dataLists.js')
const patientInfo = require('../datasets/patient_info.json')

module.exports = {
    getAllId: function(df, minCoverage) {
        df = df.filter(row => row['Intrinsic Capacity_coverage'] >= minCoverage)
        return Array.from(new Set(df.map(item => item['Patient_id'])))
    },

    filterData: function(df, column, value) {
        return df.filter(row => row[column] == value)
    },
    
    getData: function(df, column) {
        return df.map(function(row) {
            return row[column]
        })
    },
    
    getDates: function (df) {
        var result = df.map(function(row) {
            var d = new Date(row['effectiveDateTime'])
            return "" + d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDay()
        })
        return result
    },
    
    getDates2: function (df) {
        return df.map(function(row) {
            return new Date(row['effectiveDateTime'])
        })
    },

    getPatientInfo: function (patientId) {
        var info = []

        df = this.filterData(patientInfo, 'Patient_id', patientId)
        df.map(function(row) {
            for (col in row) {
                if (row[col] == null) {
                    info.push('/')
                } else {
                    info.push(row[col])
                }
            }
        })

        return info;
    },
    
    getDomainCoverage: function (df, domains) {
        var coverages = []
        var domain_count = this.countNonValues(df)
        var tot_var_personalized = 0
        var tot_var = 0

        domains.slice(0, 5).forEach(e => {
            coverages.push(Math.round(((domain_count[e]/dataLists.count_domains[e] * 100) + Number.EPSILON) * 100) / 100)
        });
        
        for (const e in domain_count) {
            tot_var_personalized += domain_count[e]
        }
        for (const e in dataLists.count_domains) {
            tot_var += dataLists.count_domains[e]
        }
        coverages.push(Math.round(((tot_var_personalized/tot_var * 100) + Number.EPSILON) * 100) / 100)

        return coverages
    },

    getVariableImputation: function (df, domain) {
        var result = []
        var variables = this.getNonNullVariables(df)[domain]
        var tmp = variables.map(function(element){
            if (element.includes('ps')) {
                element = element.split('_ps')[0]
            }
            return element+'_imputed'
        })

        tmp.forEach(e => {
            result.push(Math.round((df[0][e] + Number.EPSILON) * 100) / 100)
        })

        return result
    },
    
    computeTrend: function(df, domain) {
        var dates = this.getData(df, 'effectiveDateTime')
        var data_domain = this.getData(df, domain)
        var data = []
        for (let i=0; i < dates.length; i++) {
            data.push([dates[i], data_domain[i]])
        }
        var points = ecStat.regression('polynomial', data, 1).points
        return points.map(e => e[1])
    },

    generateTree: function(df) {
        var tree = {
            'name': 'Intrinsic Capacity',
            'children': []
        }

        var variables = this.getNonNullVariables(df)

        dataLists.domains.slice(0,5).forEach(e => {
            var tmp = []
            variables[e].forEach(element => {
                if (element.includes('conditions')) {
                    element = element.split('_')[0] + ' conditions'
                }
                tmp.push({
                    'name': element,
                    'value': element
                })
            })

            var children = {
                'name': e,
                'children': tmp
            }
            tree['children'].push(children)
        })

        return tree;
    },

    getSankeyLinks: function(df) {
        var links = []
        var values = this.countNonValues(df)

        dataLists.domains.slice(0, dataLists.domains.length-1).forEach(element => {
            var link = {
                'source': element,
                'target': 'Intrinsic Capacity',
                'value': values[element]
            }
            links.push(link)
        })

        return links;
    },

    countNonValues: function(df) {
        var link_values = {}

        dataLists.domains.slice(0,5).forEach(e => {
            var count = dataLists[e.toLowerCase() + '_list'].length;
            dataLists[e.toLowerCase() + '_list'].forEach(element => {
                if (df[0][element] == null) {
                    count--
                }
            });
            link_values[e] = count;
        })
        
        return link_values;
    },

    getNonNullValues: function(df) {
        var domains_var = {}

        dataLists.domains.slice(0,5).forEach(e => {
            var variables = []
            dataLists[e.toLowerCase() + '_list'].forEach(element => {
                if (element.includes('conditions')) {
                    element = element.split('_')[0] + ' conditions'
                }

                if (df[0][element] == null) {
                    variables.push(element)
                }
            });
            domains_var[e] = variables
        })

        return domains_var;
    },

    getNonNullVariables: function(df) {
        var variables = {}

        dataLists.domains.slice(0,5).forEach(e => {
            var tmp = []
            dataLists[e.toLowerCase() + '_list'].forEach(element => {
                if (df[0][element] != null) {
                    tmp.push(element)
                }
            });
            variables[e] = tmp
        })
        
        return variables;
    },
}