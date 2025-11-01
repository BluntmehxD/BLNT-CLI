import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { ConfigManager } from '../utils/config-manager';

export function ConfigCommand(program: Command): void {
  const configCmd = program
    .command('config')
    .description('Configuration management');

  configCmd
    .command('show')
    .description('Show current configuration')
    .action(async () => {
      const configManager = new ConfigManager();
      await configManager.load();
      await configManager.show();
    });

  configCmd
    .command('set <key> <value>')
    .description('Set a configuration value')
    .action(async (key, value) => {
      const configManager = new ConfigManager();
      await configManager.load();

      // Parse value (try to convert to appropriate type)
      let parsedValue: any = value;
      if (value === 'true') parsedValue = true;
      else if (value === 'false') parsedValue = false;
      else if (!isNaN(Number(value))) parsedValue = Number(value);

      configManager.set(key, parsedValue);
      await configManager.save();

      console.log(chalk.green(`✓ Configuration updated: ${key} = ${parsedValue}`));
    });

  configCmd
    .command('reset')
    .description('Reset configuration to defaults')
    .action(async () => {
      const answers = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Are you sure you want to reset configuration to defaults?',
          default: false,
        },
      ]);

      if (!answers.confirm) {
        console.log(chalk.yellow('Operation cancelled'));
        return;
      }

      const configManager = new ConfigManager();
      await configManager.reset();
    });

  configCmd
    .command('init')
    .description('Initialize configuration with interactive setup')
    .action(async () => {
      console.log(chalk.cyan('\n=== BLNT-CLI Configuration Setup ===\n'));

      const answers = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'browserHeadless',
          message: 'Run browser in headless mode by default?',
          default: false,
        },
        {
          type: 'number',
          name: 'browserSlowMo',
          message: 'Browser slow motion delay (ms):',
          default: 100,
        },
        {
          type: 'confirm',
          name: 'browserRecordVideo',
          message: 'Record video of browser sessions?',
          default: false,
        },
        {
          type: 'number',
          name: 'agentMaxConcurrentTasks',
          message: 'Maximum concurrent agent tasks:',
          default: 3,
        },
        {
          type: 'number',
          name: 'agentTimeout',
          message: 'Agent task timeout (ms):',
          default: 60000,
        },
        {
          type: 'confirm',
          name: 'agentVerbose',
          message: 'Enable verbose agent output?',
          default: false,
        },
        {
          type: 'list',
          name: 'logLevel',
          message: 'Log level:',
          choices: ['info', 'warn', 'error', 'debug'],
          default: 'info',
        },
      ]);

      const configManager = new ConfigManager();
      await configManager.save({
        browser: {
          headless: answers.browserHeadless,
          slowMo: answers.browserSlowMo,
          recordVideo: answers.browserRecordVideo,
        },
        agent: {
          maxConcurrentTasks: answers.agentMaxConcurrentTasks,
          timeout: answers.agentTimeout,
          retryAttempts: 2,
          verbose: answers.agentVerbose,
        },
        desktop: {
          verbose: false,
        },
        general: {
          defaultEditor: 'nano',
          logLevel: answers.logLevel,
        },
      });

      console.log(chalk.green('\n✓ Configuration saved successfully'));
    });
}
