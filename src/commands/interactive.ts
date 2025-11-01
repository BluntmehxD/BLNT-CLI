import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { BrowserController } from '../integrations/browser-controller';
import { DesktopController } from '../integrations/desktop-controller';
import { AutonomousAgent, Task } from '../agents/autonomous-agent';
import { ConfigManager } from '../utils/config-manager';

export function InteractiveCommand(program: Command): void {
  program
    .command('interactive')
    .alias('i')
    .description('Start interactive mode')
    .action(async () => {
      console.log(chalk.cyan('\n╔════════════════════════════════════════╗'));
      console.log(chalk.cyan('║     BLNT-CLI Interactive Mode          ║'));
      console.log(chalk.cyan('╚════════════════════════════════════════╝\n'));

      const configManager = new ConfigManager();
      await configManager.load();
      const config = configManager.get();

      let running = true;

      while (running) {
        const { action } = await inquirer.prompt([
          {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
              { name: '🌐 Browser Automation', value: 'browser' },
              { name: '🖥️  Desktop Control', value: 'desktop' },
              { name: '🤖 Autonomous Agent', value: 'agent' },
              { name: '⚙️  Configuration', value: 'config' },
              { name: '📊 System Info', value: 'info' },
              { name: '❌ Exit', value: 'exit' },
            ],
          },
        ]);

        switch (action) {
          case 'browser':
            await handleBrowserActions(config);
            break;
          case 'desktop':
            await handleDesktopActions();
            break;
          case 'agent':
            await handleAgentActions(config);
            break;
          case 'config':
            await handleConfigActions(configManager);
            break;
          case 'info':
            await handleSystemInfo();
            break;
          case 'exit':
            running = false;
            console.log(chalk.green('\n👋 Goodbye!\n'));
            break;
        }
      }
    });
}

async function handleBrowserActions(config: any): Promise<void> {
  const { browserAction } = await inquirer.prompt([
    {
      type: 'list',
      name: 'browserAction',
      message: 'Browser action:',
      choices: [
        'Navigate to URL',
        'Take Screenshot',
        'Extract Data',
        'Execute Script',
        'Back',
      ],
    },
  ]);

  if (browserAction === 'Back') return;

  const controller = new BrowserController({
    headless: config.browser.headless,
    slowMo: config.browser.slowMo,
  });

  try {
    await controller.launch();

    switch (browserAction) {
      case 'Navigate to URL': {
        const { url } = await inquirer.prompt([
          {
            type: 'input',
            name: 'url',
            message: 'Enter URL:',
            validate: (input) => input.length > 0 || 'URL cannot be empty',
          },
        ]);
        await controller.navigate(url);
        console.log(chalk.green('✓ Navigated successfully'));
        break;
      }

      case 'Take Screenshot': {
        const { url, filename } = await inquirer.prompt([
          {
            type: 'input',
            name: 'url',
            message: 'Enter URL:',
          },
          {
            type: 'input',
            name: 'filename',
            message: 'Filename (optional):',
          },
        ]);
        if (url) await controller.navigate(url);
        await controller.screenshot(filename);
        break;
      }

      case 'Extract Data': {
        const { url, selector } = await inquirer.prompt([
          {
            type: 'input',
            name: 'url',
            message: 'Enter URL:',
          },
          {
            type: 'input',
            name: 'selector',
            message: 'CSS Selector:',
          },
        ]);
        await controller.navigate(url);
        const data = await controller.extractData(selector);
        console.log(chalk.cyan('\n=== Extracted Data ===\n'));
        console.log(JSON.stringify(data, null, 2));
        break;
      }

      case 'Execute Script': {
        const { url, script } = await inquirer.prompt([
          {
            type: 'input',
            name: 'url',
            message: 'Enter URL:',
          },
          {
            type: 'input',
            name: 'script',
            message: 'JavaScript code:',
          },
        ]);
        await controller.navigate(url);
        const result = await controller.executeScript(script);
        console.log(chalk.cyan('\n=== Result ===\n'));
        console.log(result);
        break;
      }
    }

    if (!config.browser.headless) {
      const { close } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'close',
          message: 'Close browser?',
          default: true,
        },
      ]);
      if (close) {
        await controller.close();
      }
    } else {
      await controller.close();
    }
  } catch (error: any) {
    console.error(chalk.red('Error:'), error.message);
    await controller.close();
  }
}

