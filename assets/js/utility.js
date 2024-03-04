const ecStat = require('echarts-stat')

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
        domains.forEach(e => {
            coverages.push(Math.round((df[0][e+'_coverage'] + Number.EPSILON) * 100) / 100)
        });
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
}