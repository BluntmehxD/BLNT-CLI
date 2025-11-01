#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { version, description } from '../package.json';
import { AgentController } from './core/agent-controller';
import { initCommand } from './commands/init';
import { runCommand } from './commands/run';
import { configCommand } from './commands/config';

const program = new Command();

program
  .name('blnt')
  .description(description)
  .version(version, '-v, --version', 'Output the current version')
  .helpOption('-h, --help', 'Display help for command');

// Initialize agent
program
  .command('init')
  .description('Initialize BLNT-CLI in the current directory')
  .option('-f, --force', 'Force initialization even if already initialized')
  .action(initCommand);

// Run autonomous agent
program
  .command('run')
  .description('Start the autonomous AI agent')
  .option('-m, --mode <mode>', 'Agent mode (desktop|browser|auto)', 'auto')
  .option('-t, --task <task>', 'Specific task to execute')
  .action(runCommand);

// Configuration management
program
  .command('config')
  .description('Manage BLNT-CLI configuration')
  .option('-s, --set <key=value>', 'Set configuration value')
  .option('-g, --get <key>', 'Get configuration value')
  .option('-l, --list', 'List all configuration')
  .action(configCommand);

// Agent control
program
  .command('agent')
  .description('Manage AI agents')
  .option('-l, --list', 'List available agents')
  .option('-s, --start <agent>', 'Start specific agent')
  .option('--stop <agent>', 'Stop specific agent')
  .action(async (options) => {
    const controller = new AgentController();

    if (options.list) {
      console.log(chalk.blue('Available agents:'));
      const agents = await controller.listAgents();
      agents.forEach((agent) => {
        console.log(chalk.green(`  - ${agent.name}: ${agent.description}`));
      });
    }
  });

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
