/* eslint-disable */
const puppeteer = require('puppeteer-core');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  console.log('🚀 Debugging custom_1785618174633 in Edge...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: false,
    defaultViewport: { width: 1024, height: 768 }
  });

  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  await page.goto('http://localhost:3000/#/child/play/custom_1785618174633', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  const url = page.url();
  console.log('Current URL after navigation:', url);

  const html = await page.evaluate(() => document.getElementById('app')?.innerHTML);
  console.log('App HTML content preview:', html ? html.slice(0, 300) : 'EMPTY');

  await browser.close();
})();
