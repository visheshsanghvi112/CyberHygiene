const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const OUT_DIR = path.join(__dirname, '..', 'public', 'screenshots');

async function run() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  console.log('Launching Puppeteer browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. Landing Page
  console.log('1. Capturing Landing Page...');
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('h1');
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-01-landing-page.png'), fullPage: false });

  // 2. Survey Wizard (Step 1 -> Step 2)
  console.log('2. Capturing Survey Wizard...');
  await page.goto(`${BASE_URL}/survey`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('button');
  // Fill Step 1
  // Click Student
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('Student')) {
      await btn.click();
      break;
    }
  }
  // Click Next Step
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const nextBtn = btns.find(b => b.textContent.includes('Next Step'));
    if (nextBtn) nextBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-02-survey-wizard.png'), fullPage: false });

  // 3. Survey Submission & Receipt
  console.log('3. Completing survey for results receipt...');
  // Auto-answer steps 2 through 7
  for (let step = 2; step <= 7; step++) {
    await page.evaluate(() => {
      // Find all options on current screen and pick first option
      const optionContainers = Array.querySelectorAll ? document.querySelectorAll('.space-y-4, .space-y-6') : [];
      const optionBtns = Array.from(document.querySelectorAll('button')).filter(b => 
        !b.textContent.includes('Next Step') && 
        !b.textContent.includes('Previous') && 
        !b.textContent.includes('Submit')
      );
      if (optionBtns.length > 0) {
        // Click choices that aren't navigation
        optionBtns.slice(0, 3).forEach(b => b.click());
      }
      // Click next or submit
      const btns = Array.from(document.querySelectorAll('button'));
      const nextBtn = btns.find(b => b.textContent.includes('Next Step') || b.textContent.includes('Submit Assessment'));
      if (nextBtn) nextBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));
  }
  // Wait for submission response
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-03-survey-results.png'), fullPage: false });

  // 4. Admin Login Page
  console.log('4. Capturing Admin Login...');
  await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('input[type="email"]');
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-04-admin-login.png'), fullPage: false });

  // Authenticate Admin
  console.log('Authenticating as Admin...');
  await page.type('input[type="email"]', 'admin@college.edu');
  await page.type('input[type="password"]', 'CyberHygiene2026!');
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  // 5. Admin Dashboard (Top Overview / KPIs)
  console.log('5. Capturing Admin Dashboard Overview...');
  await page.waitForSelector('h1');
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-05-admin-dashboard.png'), fullPage: false });

  // 6. System Health & Posture Matrix (Scroll to Section 2)
  console.log('6. Capturing Posture Matrix...');
  await page.evaluate(() => {
    window.scrollTo(0, 480);
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-06-posture-matrix.png'), fullPage: false });

  // 7. Assessment Performance & Visual Analytics Charts
  console.log('7. Capturing Performance Charts...');
  await page.evaluate(() => {
    window.scrollTo(0, 1050);
  });
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-07-charts.png'), fullPage: false });

  // 8. Recommendations Action Engine
  console.log('8. Capturing Priority Recommendations...');
  await page.evaluate(() => {
    window.scrollTo(0, 2200);
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-08-recommendations.png'), fullPage: false });

  // 9. Responses Table
  console.log('9. Capturing Responses Management Table...');
  await page.goto(`${BASE_URL}/admin/responses`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('table');
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-09-responses-table.png'), fullPage: false });

  // 10. Audit Record Inspection Modal
  console.log('10. Capturing Record Inspection Modal...');
  await page.evaluate(() => {
    const inspectBtns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Inspect'));
    if (inspectBtns.length > 0) inspectBtns[0].click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-10-inspection-modal.png'), fullPage: false });

  // 11. Statistical Analysis & Hypothesis Testing
  console.log('11. Capturing Statistical Analysis...');
  await page.goto(`${BASE_URL}/admin/analysis`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('table');
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-11-analysis-stats.png'), fullPage: false });

  // 12. Hypothesis Testing Section (Scroll down)
  console.log('12. Capturing Hypothesis Testing...');
  await page.evaluate(() => {
    window.scrollTo(0, 750);
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-12-hypothesis-testing.png'), fullPage: false });

  // 13. Domain Risk Insights & Posture
  console.log('13. Capturing Domain Risk Insights...');
  await page.goto(`${BASE_URL}/admin/risk-insights`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('h1');
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-13-domain-risk-insights.png'), fullPage: false });

  // 14. Executive Assessment Report Generator
  console.log('14. Capturing Report Generator...');
  await page.goto(`${BASE_URL}/admin/reports`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('h1');
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-14-reports.png'), fullPage: false });

  // 15. CSV Export Hub & Data Dictionary
  console.log('15. Capturing Export Center...');
  await page.goto(`${BASE_URL}/admin/export`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('h1');
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-15-export-hub.png'), fullPage: false });

  // 16. System Settings & Database Lifecycle
  console.log('16. Capturing Settings Page...');
  await page.goto(`${BASE_URL}/admin/settings`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('h1');
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-16-settings.png'), fullPage: false });

  // Mobile Viewports (iPhone 14 / 15 Pro: 393 x 852)
  console.log('17. Capturing Mobile Screens...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });

  // 17. Mobile Home
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-17-mobile-home.png'), fullPage: false });

  // 18. Mobile Navigation Drawer
  console.log('18. Capturing Mobile Drawer Navigation...');
  await page.evaluate(() => {
    const menuBtn = document.querySelector('button[aria-label="Toggle navigation menu"]');
    if (menuBtn) menuBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-18-mobile-drawer.png'), fullPage: false });

  // 19. Mobile Survey Card
  console.log('19. Capturing Mobile Survey Card...');
  await page.goto(`${BASE_URL}/survey`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('h1');
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-19-mobile-survey.png'), fullPage: false });

  // 20. Mobile Responses Card View
  console.log('20. Capturing Mobile Responses Card View...');
  await page.goto(`${BASE_URL}/admin/responses`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('h1');
  await page.screenshot({ path: path.join(OUT_DIR, 'screenshot-20-mobile-responses.png'), fullPage: false });

  await browser.close();
  console.log('All 20 screenshots captured successfully in public/screenshots/!');
}

run().catch(err => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
