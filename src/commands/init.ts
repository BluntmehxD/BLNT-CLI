import chalk from 'chalk';
import ora from 'ora';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Initialize BLNT-CLI in the current directory
 */
export async function initCommand(options: any) {
  const spinner = ora('Initializing BLNT-CLI...').start();

  try {
    const configPath = path.join(process.cwd(), '.blnt-config.json');

    // Check if already initialized
    if (fs.existsSync(configPath) && !options.force) {
      spinner.warn(chalk.yellow('BLNT-CLI is already initialized in this directory'));
      console.log(chalk.dim('Use --force to reinitialize'));
      return;
    }

    // Create configuration
    const config = {
      version: '0.1.0',
      mode: 'auto',
      agents: {
        desktop: { enabled: true },
        browser: { enabled: true },
        task: { enabled: true },
      },
      createdAt: new Date().toISOString(),
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

    spinner.succeed(chalk.green('BLNT-CLI initialized successfully!'));
    console.log(chalk.blue('\nNext steps:'));
    console.log(chalk.dim('  1. Run "blnt run" to start the autonomous agent'));
    console.log(chalk.dim('  2. Use "blnt config" to customize settings'));
    console.log(chalk.dim('  3. Check "blnt --help" for all available commands'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to initialize BLNT-CLI'));
    if (error instanceof Error) {
      console.error(chalk.red(error.message));
    }
    process.exit(1);
  }
}
