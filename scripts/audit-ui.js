const puppeteer = require('puppeteer');

const VIEWPORTS = [
  { name: 'Mobile-Small (360x740)', width: 360, height: 740 },
  { name: 'Mobile-iPhone (390x844)', width: 390, height: 844 },
  { name: 'Tablet-iPad (768x1024)', width: 768, height: 1024 },
  { name: 'Desktop (1440x900)', width: 1440, height: 900 }
];

const ROUTES = [
  '/',
  '/about',
  '/survey',
  '/admin/login',
  '/admin/dashboard',
  '/admin/responses',
  '/admin/analysis',
  '/admin/risk-insights',
  '/admin/reports',
  '/admin/export',
  '/admin/settings'
];

async function runAudit() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const issues = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      issues.push({ type: 'CONSOLE_ERROR', text: msg.text(), location: page.url() });
    }
  });

  page.on('pageerror', err => {
    issues.push({ type: 'PAGE_ERROR', text: err.toString(), location: page.url() });
  });

  // Login as admin first to set the cookie
  console.log('Logging in as admin...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle0' });
  await page.type('input[type="email"]', 'admin@college.edu');
  await page.type('input[type="password"]', 'CyberHygiene2026!');
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  console.log('Logged in successfully. Beginning comprehensive UI audit across viewports and routes...\n');

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    console.log(`=== AUDITING VIEWPORT: ${vp.name} ===`);

    for (const route of ROUTES) {
      const url = `http://localhost:3000${route}`;
      await page.goto(url, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 600)); // wait for charts / transitions

      // 1. Check Horizontal Overflow
      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;
        const maxScroll = Math.max(scrollWidth, bodyScrollWidth);
        const hasOverflow = maxScroll > docWidth;
        
        let offendingElements = [];
        if (hasOverflow) {
          const allElements = Array.from(document.querySelectorAll('*'));
          for (const el of allElements) {
            const rect = el.getBoundingClientRect();
            if (rect.right > docWidth + 1) { // 1px threshold for rounding
              offendingElements.push({
                tag: el.tagName,
                className: el.className?.toString().substring(0, 100),
                id: el.id,
                right: rect.right,
                width: rect.width,
                docWidth: docWidth
              });
            }
          }
        }
        return { hasOverflow, docWidth, maxScroll, offendingElements: offendingElements.slice(0, 5) };
      });

      if (overflow.hasOverflow) {
        console.warn(`[OVERFLOW] ${vp.name} at ${route}: scrollWidth ${overflow.maxScroll} > clientWidth ${overflow.docWidth}`);
        issues.push({
          type: 'HORIZONTAL_OVERFLOW',
          viewport: vp.name,
          route,
          docWidth: overflow.docWidth,
          maxScroll: overflow.maxScroll,
          offenders: overflow.offendingElements
        });
      }

      // 2. Check Touch Targets for mobile viewports (< 32px on interactive elements)
      if (vp.width <= 400) {
        const smallTouchTargets = await page.evaluate(() => {
          const interactives = Array.from(document.querySelectorAll('button, a, input, select'));
          const smallOnes = [];
          for (const el of interactives) {
            const rect = el.getBoundingClientRect();
            // Visible only
            if (rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0) {
              if (rect.height < 28 || rect.width < 28) {
                smallOnes.push({
                  tag: el.tagName,
                  text: (el.innerText || el.getAttribute('aria-label') || '').trim().substring(0, 30),
                  className: el.className?.toString().substring(0, 60),
                  width: Math.round(rect.width),
                  height: Math.round(rect.height)
                });
              }
            }
          }
          return smallOnes.slice(0, 5);
        });

        if (smallTouchTargets.length > 0) {
          // Note small touch targets
          issues.push({
            type: 'SMALL_TOUCH_TARGETS',
            viewport: vp.name,
            route,
            targets: smallTouchTargets
          });
        }
      }

      // 3. Check for Broken Images
      const brokenImages = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs
          .filter(img => !img.complete || img.naturalWidth === 0)
          .map(img => img.src);
      });

      if (brokenImages.length > 0) {
        console.warn(`[BROKEN_IMAGE] at ${route}:`, brokenImages);
        issues.push({
          type: 'BROKEN_IMAGES',
          viewport: vp.name,
          route,
          images: brokenImages
        });
      }
    }
  }

  // Interactive UI Test: Modal on /admin/responses
  console.log('\n=== TESTING RESPONSES MODAL INTERACTION ===');
  for (const vp of [VIEWPORTS[1], VIEWPORTS[3]]) { // iPhone & Desktop
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000/admin/responses', { waitUntil: 'networkidle0' });
    
    // Check if Inspect button is clickable
    const inspectBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.innerText.includes('Inspect') || b.getAttribute('title')?.includes('Inspect')) || null;
    });
    if (inspectBtn && inspectBtn.asElement()) {
      await page.evaluate(el => el.click(), inspectBtn);
      await new Promise(r => setTimeout(r, 400));
      const modalVisible = await page.evaluate(() => {
        const modal = document.querySelector('[role="dialog"], .fixed.inset-0');
        if (!modal) return false;
        const rect = modal.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
      console.log(`Inspect Modal on ${vp.name}: visible = ${modalVisible}`);

      // Check modal overflow
      const modalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      if (modalOverflow) {
        console.warn(`[MODAL_OVERFLOW] on ${vp.name}`);
        issues.push({ type: 'MODAL_OVERFLOW', viewport: vp.name });
      }

      // Close modal
      await page.evaluate(() => {
        const closeBtn = Array.from(document.querySelectorAll('button')).find(b => 
          b.getAttribute('aria-label') === 'Close modal' || b.innerText.includes('Close')
        );
        if (closeBtn) closeBtn.click();
      });
    }
  }

  // Check iOS Safari auto-zoom risk (inputs/selects with font-size < 16px on mobile)
  console.log('\n=== TESTING MOBILE FORM INPUT FONT SIZES (iOS AUTO-ZOOM AUDIT) ===');
  await page.setViewport({ width: 390, height: 844 });
  for (const route of ['/admin/login', '/survey', '/admin/responses']) {
    await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle0' });
    const smallInputs = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
      const small = [];
      for (const el of inputs) {
        if (el.type === 'hidden' || el.type === 'radio' || el.type === 'checkbox') continue;
        const comp = window.getComputedStyle(el);
        const fontSize = parseFloat(comp.fontSize);
        if (fontSize < 16) {
          small.push({
            tag: el.tagName,
            type: el.type,
            name: el.name || el.id || el.placeholder,
            fontSize: `${fontSize}px`,
            className: el.className?.substring(0, 50)
          });
        }
      }
      return small;
    });
    if (smallInputs.length > 0) {
      console.warn(`[IOS_AUTO_ZOOM_RISK] at ${route}: inputs with font-size < 16px trigger iOS viewport jump`, smallInputs);
      issues.push({ type: 'IOS_AUTO_ZOOM_RISK', route, smallInputs });
    }
  }

  // Interactive UI Test: Mobile Drawer Toggle on Home
  console.log('\n=== TESTING MOBILE DRAWER INTERACTION ===');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  const toggleBtn = await page.$('button[aria-label="Toggle navigation menu"]');
  if (toggleBtn) {
    await toggleBtn.click();
    await new Promise(r => setTimeout(r, 300));
    const drawerOpen = await page.evaluate(() => {
      return document.body.innerText.includes('Close menu') || document.querySelector('.backdrop-blur-xl') !== null;
    });
    const drawerOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log(`Mobile Drawer Open: ${drawerOpen}, Overflow: ${drawerOverflow}`);
    if (drawerOverflow) {
      issues.push({ type: 'DRAWER_OVERFLOW', viewport: 'Mobile-iPhone (390x844)' });
    }
    // Close drawer
    await toggleBtn.click();
  }

  console.log('\n================ AUDIT SUMMARY ================');
  console.log(`Total issues identified: ${issues.length}`);
  console.log(JSON.stringify(issues, null, 2));

  await browser.close();
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
