import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { BrowserController } from '../integrations/browser-controller';
import { ConfigManager } from '../utils/config-manager';

export function BrowserCommand(program: Command): void {
  const browserCmd = program
    .command('browser')
    .description('Browser automation and control');

  browserCmd
    .command('launch')
    .description('Launch browser')
    .option('--headless', 'Run in headless mode')
    .option('--no-headless', 'Run with visible browser')
    .action(async (options) => {
      const configManager = new ConfigManager();
      await configManager.load();
      const config = configManager.get();

      const controller = new BrowserController({
        headless: options.headless ?? config.browser.headless,
        slowMo: config.browser.slowMo,
        recordVideo: config.browser.recordVideo,
      });

      await controller.launch();
      console.log(chalk.green('\n✓ Browser is now running'));
      console.log(chalk.gray('Use Ctrl+C to close the browser\n'));

      // Keep the process alive
      await new Promise(() => {});
    });

  browserCmd
    .command('navigate <url>')
    .description('Navigate to a URL')
    .option('--headless', 'Run in headless mode')
    .option('--screenshot', 'Take screenshot after navigation')
    .action(async (url, options) => {
      const configManager = new ConfigManager();
      await configManager.load();
      const config = configManager.get();

      const controller = new BrowserController({
        headless: options.headless ?? config.browser.headless,
        slowMo: config.browser.slowMo,
      });

      await controller.launch();
      await controller.navigate(url);

      if (options.screenshot) {
        await controller.screenshot();
      }

      if (config.browser.headless) {
        await controller.close();
      } else {
        console.log(chalk.gray('Press Ctrl+C to close the browser'));
        await new Promise(() => {});
      }
    });

  browserCmd
    .command('screenshot <url>')
    .description('Take a screenshot of a URL')
    .option('-o, --output <filename>', 'Output filename')
    .action(async (url, options) => {
      const configManager = new ConfigManager();
      await configManager.load();
      const config = configManager.get();

      const controller = new BrowserController({
        headless: true,
        slowMo: config.browser.slowMo,
      });

      await controller.launch();
      await controller.navigate(url);
      await controller.screenshot(options.output);
      await controller.close();
    });

  browserCmd
    .command('extract')
    .description('Extract data from a webpage')
    .option('-u, --url <url>', 'URL to extract from')
    .option('-s, --selector <selector>', 'CSS selector')
    .action(async (options) => {
      let url = options.url;
      let selector = options.selector;

      if (!url || !selector) {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'url',
            message: 'Enter URL:',
            when: !url,
          },
          {
            type: 'input',
            name: 'selector',
            message: 'Enter CSS selector:',
            when: !selector,
          },
        ]);

        url = url || answers.url;
        selector = selector || answers.selector;
      }

      const configManager = new ConfigManager();
      await configManager.load();
      const config = configManager.get();

      const controller = new BrowserController({
        headless: true,
        slowMo: config.browser.slowMo,
      });

      await controller.launch();
      await controller.navigate(url);
      
      const data = await controller.extractData(selector);
      console.log(chalk.cyan('\n=== Extracted Data ===\n'));
      console.log(JSON.stringify(data, null, 2));
      
      await controller.close();
    });

  browserCmd
    .command('execute')
    .description('Execute JavaScript in browser')
    .option('-u, --url <url>', 'URL to navigate to')
    .option('-s, --script <script>', 'JavaScript to execute')
    .action(async (options) => {
      let url = options.url;
      let script = options.script;

      if (!url || !script) {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'url',
            message: 'Enter URL:',
            when: !url,
          },
          {
            type: 'input',
            name: 'script',
            message: 'Enter JavaScript code:',
            when: !script,
          },
        ]);

        url = url || answers.url;
        script = script || answers.script;
      }

      const configManager = new ConfigManager();
      await configManager.load();
      const config = configManager.get();

      const controller = new BrowserController({
        headless: true,
        slowMo: config.browser.slowMo,
      });

      await controller.launch();
      await controller.navigate(url);
      
      const result = await controller.executeScript(script);
      console.log(chalk.cyan('\n=== Execution Result ===\n'));
      console.log(result);
      
      await controller.close();
    });
}
