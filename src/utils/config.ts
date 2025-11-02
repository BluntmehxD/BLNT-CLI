import Conf from 'conf';

export interface BLNTConfig {
  model?: string;
  apiKey?: string;
  provider?: 'ollama' | 'openai' | 'anthropic';
  ollamaUrl?: string;
}

class ConfigManager {
  private config: Conf<BLNTConfig>;
  private cache: Map<keyof BLNTConfig, string | undefined>;

  constructor() {
    this.config = new Conf<BLNTConfig>({
      projectName: 'blnt-cli',
      defaults: {
        model: 'llama2',
        provider: 'ollama',
        ollamaUrl: 'http://localhost:11434',
      },
    });
    this.cache = new Map();
  }

  get(key: keyof BLNTConfig): string | undefined {
    // Check cache first
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    // Fetch and cache
    const value = this.config.get(key);
    this.cache.set(key, value);
    return value;
  }

  set(key: keyof BLNTConfig, value: string): void {
    this.config.set(key, value);
    // Update cache
    this.cache.set(key, value);
  }

  getAll(): BLNTConfig {
    const allConfig = this.config.store;
    // Sync cache with current config
    for (const key of Object.keys(allConfig) as Array<keyof BLNTConfig>) {
      this.cache.set(key, allConfig[key]);
    }
    return allConfig;
  }

  clear(): void {
    this.config.clear();
    this.cache.clear();
  }

  // Clear cache for specific key
  invalidateCache(key?: keyof BLNTConfig): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }
}

export const configManager = new ConfigManager();
