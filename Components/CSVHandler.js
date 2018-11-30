var csv = require("fast-csv");
var fs  = require('fs');
const util = require('util');

const fileName = 'data.csv'
const filepath = fileName
var csvStream = csv.format({headers: true}); 

const writeData = (dataList) => {
    var writableStream = fs.createWriteStream(filepath);
    writableStream.on("finish", () => {
        console.log("DONE!");
    });

    csvStream.pipe(writableStream);
    for (var i = 0; i < dataList.length; i++) {
        const user = dataList[i];
        csvStream.write({FirstName: user['firstName'], LastName: user['lastName'], 
            Country: user['country'], CreatedAt: user['createdAt'], Username: user['username']});
    }
    csvStream.end();
}

const readData = () => { 
    var readStream = fs.createReadStream(filepath);
 
    csv
    .fromStream(readStream, {headers : true})
    .on("data", (data) => {
        console.log(data);
    })
    .on("end", () => {
        console.log("done");
    });
}

module.exports = {
    writeData,
    readData
}