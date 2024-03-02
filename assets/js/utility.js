function filterData(df, column, value) {
    return df.filter(row => row[column] == value)
}

function getData(df, column) {
    return df.map(function(riga) {
        return riga[column]
    })
}

function getDates(df) {
    var result = df.map(function(riga) {
        var d = new Date(riga['effectiveDateTime'])
        return "" + d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDay()
    })
    return result
}

function getDates2(df) {
    var result = df.map(function(riga) {
        return new Date(riga['effectiveDateTime'])
    })
    return result
}

function getDomainCoverage(df, domains) {
    var coverages = []
    domains.forEach(e => {
        coverages.push(Math.round((df[0][e+'_coverage'] + Number.EPSILON) * 100) / 100)
    });
    return coverages
}

function calculatePolynomialValue(x, coefficients) {
    var result = 0;
    for (var i = 0; i < coefficients.length; i++) {
        result += coefficients[i] * Math.pow(x, i);
        console.log(x, i, coefficients[i], result);
    }
    return result;
}

function computeTrend(x, y) {
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

export {filterData, getData, getDates, computeTrend, getDates2, getDomainCoverage};