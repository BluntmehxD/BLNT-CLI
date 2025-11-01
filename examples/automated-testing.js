#!/usr/bin/env node

/**
 * Example: Automated Testing
 * 
 * This example demonstrates browser-based automated testing.
 */

const { BrowserController } = require('blnt-cli');

async function testWebsite() {
  const browser = new BrowserController({
    headless: false,
    slowMo: 200,
  });

  const tests = [];

  try {
    console.log('🧪 Starting automated tests...\n');
    await browser.launch();

    // Test 1: Homepage loads
    console.log('Test 1: Homepage loads...');
    await browser.navigate('https://example.com');
    await browser.screenshot('test-homepage.png');
    tests.push({ name: 'Homepage loads', passed: true });

    // Test 2: Page title
    console.log('Test 2: Checking page title...');
    const page = browser.getPage();
    if (page) {
      const title = await page.title();
      const passed = title.includes('Example');
      tests.push({ name: 'Page title correct', passed });
      console.log(`   Title: "${title}" - ${passed ? '✅' : '❌'}`);
    }

    // Test 3: Element exists
    console.log('Test 3: Checking main content...');
    try {
      await browser.waitForSelector('h1', 5000);
      const heading = await browser.extractText('h1');
      tests.push({ name: 'Main heading exists', passed: true });
      console.log(`   Heading: "${heading}" - ✅`);
    } catch {
      tests.push({ name: 'Main heading exists', passed: false });
      console.log('   Heading not found - ❌');
    }

    // Summary
    console.log('\n📊 Test Summary:');
    const passed = tests.filter(t => t.passed).length;
    const total = tests.length;
    console.log(`   Passed: ${passed}/${total}`);
    
    tests.forEach(test => {
      console.log(`   ${test.passed ? '✅' : '❌'} ${test.name}`);
    });

    console.log('\n✅ Testing complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

testWebsite();
