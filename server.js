const mocker = require('mocker-data-generator').default
const util = require('util');

const csvHandler = require('./Components/CSVHandler')
const webpageGrabber = require('./Components/webpageGrabber')
const webSourceWriter = require('./Components/WebSourceWriter')

const websiteURL = 'https://www.linkedin.com/'
const htmlFileName = 'websitePageSource.html';
const htmlFilePath = '../' + htmlFileName;

async function mockData() {
    const htmlString = await webpageGrabber.setupPage(websiteURL);
    webSourceWriter.writeHTMLToFile(htmlString, htmlFilePath);
    await webpageGrabber.closeBrowser();
    // createMockData()
    // readMockData()
}

mockData()

function readMockData() {
    csvHandler.readData();
}

function createMockData() {
    var user = {
        firstName: {
            faker: 'name.firstName'
        },
        lastName: {
            faker: 'name.lastName'
        },
        country: {
            faker: 'address.country'
        },
        createdAt: {
            faker: 'date.past'
        },
        username: {
            function: function() {
                return (
                    this.object.lastName.substring(0, 5) +
                    this.object.firstName.substring(0, 3) +
                    Math.floor(Math.random() * 10)
                )
            }
        }
    }

    mocker()
    .schema('user', user, 5)
    // .schema('group', group, 5)
    // .schema('conditionalField', conditionalField, 5)
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