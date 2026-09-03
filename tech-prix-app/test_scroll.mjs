import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => {
    errors.push(err.message);
  });

  await page.goto('http://localhost:3000');
  
  // Wait a bit and scroll down
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(500);
  
  console.log("ERRORS:", JSON.stringify(errors, null, 2));
  
  await browser.close();
})();
