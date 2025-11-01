import { chromium, Browser, Page, BrowserContext } from 'playwright';
import chalk from 'chalk';
import ora from 'ora';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface BrowserConfig {
  headless: boolean;
  slowMo: number;
  viewport?: { width: number; height: number };
  userAgent?: string;
  recordVideo: boolean;
}

export class BrowserController {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private config: BrowserConfig;

  constructor(config: Partial<BrowserConfig> = {}) {
    this.config = {
      headless: config.headless ?? false,
      slowMo: config.slowMo ?? 100,
      viewport: config.viewport,
      userAgent: config.userAgent,
      recordVideo: config.recordVideo ?? false,
    };
  }

  async launch(): Promise<void> {
    const spinner = ora(chalk.blue('Launching browser...')).start();
    
    try {
      this.browser = await chromium.launch({
        headless: this.config.headless,
        slowMo: this.config.slowMo,
      });

      const contextOptions: any = {};
      
      if (this.config.viewport) {
        contextOptions.viewport = this.config.viewport;
      }
      
      if (this.config.userAgent) {
        contextOptions.userAgent = this.config.userAgent;
      }
      
      if (this.config.recordVideo) {
        contextOptions.recordVideo = {
          dir: './screenshots/',
        };
      }

      this.context = await this.browser.newContext(contextOptions);
      this.page = await this.context.newPage();
      
      spinner.succeed(chalk.green('Browser launched successfully'));
    } catch (error) {
      spinner.fail(chalk.red('Failed to launch browser'));
      throw error;
    }
  }

  async navigate(url: string): Promise<void> {
    if (!this.page) {
      throw new Error('Browser not initialized. Call launch() first.');
    }

    const spinner = ora(chalk.blue(`Navigating to ${url}...`)).start();
    
    try {
      await this.page.goto(url, { waitUntil: 'networkidle' });
      spinner.succeed(chalk.green(`Navigated to ${url}`));
    } catch (error) {
      spinner.fail(chalk.red(`Failed to navigate to ${url}`));
      throw error;
    }
  }

  async click(selector: string): Promise<void> {
    if (!this.page) {
      throw new Error('Browser not initialized. Call launch() first.');
    }

    await this.page.click(selector);
  }

  async type(selector: string, text: string): Promise<void> {
    if (!this.page) {
      throw new Error('Browser not initialized. Call launch() first.');
    }

    await this.page.fill(selector, text);
  }

  async screenshot(filename?: string): Promise<string> {
    if (!this.page) {
      throw new Error('Browser not initialized. Call launch() first.');
    }

    const screenshotPath = filename || `screenshot-${Date.now()}.png`;
    const fullPath = path.join('./screenshots/', screenshotPath);
    
    await fs.mkdir('./screenshots/', { recursive: true });
    await this.page.screenshot({ path: fullPath });
    
    console.log(chalk.green(`Screenshot saved to ${fullPath}`));
    return fullPath;
  }

  async extractText(selector: string): Promise<string> {
    if (!this.page) {
      throw new Error('Browser not initialized. Call launch() first.');
    }

    const element = await this.page.$(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    return await element.textContent() || '';
  }

  async extractData(selector: string): Promise<any[]> {
    if (!this.page) {
      throw new Error('Browser not initialized. Call launch() first.');
    }

    return await this.page.$$eval(selector, (elements) => {
      return elements.map((el) => ({
        text: el.textContent,
        html: el.innerHTML,
        attributes: Object.fromEntries(
          Array.from(el.attributes).map((attr: any) => [attr.name, attr.value])
        ),
      }));
    });
  }

  /**
   * Execute JavaScript in the browser context.
   * 
   * WARNING: This method executes arbitrary JavaScript code in the browser.
   * Only use with trusted input. Never pass user-supplied code directly.
   * 
   * @param script JavaScript code to execute
   * @returns Result of the script execution
   */
  async executeScript(script: string): Promise<any> {
    if (!this.page) {
      throw new Error('Browser not initialized. Call launch() first.');
    }

    // Warning for security-conscious usage
    if (process.env.BLNT_STRICT_MODE === 'true') {
      console.warn(
        'WARNING: Executing arbitrary JavaScript in browser context. ' +
        'Ensure the script source is trusted.'
      );
    }

    return await this.page.evaluate(script);
  }

  async waitForSelector(selector: string, timeout: number = 30000): Promise<void> {
    if (!this.page) {
      throw new Error('Browser not initialized. Call launch() first.');
    }

    await this.page.waitForSelector(selector, { timeout });
  }

  async close(): Promise<void> {
    const spinner = ora(chalk.blue('Closing browser...')).start();
    
    try {
      if (this.context) {
        await this.context.close();
      }
      if (this.browser) {
        await this.browser.close();
      }
      
      this.page = null;
      this.context = null;
      this.browser = null;
      
      spinner.succeed(chalk.green('Browser closed'));
    } catch (error) {
      spinner.fail(chalk.red('Failed to close browser'));
      throw error;
    }
  }

  getPage(): Page | null {
    return this.page;
  }

  isInitialized(): boolean {
    return this.browser !== null && this.page !== null;
  }
}
