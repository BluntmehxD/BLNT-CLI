#!/usr/bin/env node

/**
 * Example: Web Scraper
 * 
 * This example demonstrates how to use BLNT-CLI to scrape data from a website.
 */

const { BrowserController } = require('blnt-cli');

async function scrapeHackerNews() {
  const browser = new BrowserController({
    headless: true,
    slowMo: 50,
  });

  try {
    console.log('🚀 Launching browser...');
    await browser.launch();

    console.log('🌐 Navigating to Hacker News...');
    await browser.navigate('https://news.ycombinator.com');

    console.log('📊 Extracting stories...');
    const stories = await browser.extractData('.storylink');

    console.log('\n=== Top Stories ===\n');
    stories.slice(0, 10).forEach((story, index) => {
      console.log(`${index + 1}. ${story.text}`);
    });

    console.log('\n📸 Taking screenshot...');
    await browser.screenshot('hackernews.png');

    console.log('✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

scrapeHackerNews();
