const puppeteer = require('puppeteer');

const interactiveElementTags = ['a', 'button', 'input'];
var page;
var browser;

const setupPage = async (webpageURL) => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(webpageURL);
    await page.addScriptTag({ path: './Public/CodeInjector.js' });
    await page.addStyleTag({ path: './Public/CodeInjector.css' });
    const html = await page.content();
    return html;
}

const grabPageData = async () => {
    const elementsDictionary = await getInteractiveElements();
    return elementsDictionary;
}

const closeBrowser = async () => {
    await browser.close();
}

async function getInteractiveElements() {
    const elementsDictionary = {};
    for (const tag of interactiveElementTags) {
        const interactableElements = await page.$$(tag);
        const elementsPropertyList = await elementsIterator(interactableElements)
        elementsDictionary[tag] = elementsPropertyList
    }
    return elementsDictionary;
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
        
        const value = await ( await element.getProperty( 'value' ) ).jsonValue();
        if (value !== "") 
            propertyDict['value'] = value

        const title = await ( await element.getProperty( 'title' ) ).jsonValue();
        if (title !== "") 
            propertyDict['title'] = title

        const text = await ( await element.getProperty( 'text' ) ).jsonValue();
        if (text !== "") 
            propertyDict['text'] = text
        const link = await ( await element.getProperty( 'href' ) ).jsonValue();
        if (link !== "") 
            propertyDict['link'] = link
        const style = await ( await element.getProperty( 'style' ) ).jsonValue();
        const isEmpty = checkIfJSONIsEmpty(style)
        if (!isEmpty) {
            propertyDict['style'] = style
            // const nodeList = await getStyleValue(element, style);
            // console.log(nodeList);
        }
        const dimensions = await element.boundingBox()
        if (dimensions !== null)
            propertyDict['dimensions'] = dimensions
    }
    return propertyDict;
}

function checkIfJSONIsEmpty(json) {
    for(var key in json) {
        if(json.hasOwnProperty(key))
            return false;
    }
    return true;
}

function calculateScreenshotHeight(websiteHeight, screenMaxHeight) {
    if (websiteHeight > screenMaxHeight) {
        return screenMaxHeight;
    }
    return websiteHeight;
}

module.exports = {
    setupPage,
    grabPageData,
    closeBrowser
}
