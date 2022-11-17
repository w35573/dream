const puppeteer = require('puppeteer');

async function fetchData(username, videoUrl) {
    try {

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        await page.goto('https://redparty.netlify.app/');
        await page.type('#name1', username);
        await page.type('#url', `https://www.youtube.com/watch?v=${videoUrl}`);

        await page.click('#root > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(2) > form > div > div:nth-child(4) > button');

        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

        const url = page.url();

        await browser.close();

        return {
            url: url,
        };
    } catch (error) {
        console.log(error);
    }
}


exports.fetchData = fetchData;