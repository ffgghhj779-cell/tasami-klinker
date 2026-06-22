const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const outDir = path.join(__dirname, 'public', 'brand', 'previews');
  require('fs').mkdirSync(outDir, { recursive: true });

  const header = page.locator('header');
  await header.screenshot({ path: path.join(outDir, 'header-logo.png') });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);

  const footer = page.locator('footer');
  await footer.screenshot({ path: path.join(outDir, 'footer-logo.png') });

  await browser.close();
  console.log('Screenshots saved to public/brand/previews/');
})();
