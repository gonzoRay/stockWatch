'use strict';

module.export = function () {
    var baseUrl = 'https://query.yahooapis.com/v1/public/yql?q=';

    function createUrl(symbol) {
        var stockUrl = [baseUrl,
            encodeURIComponent('select * from yahoo.finance.quotes '),
            encodeURIComponent('where symbol in (\'' + symbol + '\')'),
            '&format=json&diagnostics=false&env=',
            encodeURIComponent('store://datatables.org/alltableswithkeys')]
            .join('');

        return stockUrl;
    }

    return {
      generateStockQuoteUrl: createUrl
    };

}();