var csv = require("fast-csv");
var fs  = require('fs');

const fileName = 'data.csv'
const filepath = fileName
var csvStream = csv.format({headers: true}); 
var writableStream = fs.createWriteStream(filepath);

const writeData = (dataList) => {
    writableStream.on("finish", () => {
        console.log("DONE!");
    });

    csvStream.pipe(writableStream);
    var i;
    for (i = 0; i < dataList.length; i++) {
        const user = dataList[i];
        csvStream.write({FirstName: user['firstName'], LastName: user['lastName'], 
            Country: user['country'], CreatedAt: user['createdAt'], Username: user['username']});
    }
    csvStream.end();
}

module.exports = {
    writeData
}