/* eslint-disable */
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const appJs = fs.readFileSync('pwa/js/app.js', 'utf8');

const html = `<!DOCTYPE html>
<html>
<head><title>Test</title></head>
<body>
  <div id="app"></div>
</body>
</html>`;

const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'http://localhost:3000/#/child/trace/english' });
const { window } = dom;

// Polyfill canvas context for jsdom
window.HTMLCanvasElement.prototype.getContext = function() {
  return {
    clearRect: () => {},
    fillRect: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
    fillText: () => {},
    strokeText: () => {},
    save: () => {},
    restore: () => {},
    setLineDash: () => {},
    getImageData: () => ({ data: new Uint8Array(480 * 260 * 4) }),
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 480, height: 260 }),
  };
};

window.HTMLCanvasElement.prototype.getBoundingClientRect = function() {
  return { left: 0, top: 0, width: 480, height: 260 };
};

const script = window.document.createElement('script');
script.textContent = appJs;
window.document.head.appendChild(script);

console.log('--- Testing renderTracingPractice ---');
window.renderTracingPractice('english');

console.log('App HTML after renderTracingPractice:');
console.log(window.document.getElementById('app').innerHTML.slice(0, 300));

console.log('\n--- Testing setSheetType("3-line") ---');
window.setSheetType('3-line');

console.log('\n--- Testing loadLetter(0) ---');
window.loadLetter(0);

const canvas = window.document.getElementById('trace-canvas');
console.log('Canvas element exists?', !!canvas);
if (canvas) {
  console.log('Canvas id:', canvas.id);
  console.log('Canvas style:', canvas.style.cssText);
}
