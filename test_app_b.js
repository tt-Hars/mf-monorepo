const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await page.click('a[href="/app-b"]');
  await page.waitForTimeout(2000);
  
  const content = await page.content();
  console.log('CONTENT:', content.substring(0, 1000));
  
  await browser.close();
})();
