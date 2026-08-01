/* eslint-disable */
const puppeteer = require('puppeteer-core');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SCREENSHOT_PATH = 'C:\\Users\\ok\\.gemini\\antigravity-ide\\brain\\d1ebde3f-ccd6-451b-88b5-b1337bd3022f\\tuition_test_result.png';

(async () => {
  console.log('🚀 Launching Edge browser for Tuition Test Subject Verification...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: false,
    defaultViewport: { width: 1024, height: 768 }
  });

  const page = await browser.newPage();
  await page.setCacheEnabled(false);

  console.log('🌐 1. Testing Tuition Test Subject Worksheets List...');
  await page.goto('http://localhost:3000/#/child/subject/tuition', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const cardsCount = await page.evaluate(() => document.querySelectorAll('.worksheet-card').length);
  console.log('Tuition Worksheets Count:', cardsCount);

  console.log('🌐 2. Testing 4-Line English Tuition Test Sheet (tt_001)...');
  await page.goto('http://localhost:3000/#/child/play/tt_001', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  const hasDrawCanvas = await page.evaluate(() => !!document.getElementById('tuition-draw-canvas'));
  console.log('Has interactive drawing canvas?', hasDrawCanvas);

  // Perform drawing gesture on tuition sheet
  const canvasInfo = await page.evaluate(() => {
    const canvas = document.getElementById('tuition-draw-canvas');
    if (!canvas) return { left: 0, top: 0, width: 0, height: 0 };
    const rect = canvas.getBoundingClientRect();
    return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
  });

  if (canvasInfo.width > 0) {
    const startX = canvasInfo.left + 100;
    const startY = canvasInfo.top + 60;
    console.log('✏️ Drawing handwritten letters on 4-Line Tuition Sheet...');
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    for (let x = startX; x <= startX + 200; x += 5) {
      await page.mouse.move(x, startY + Math.sin(x / 10) * 15);
      await new Promise(r => setTimeout(r, 10));
    }
    await page.mouse.up();
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('🌐 3. Testing 3-Line Hindi Tuition Test Sheet (tt_002)...');
  await page.goto('http://localhost:3000/#/child/play/tt_002', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  console.log('🌐 4. Testing Grid Box Maths Tuition Test Sheet (tt_003)...');
  await page.goto('http://localhost:3000/#/child/play/tt_003', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  console.log('🌐 5. Testing Tuition Test Print Preview (tt_001)...');
  await page.goto('http://localhost:3000/#/mentor/print/tt_001', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({ path: SCREENSHOT_PATH });
  console.log(`📸 Screenshot saved to ${SCREENSHOT_PATH}`);

  await browser.close();
  console.log('🎉 Tuition Test Verification Finished Successfully!');
})();
