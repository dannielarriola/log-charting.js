module.exports = function(filePath, cb) {
    var txtFile = new XMLHttpRequest();
    txtFile.open("GET", filePath, true);
    txtFile.onreadystatechange = function() {
        if (txtFile.readyState == 4) {
            var text = txtFile.responseText;
            return cb(text);
        }
    }
    txtFile.send(null)
}
