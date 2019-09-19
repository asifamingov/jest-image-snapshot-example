import puppeteer from 'puppeteer-core';
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

it('Visual regression test', async () => {
  const browser = await puppeteer.launch({
    executablePath: './node_modules/chromium/lib/chromium/chrome-linux/chrome',
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1800 });
  await page.goto('http://localhost:8089/index-page.html');
  const image = await page.screenshot({ fullPage: true });
  browser.close();
  expect(image).toMatchImageSnapshot();
});
