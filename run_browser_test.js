/* eslint-disable */
const puppeteer = require('puppeteer-core');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

(async () => {
  console.log('🚀 Launching Edge browser for Sheet Type Dropdown Persistence Verification...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: false,
    defaultViewport: { width: 1024, height: 768 }
  });

  const page = await browser.newPage();
  await page.setCacheEnabled(false);

  console.log('🌐 1. Opening Mentor Builder to edit Hindi Copy Work (tt_002)...');
  await page.goto('http://localhost:3000/#/mentor/builder/tt_002', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const selectedValue002 = await page.evaluate(() => document.getElementById('ws-sheet-type')?.value);
  console.log('Sheet Type Dropdown Value for tt_002:', selectedValue002);

  console.log('🌐 2. Opening Mentor Builder for Maths Numbers Test (tt_003 - Grid)...');
  await page.goto('http://localhost:3000/#/mentor/builder/tt_003', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const selectedValue003 = await page.evaluate(() => document.getElementById('ws-sheet-type')?.value);
  console.log('Sheet Type Dropdown Value for tt_003:', selectedValue003);

  console.log('🌐 3. Changing tt_003 to 3-line, saving, and re-opening to verify persistence...');
  await page.evaluate(() => {
    const sel = document.getElementById('ws-sheet-type');
    if (sel) {
      sel.value = '3-line';
      sel.dispatchEvent(new Event('change'));
    }
  });

  await page.click('#btn-save-ws');
  await new Promise(r => setTimeout(r, 1000));

  await page.goto('http://localhost:3000/#/mentor/builder/tt_003', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const reSelectedValue = await page.evaluate(() => document.getElementById('ws-sheet-type')?.value);
  console.log('Re-opened Sheet Type Dropdown Value for tt_003:', reSelectedValue);

  await browser.close();
  console.log('🎉 Sheet Type Persistence Verification Finished Successfully!');
})();
