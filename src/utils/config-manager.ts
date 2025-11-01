import * as fs from 'fs/promises';
import * as path from 'path';
import { homedir } from 'os';
import chalk from 'chalk';

export interface BlntConfig {
  browser: {
    headless: boolean;
    slowMo: number;
    recordVideo: boolean;
  };
  agent: {
    maxConcurrentTasks: number;
    timeout: number;
    retryAttempts: number;
    verbose: boolean;
  };
  desktop: {
    verbose: boolean;
  };
  general: {
    defaultEditor: string;
    logLevel: 'info' | 'warn' | 'error' | 'debug';
  };
}

export class ConfigManager {
  private configPath: string;
  private config: BlntConfig;

  constructor() {
    this.configPath = path.join(homedir(), '.blnt', 'config.json');
    this.config = this.getDefaultConfig();
  }

  private getDefaultConfig(): BlntConfig {
    return {
      browser: {
        headless: false,
        slowMo: 100,
        recordVideo: false,
      },
      agent: {
        maxConcurrentTasks: 3,
        timeout: 60000,
        retryAttempts: 2,
        verbose: false,
      },
      desktop: {
        verbose: false,
      },
      general: {
        defaultEditor: 'nano',
        logLevel: 'info',
      },
    };
  }

  async load(): Promise<BlntConfig> {
    try {
      const data = await fs.readFile(this.configPath, 'utf-8');
      this.config = { ...this.getDefaultConfig(), ...JSON.parse(data) };
      return this.config;
    } catch (_error) {
      // Config file doesn't exist, use defaults
      return this.config;
    }
  }

  async save(config?: Partial<BlntConfig>): Promise<void> {
    if (config) {
      this.config = { ...this.config, ...config };
    }

    const configDir = path.dirname(this.configPath);
    await fs.mkdir(configDir, { recursive: true });
    await fs.writeFile(this.configPath, JSON.stringify(this.config, null, 2));
    console.log(chalk.green(`Configuration saved to ${this.configPath}`));
  }

  get(): BlntConfig {
    return this.config;
  }

  set(key: string, value: any): void {
    const keys = key.split('.');
    let obj: any = this.config;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) {
        obj[keys[i]] = {};
      }
      obj = obj[keys[i]];
    }

    obj[keys[keys.length - 1]] = value;
  }

  async reset(): Promise<void> {
    this.config = this.getDefaultConfig();
    await this.save();
    console.log(chalk.green('Configuration reset to defaults'));
  }

  async show(): Promise<void> {
    console.log(chalk.cyan('\n=== BLNT Configuration ===\n'));
    console.log(JSON.stringify(this.config, null, 2));
    console.log(chalk.gray(`\nConfig file: ${this.configPath}\n`));
  }
}
