import { Command } from 'commander';
import chalk from 'chalk';
import { desktopCommand } from './commands/desktop';
import { browserCommand } from './commands/browser';
import { agentCommand } from './commands/agent';
import packageJson from '../package.json';

export function cli() {
  const program = new Command();

  program
    .name('blnt')
    .description(
      chalk.cyan(
        'AI agent that brings the power of BLNT-OS directly into your terminal\n' +
          'Full desktop control and browser control with Autonomous Agentic Capabilities'
      )
    )
    .version(packageJson.version, '-v, --version', 'Output the current version');

  // Register commands
  program.addCommand(desktopCommand);
  program.addCommand(browserCommand);
  program.addCommand(agentCommand);

  // Add global options
  program.option('-d, --debug', 'Enable debug mode');
  program.option('-q, --quiet', 'Suppress output');

  // Parse arguments
  program.parse(process.argv);

  // Show help if no command provided
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}
