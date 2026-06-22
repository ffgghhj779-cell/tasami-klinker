import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const checks = {
    hasBrandName: await page.getByText('تسامي الصناعية').first().isVisible(),
    hasSlogan: await page.getByText('مواد · لوجستيات · حلول').first().isVisible(),
    headerVisible: await page.locator('header').isVisible(),
    noHorizontalScroll: await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2),
  };

  const outDir = path.join(__dirname, '..', 'public', 'brand', 'previews');
  fs.mkdirSync(outDir, { recursive: true });
  await page.locator('header').screenshot({ path: path.join(outDir, 'mobile-header-v2.png') });
  await page.screenshot({ path: path.join(outDir, 'mobile-hero-v2.png'), fullPage: false });

  console.log('Mobile checks:', JSON.stringify(checks, null, 2));
  await browser.close();
  process.exit(checks.hasBrandName && checks.hasSlogan && checks.noHorizontalScroll ? 0 : 1);
})();