async function handleDesktopActions(): Promise<void> {
  const { desktopAction } = await inquirer.prompt([
    {
      type: 'list',
      name: 'desktopAction',
      message: 'Desktop action:',
      choices: [
        'Execute Command',
        'List Processes',
        'Open Application',
        'Send Notification',
        'Clipboard Operations',
        'Back',
      ],
    },
  ]);

  if (desktopAction === 'Back') return;

  const controller = new DesktopController({ verbose: true });

  switch (desktopAction) {
    case 'Execute Command': {
      const { command } = await inquirer.prompt([
        {
          type: 'input',
          name: 'command',
          message: 'Enter command:',
        },
      ]);
      const output = await controller.executeCommand(command);
      console.log(chalk.cyan('\n=== Output ===\n'));
      console.log(output);
      break;
    }

    case 'List Processes': {
      const processes = await controller.listProcesses();
      console.log(chalk.cyan('\n=== Processes ===\n'));
      console.log(processes);
      break;
    }

    case 'Open Application': {
      const { app } = await inquirer.prompt([
        {
          type: 'input',
          name: 'app',
          message: 'Application name:',
        },
      ]);
      await controller.openApplication(app);
      break;
    }

    case 'Send Notification': {
      const { title, message } = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Title:',
        },
        {
          type: 'input',
          name: 'message',
          message: 'Message:',
        },
      ]);
      await controller.sendNotification(title, message);
      break;
    }

    case 'Clipboard Operations': {
      const { clipAction } = await inquirer.prompt([
        {
          type: 'list',
          name: 'clipAction',
          message: 'Clipboard action:',
          choices: ['Get', 'Set'],
        },
      ]);

      if (clipAction === 'Get') {
        const content = await controller.getClipboard();
        console.log(chalk.cyan('\n=== Clipboard ===\n'));
        console.log(content);
      } else {
        const { text } = await inquirer.prompt([
          {
            type: 'input',
            name: 'text',
            message: 'Text to copy:',
          },
        ]);
        await controller.setClipboard(text);
      }
      break;
    }
  }
}

async function handleAgentActions(config: any): Promise<void> {
  const { goal } = await inquirer.prompt([
    {
      type: 'input',
      name: 'goal',
      message: 'What is the agent goal/objective?',
      validate: (input) => input.length > 0 || 'Goal cannot be empty',
    },
  ]);

  console.log(chalk.cyan(`\n🤖 Starting agent with goal: ${goal}\n`));

  const agent = new AutonomousAgent(config.agent);

  const task: Task = {
    id: `task-${Date.now()}`,
    description: goal,
    type: 'composite',
    status: 'pending',
  };

  await agent.executeTask(task);
  console.log(chalk.green('\n✓ Agent completed the task'));
}

async function handleConfigActions(configManager: ConfigManager): Promise<void> {
  const { configAction } = await inquirer.prompt([
    {
      type: 'list',
      name: 'configAction',
      message: 'Configuration action:',
      choices: ['Show Config', 'Edit Config', 'Reset Config', 'Back'],
    },
  ]);

  switch (configAction) {
    case 'Show Config':
      await configManager.show();
      break;

    case 'Edit Config': {
      const { key, value } = await inquirer.prompt([
        {
          type: 'input',
          name: 'key',
          message: 'Configuration key (e.g., browser.headless):',
        },
        {
          type: 'input',
          name: 'value',
          message: 'New value:',
        },
      ]);

      let parsedValue: any = value;
      if (value === 'true') parsedValue = true;
      else if (value === 'false') parsedValue = false;
      else if (!isNaN(Number(value))) parsedValue = Number(value);

      configManager.set(key, parsedValue);
      await configManager.save();
      console.log(chalk.green(`✓ Updated ${key} = ${parsedValue}`));
      break;
    }

    case 'Reset Config': {
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Reset to defaults?',
          default: false,
        },
      ]);
      if (confirm) {
        await configManager.reset();
      }
      break;
    }
  }
}

async function handleSystemInfo(): Promise<void> {
  const controller = new DesktopController({ verbose: false });
  const info = await controller.getSystemInfo();

  console.log(chalk.cyan('\n╔════════════════════════════════════════╗'));
  console.log(chalk.cyan('║        System Information              ║'));
  console.log(chalk.cyan('╚════════════════════════════════════════╝\n'));

  console.log(chalk.white(`Platform:      ${info.platform}`));
  console.log(chalk.white(`Architecture:  ${info.arch}`));
  console.log(chalk.white(`Node Version:  ${info.nodeVersion}`));

  if (info.details) {
    console.log(chalk.gray('\nDetailed Information:'));
    console.log(info.details.substring(0, 500) + '...');
  }

  console.log();
}
