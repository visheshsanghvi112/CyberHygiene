const puppeteer = require('puppeteer');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const OUT_DIR = path.join(__dirname, '..', 'public', 'screenshots');

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // Create clean incognito context for survey
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });

  console.log('19. Capturing Mobile Survey Card...');
  await page.goto(`${BASE_URL}/survey`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-19-mobile-survey.png'), fullPage: false });

  // Authenticate admin in this context to view admin responses on mobile
  console.log('Authenticating Admin for mobile...');
  await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'networkidle0' });
  await page.type('input[type="email"]', 'admin@college.edu');
  await page.type('input[type="password"]', 'CyberHygiene2026!');
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  console.log('20. Capturing Mobile Responses Card View...');
  await page.goto(`${BASE_URL}/admin/responses`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-20-mobile-responses.png'), fullPage: false });

  await browser.close();
  console.log('Screenshots 19 & 20 captured successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
