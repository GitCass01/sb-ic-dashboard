const ecStat = require('echarts-stat')
const dataLists = require('./dataLists.js')

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

    getVariableImputation: function (df, variableList) {
        var result = []
        variableList.forEach(e => {
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

    generateTree: function() {
        var tree = {
            'name': 'Intrinsic Capacity',
            'children': []
        }

        var children = {
            'name': 'Locomotion',
        }
        var variables = []
        dataLists.locomotion_list.forEach(element => {
            if (element.includes('conditions')) {
                element = element.split('_')[0] + ' conditions'
            }

            variables.push(
                {
                    'name': element,
                    'value': element
                }
            )
        });
        children['children'] = variables
        tree['children'].push(children)

        var children = {
            'name': 'Sensory',
        }
        var variables = []
        dataLists.sensory_list.forEach(element => {
            if (element.includes('conditions')) {
                element = element.split('_')[0] + ' conditions'
            }

            variables.push(
                {
                    'name': element,
                    'value': element
                }
            )
        });
        children['children'] = variables
        tree['children'].push(children)

        var children = {
            'name': 'Psychological',
        }
        var variables = []
        dataLists.psychological_list.forEach(element => {
            if (element.includes('conditions')) {
                element = element.split('_')[0] + ' conditions'
            }

            variables.push(
                {
                    'name': element,
                    'value': element
                }
            )
        });
        children['children'] = variables
        tree['children'].push(children)

        var children = {
            'name': 'Cognition',
        }
        var variables = []
        dataLists.cognition_list.forEach(element => {
            if (element.includes('conditions')) {
                element = element.split('_')[0] + ' conditions'
            }

            variables.push(
                {
                    'name': element,
                    'value': element
                }
            )
        });
        children['children'] = variables
        tree['children'].push(children)

        var children = {
            'name': 'Vitality',
        }
        var variables = []
        dataLists.vitality_list.forEach(element => {
            if (element.includes('conditions')) {
                element = element.split('_')[0] + ' conditions'
            }

            variables.push(
                {
                    'name': element,
                    'value': element
                }
            )
        });
        children['children'] = variables
        tree['children'].push(children)

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

        var count = dataLists.locomotion_list.length;
        dataLists.locomotion_list.forEach(element => {
            if (df[0][element] == null) {
                count--
            }
        });
        link_values['Locomotion'] = count;

        var count = dataLists.sensory_list.length;
        dataLists.sensory_list.forEach(element => {
            if (df[0][element] == null) {
                count--
            }
        });
        link_values['Sensory'] = count;

        var count = dataLists.psychological_list.length;
        dataLists.psychological_list.forEach(element => {
            if (df[0][element] == null) {
                count--
            }
        });
        link_values['Psychological'] = count;

        var count = dataLists.cognition_list.length;
        dataLists.cognition_list.forEach(element => {
            if (df[0][element] == null) {
                count--
            }
        });
        link_values['Cognition'] = count;

        var count = dataLists.vitality_list.length;
        dataLists.vitality_list.forEach(element => {
            if (df[0][element] == null) {
                count--
            }
        });
        link_values['Vitality'] = count;

        return link_values;
    },

    getVariableData: function(df, variable) {
        /*var data = []

        dataLists['locomotion_list'].forEach(e => {
            data.push(this.getData(df, e))
        })*/
        
        return this.getData(df, variable);
    }
}