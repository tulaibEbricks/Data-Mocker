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
            Email: user['email'], Password: user['password']});
    }
    csvStream.end();
}

const readData = async () => { 
    var dataList = [];

    return new Promise((resolve, reject) => {

        var readStream = fs.createReadStream(filepath);
        var csvStream1 = csv()
            .on("data", function(data){
                dataList.push(data);
            })
            .on("end", function(){
                resolve(dataList);
            });
        
        readStream.pipe(csvStream1);

    });
}

module.exports = {
    writeData,
    readData
}