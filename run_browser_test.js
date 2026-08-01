/* eslint-disable */
const puppeteer = require('puppeteer-core');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SCREENSHOT_PATH = 'C:\\Users\\ok\\.gemini\\antigravity-ide\\brain\\d1ebde3f-ccd6-451b-88b5-b1337bd3022f\\trace_subjects_result.png';

(async () => {
  console.log('🚀 Launching Edge browser for Full Subject Tracing Verification...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: false,
    defaultViewport: { width: 1024, height: 768 }
  });

  const page = await browser.newPage();
  await page.setCacheEnabled(false);

  console.log('🌐 1. Testing English Subject Tracing Worksheet (4-Line)...');
  await page.goto('http://localhost:3000/#/child/trace/english', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const engLabel = await page.evaluate(() => document.getElementById('trace-label')?.textContent);
  console.log('English Tracing Title:', engLabel);

  console.log('🌐 2. Testing Hindi Subject Tracing Worksheet (3-Line / 2-Line)...');
  await page.goto('http://localhost:3000/#/child/trace/hindi', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const hindiLabel = await page.evaluate(() => document.getElementById('trace-label')?.textContent);
  console.log('Hindi Tracing Title:', hindiLabel);

  console.log('🌐 3. Testing Maths Subject Tracing Worksheet (Math Boxes / Grid)...');
  await page.goto('http://localhost:3000/#/child/trace/maths', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const mathLabel = await page.evaluate(() => document.getElementById('trace-label')?.textContent);
  console.log('Maths Tracing Title:', mathLabel);

  // Perform drag gesture on Maths number 0
  const canvasInfo = await page.evaluate(() => {
    const canvas = document.getElementById('trace-canvas');
    if (!canvas) return { left: 0, top: 0, width: 0, height: 0 };
    const rect = canvas.getBoundingClientRect();
    return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
  });

  if (canvasInfo.width > 0) {
    const startX = canvasInfo.left + canvasInfo.width / 2;
    const startY = canvasInfo.top + canvasInfo.height * 0.3;
    const endY   = canvasInfo.top + canvasInfo.height * 0.7;

    console.log(`✏️ Performing drag gesture on Maths Number Tracing canvas...`);
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    for (let y = startY; y <= endY; y += 4) {
      await page.mouse.move(startX, y);
      await new Promise(r => setTimeout(r, 10));
    }
    await page.mouse.up();
    await new Promise(r => setTimeout(r, 500));

    const mathResult = await page.evaluate(() => {
      return {
        accuracyText: document.getElementById('accuracy-pct')?.textContent,
      };
    });
    console.log('Math Tracing Result:', mathResult);
  }

  await page.screenshot({ path: SCREENSHOT_PATH });
  console.log(`📸 Screenshot saved to ${SCREENSHOT_PATH}`);

  await browser.close();
  console.log('🎉 Full Subject Tracing Verification Finished Successfully!');
})();
