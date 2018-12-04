const puppeteer = require('puppeteer');

const inputElementTag = 'input';
var page;
var browser;
var elementPropertyList;

const setupPage = async (webpageURL) => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(webpageURL);
    await page.addScriptTag({ path: './Public/CodeInjector.js' });
    await page.addStyleTag({ path: './Public/CodeInjector.css' });
    const html = await page.content();
    await parseInputElements();
    return html;
}

const closeBrowser = async () => {
    await browser.close();
}

const getInputElements = () => {
    return elementPropertyList;
}

async function parseInputElements() {
    const interactableElements = await page.$$(inputElementTag);
    elementPropertyList = await elementsIterator(interactableElements);
}

async function elementsIterator(elements) {
    const elementsPropertyList = [];
    for (const element of elements) {
        const propertyDict = await loadElementProperties(element);
        elementsPropertyList.push(propertyDict);
    }
    return elementsPropertyList;
}

async function loadElementProperties(item) {
    const element = item.asElement();
    const propertyDict = {};
    if (element) {
        const tagName = await ( await element.getProperty( 'tagName' ) ).jsonValue();
        if (tagName !== "") 
            propertyDict['tagName'] = tagName
        
        const value = await ( await element.getProperty( 'name' ) ).jsonValue();
        if (value !== "") 
            propertyDict['name'] = value
    }
    return propertyDict;
}

module.exports = {
    setupPage,
    getInputElements,
    closeBrowser
}
