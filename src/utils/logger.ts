import chalk from 'chalk';

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

class Logger {
  private debugMode = false;

  setDebugMode(enabled: boolean) {
    this.debugMode = enabled;
  }

  debug(message: string, ...args: unknown[]) {
    if (this.debugMode) {
      console.log(chalk.gray(`[DEBUG] ${message}`), ...args);
    }
  }

  info(message: string, ...args: unknown[]) {
    console.log(chalk.blue(`[INFO] ${message}`), ...args);
  }

  warn(message: string, ...args: unknown[]) {
    console.warn(chalk.yellow(`[WARN] ${message}`), ...args);
  }

  error(message: string, ...args: unknown[]) {
    console.error(chalk.red(`[ERROR] ${message}`), ...args);
  }

  success(message: string, ...args: unknown[]) {
    console.log(chalk.green(`[SUCCESS] ${message}`), ...args);
  }
}

export const logger = new Logger();
