const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function scrapeData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://github.com/Pakked/InterestingProjectsJS');
    const html = await page.content();
    const $ = cheerio.load(html);
    const data = $('#repo-content-turbo-frame').text();
    console.log(data);
    await browser.close();
}

scrapeData();
