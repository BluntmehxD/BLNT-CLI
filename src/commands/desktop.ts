import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { DesktopController } from '../integrations/desktop-controller';

export function DesktopCommand(program: Command): void {
  const desktopCmd = program
    .command('desktop')
    .description('Desktop automation and control');

  desktopCmd
    .command('info')
    .description('Get system information')
    .action(async () => {
      const controller = new DesktopController({ verbose: true });
      const info = await controller.getSystemInfo();
      
      console.log(chalk.cyan('\n=== System Information ===\n'));
      console.log(chalk.white(`Platform: ${info.platform}`));
      console.log(chalk.white(`Architecture: ${info.arch}`));
      console.log(chalk.white(`Node Version: ${info.nodeVersion}`));
      
      if (info.details) {
        console.log(chalk.gray('\nDetailed Information:'));
        console.log(info.details);
      }
    });

  desktopCmd
    .command('exec <command>')
    .description('Execute a system command')
    .option('-v, --verbose', 'Verbose output')
    .action(async (command, options) => {
      const controller = new DesktopController({ verbose: options.verbose });
      
      try {
        const output = await controller.executeCommand(command);
        console.log(chalk.cyan('\n=== Command Output ===\n'));
        console.log(output);
      } catch (error: any) {
        console.error(chalk.red('Error:'), error.message);
      }
    });

  desktopCmd
    .command('processes')
    .description('List running processes')
    .action(async () => {
      const controller = new DesktopController({ verbose: false });
      
      try {
        const processes = await controller.listProcesses();
        console.log(chalk.cyan('\n=== Running Processes ===\n'));
        console.log(processes);
      } catch (error: any) {
        console.error(chalk.red('Error:'), error.message);
      }
    });

  desktopCmd
    .command('open <app>')
    .description('Open an application')
    .action(async (app) => {
      const controller = new DesktopController({ verbose: true });
      
      try {
        await controller.openApplication(app);
      } catch (error: any) {
        console.error(chalk.red('Error:'), error.message);
      }
    });

  desktopCmd
    .command('kill <process>')
    .description('Kill a process')
    .action(async (process) => {
      const answers = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `Are you sure you want to kill process "${process}"?`,
          default: false,
        },
      ]);

      if (!answers.confirm) {
        console.log(chalk.yellow('Operation cancelled'));
        return;
      }

      const controller = new DesktopController({ verbose: true });
      
      try {
        await controller.killProcess(process);
      } catch (error: any) {
        console.error(chalk.red('Error:'), error.message);
      }
    });

  desktopCmd
    .command('notify')
    .description('Send a desktop notification')
    .option('-t, --title <title>', 'Notification title')
    .option('-m, --message <message>', 'Notification message')
    .action(async (options) => {
      let title = options.title;
      let message = options.message;

      if (!title || !message) {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Notification title:',
            when: !title,
          },
          {
            type: 'input',
            name: 'message',
            message: 'Notification message:',
            when: !message,
          },
        ]);

        title = title || answers.title;
        message = message || answers.message;
      }

      const controller = new DesktopController();
      await controller.sendNotification(title, message);
      console.log(chalk.green('✓ Notification sent'));
    });

  desktopCmd
    .command('clipboard')
    .description('Clipboard operations')
    .option('-g, --get', 'Get clipboard content')
    .option('-s, --set <text>', 'Set clipboard content')
    .action(async (options) => {
      const controller = new DesktopController();

      if (options.get) {
        try {
          const content = await controller.getClipboard();
          console.log(chalk.cyan('\n=== Clipboard Content ===\n'));
          console.log(content);
        } catch (error: any) {
          console.error(chalk.red('Error:'), error.message);
        }
      } else if (options.set) {
        try {
          await controller.setClipboard(options.set);
        } catch (error: any) {
          console.error(chalk.red('Error:'), error.message);
        }
      } else {
        console.log(chalk.yellow('Please specify --get or --set'));
      }
    });

  desktopCmd
    .command('env')
    .description('Environment variable operations')
    .option('-l, --list', 'List all environment variables')
    .option('-g, --get <key>', 'Get environment variable')
    .option('-s, --set <key=value>', 'Set environment variable')
    .action(async (options) => {
      const controller = new DesktopController();

      if (options.list) {
        const env = await controller.getEnvironmentVariables();
        console.log(chalk.cyan('\n=== Environment Variables ===\n'));
        Object.entries(env).forEach(([key, value]) => {
          console.log(`${chalk.green(key)}: ${value}`);
        });
      } else if (options.get) {
        const env = await controller.getEnvironmentVariables();
        console.log(chalk.cyan(`\n${options.get}:`), env[options.get]);
      } else if (options.set) {
        const [key, value] = options.set.split('=');
        await controller.setEnvironmentVariable(key, value);
      } else {
        console.log(chalk.yellow('Please specify --list, --get, or --set'));
      }
    });

  desktopCmd
    .command('screenshot')
    .description('Capture desktop screenshot')
    .option('-o, --output <filename>', 'Output filename', 'desktop-screenshot.png')
    .action(async (options) => {
      const controller = new DesktopController({ verbose: true });
      
      try {
        await controller.captureScreenshot(options.output);
      } catch (error: any) {
        console.error(chalk.red('Error:'), error.message);
        console.log(chalk.yellow('Note: Screenshot capture requires additional system tools'));
      }
    });
}
