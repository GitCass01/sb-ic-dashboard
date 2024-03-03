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
    
    calculatePolynomialValue: function (x, coefficients) {
        var result = 0;
        for (var i = 0; i < coefficients.length; i++) {
            result += coefficients[i] * Math.pow(x, i);
            console.log(x, i, coefficients[i], result);
        }
        return result;
    },
    
    computeTrend: function (x, y) {
        /*x = x.map(point => point.getTime());
        var data = {
            x: x,
            y: y
        }*/
        
        // Combina le date con i valori per ottenere coppie (x, y)
        var data = x.map((x, index) => [index + 1, y[index]]);
        console.log(data)    
        /*var result = regression.polynomial(Object.values(data), {order: 3});
        var coefficients = result.equation;
        console.log(result.equation)
        var trendLine = y.map( point => {
            return coefficients.reduce((sum, coefficient, index) => sum + coefficient * Math.pow(point, index), 0);
        });
        console.log(trendLine)*/
        console.log(data)
        var result = regression.polynomial(Object.values(data), {order: 1});
        var coefficients = result.equation;
        console.log(coefficients)
        for (var i = 0; i < data.length; i++) {
            var x = data[i][0];
            var polynomialValue = calculatePolynomialValue(x, coefficients);
        }
    
        return trendLine;
    }
}