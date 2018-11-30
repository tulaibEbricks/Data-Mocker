const writeFile = require('write');

const writeHTMLToFile = (htmlString, filePath) => {
    writeFile(filePath, htmlString, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

const printHTML = (htmlString) => {
    console.log(stringifiedData);
}

module.exports = {
    writeHTMLToFile,
    printHTML
}