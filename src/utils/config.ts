import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { logger } from './logger';

export interface Config {
  apiKey?: string;
  blntOsEndpoint?: string;
  debugMode?: boolean;
  [key: string]: unknown;
}

const CONFIG_DIR = path.join(os.homedir(), '.blnt');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export class ConfigManager {
  private config: Config = {};

  constructor() {
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(CONFIG_FILE)) {
        const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
        this.config = JSON.parse(data);
      }
    } catch (error) {
      logger.error('Error loading config:', error);
    }
  }

  save() {
    try {
      if (!fs.existsSync(CONFIG_DIR)) {
        fs.mkdirSync(CONFIG_DIR, { recursive: true });
      }
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(this.config, null, 2));
    } catch (error) {
      logger.error('Error saving config:', error);
    }
  }

  get(key: string): unknown {
    return this.config[key];
  }

  set(key: string, value: unknown) {
    this.config[key] = value;
    this.save();
  }

  getAll(): Config {
    return { ...this.config };
  }

  clear() {
    this.config = {};
    this.save();
  }
}

export const configManager = new ConfigManager();
