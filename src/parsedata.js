var randc = require('./randomcolor.js');

module.exports = function(data, cb){
    var result = {};
    result.labels = [];
    result.datasets = [];
    var datas = [];
    for(var i in data){
        result.labels.push(i);
        for(var j in data[i]){
            if(datas.indexOf(j) == -1){
                datas.push(j);
            }
        }
    }
    for(var i in datas){
        var dataset = {};
        dataset.data = [];
        dataset.label = datas[i];
        dataset.backgroundColor = randc();
        for(var j in data){
            var val = data[j][datas[i]] || 0;
            dataset.data.push(val);
        }
        result.datasets.push(dataset);

    }
    return cb(result);
}