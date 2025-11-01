import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Manage BLNT-CLI configuration
 */
export async function configCommand(options: any) {
  const configPath = path.join(process.cwd(), '.blnt-config.json');

  try {
    // List configuration
    if (options.list) {
      if (!fs.existsSync(configPath)) {
        console.log(chalk.yellow('No configuration found. Run "blnt init" first.'));
        return;
      }

      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      console.log(chalk.blue('Current Configuration:'));
      console.log(JSON.stringify(config, null, 2));
      return;
    }

    // Get configuration value
    if (options.get) {
      if (!fs.existsSync(configPath)) {
        console.log(chalk.yellow('No configuration found. Run "blnt init" first.'));
        return;
      }

      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      const value = getNestedValue(config, options.get);

      if (value !== undefined) {
        console.log(chalk.green(`${options.get}: ${JSON.stringify(value)}`));
      } else {
        console.log(chalk.yellow(`Key "${options.get}" not found`));
      }
      return;
    }

    // Set configuration value
    if (options.set) {
      if (!fs.existsSync(configPath)) {
        console.log(chalk.yellow('No configuration found. Run "blnt init" first.'));
        return;
      }

      const [key, value] = options.set.split('=');
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

      setNestedValue(config, key, parseValue(value));
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

      console.log(chalk.green(`Configuration updated: ${key} = ${value}`));
      return;
    }

    // Show help if no option provided
    console.log(chalk.blue('Usage:'));
    console.log(chalk.dim('  blnt config --list              List all configuration'));
    console.log(chalk.dim('  blnt config --get <key>         Get configuration value'));
    console.log(chalk.dim('  blnt config --set <key=value>   Set configuration value'));
  } catch (error) {
    console.error(chalk.red('Configuration error:'), error);
    process.exit(1);
  }
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
}

function parseValue(value: string): any {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (!isNaN(Number(value))) return Number(value);
  return value;
}
