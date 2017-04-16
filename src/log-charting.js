var Chart = require('chart.js');
var filereader = require('./filereader.js');
var parsedata = require('./parsedata.js');

module.exports = {
    defaults: {
        expDate: /\[(\d{2}[./-]\w{3}[./-]\d{4})(.*)]/,
        expMetric: /HTTP\/1.0"\s(\d+)/,
        file: "access.log",
        canvas: ".log-charting"
    },
    create: function(params){
        params = params || this.defaults;
        params.expDate = params.expDate || this.defaults.expDate;
        params.expMetric = params.expMetric || this.defaults.expMetric;
        params.file = params.file || this.defaults.file;
        params.canvas = params.canvas || this.defaults.canvas;
        filereader('access.log', function(text){
            var lines = text.split(/\n/);
            var data = {};
            lines.forEach(function(el){
                var date = params.expDate.exec(el);
                var metric = params.expMetric.exec(el);
                if(date && metric){
                    date = date[1];
                    metric = metric[1];
                    if(!data[date]){
                        data[date] = {};
                        if(!data[date][metric]){
                            data[date][metric] = 1;
                        }
                    }else{
                        if(!data[date][metric]){
                            data[date][metric] = 1;
                        }else{
                            data[date][metric] = data[date][metric] + 1;
                        }
                    }
                }
            });
            parsedata(data, function(result){                
                var ctx = document.querySelector(params.canvas);
                window.myBar = new Chart(ctx, {
                    type: 'bar',
                    data: result
                });

                
            });
        });
    }
}