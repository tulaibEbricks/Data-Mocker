const mocker = require('mocker-data-generator').default
const util = require('util');
const express = require('express');
const bodyParser = require('body-parser');

const csvHandler = require('./Components/CSVHandler')
const webpageGrabber = require('./Components/webpageGrabber')
const webSourceWriter = require('./Components/WebSourceWriter')

const app = express();
app.use(bodyParser.json());
const websiteURL = 'https://www.linkedin.com/'
const htmlFileName = 'websitePageSource.html';
const htmlFilePath = '../' + htmlFileName;

async function mockData() {
    // createMockData()
    const htmlString = await webpageGrabber.setupPage(websiteURL);
    webSourceWriter.writeHTMLToFile(htmlString, htmlFilePath);
    await webpageGrabber.closeBrowser();
}

app.get('/', async (req, res) => {
    const htmlString = await webpageGrabber.setupPage(websiteURL);
    res.send(htmlString);
})

app.get('/readMockData', async (req, res) => {
    const dataList = await csvHandler.readData();
    res.send(dataList);
})

app.get('/inputFields', (req, res) => {
    const inputFields = webpageGrabber.getInputElements();
    res.send(inputFields)
});

function createMockData() {
    var user = {
        firstName: {
            faker: 'name.firstName'
        },
        lastName: {
            faker: 'name.lastName'
        },
        email: {
            faker: 'internet.email'
        },
        password: {
            faker: 'internet.password'
        }
    }

    mocker()
    .schema('user', user, 5)
    .build()
    .then(
        data => {
            const userList = data['user'];
            console.log(userList.length);
            csvHandler.writeData(userList)
        },
        err => console.error(err)
    )
}

app.listen(3000, () => {
    console.log('app is running on port 3000')
})