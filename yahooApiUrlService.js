'use strict';

module.exports = function() {
    function generateRequestUrl(symbol) {
        var baseUrl = 'https://query.yahooapis.com/v1/public/yql?q=';

        return [
            baseUrl,
            encodeURIComponent('select * from yahoo.finance.quotes '),
            encodeURIComponent('where symbol in (\'' + symbol + '\')'),
            '&format=json&diagnostics=true&env=',
            encodeURIComponent('store://datatables.org/alltableswithkeys')
        ].join('');
    };

    return {
        generateRequestUrl: generateRequestUrl
    };
}();