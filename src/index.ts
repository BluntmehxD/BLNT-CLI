#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { AgentCommand } from './commands/agent';
import { BrowserCommand } from './commands/browser';
import { DesktopCommand } from './commands/desktop';
import { ConfigCommand } from './commands/config';
import { InteractiveCommand } from './commands/interactive';
import packageJson from '../package.json';

// Load environment variables
dotenv.config();

const program = new Command();

program
  .name('blnt')
  .description(chalk.cyan('BLNT-CLI - AI-powered autonomous agent for terminal, desktop, and browser control'))
  .version(packageJson.version);

// Register commands
AgentCommand(program);
BrowserCommand(program);
DesktopCommand(program);
ConfigCommand(program);
InteractiveCommand(program);

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
