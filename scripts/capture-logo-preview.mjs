import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const browser = await chromium.launch();
  const outDir = path.join(__dirname, '..', 'public', 'brand', 'previews');
  fs.mkdirSync(outDir, { recursive: true });

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await desktop.waitForTimeout(1200);
  await desktop.locator('header').screenshot({ path: path.join(outDir, 'header-desktop.png') });

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  await mobile.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobile.waitForTimeout(1200);
  await mobile.locator('header').screenshot({ path: path.join(outDir, 'header-mobile.png') });

  await browser.close();
  console.log('Saved:', outDir);
})();
