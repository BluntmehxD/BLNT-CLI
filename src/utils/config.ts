import Conf from 'conf';

export interface BLNTConfig {
  model?: string;
  apiKey?: string;
  provider?: 'ollama' | 'openai' | 'anthropic';
  ollamaUrl?: string;
}

class ConfigManager {
  private config: Conf<BLNTConfig>;

  constructor() {
    this.config = new Conf<BLNTConfig>({
      projectName: 'blnt-cli',
      defaults: {
        model: 'llama2',
        provider: 'ollama',
        ollamaUrl: 'http://localhost:11434',
      },
    });
  }

  get(key: keyof BLNTConfig): string | undefined {
    return this.config.get(key);
  }

  set(key: keyof BLNTConfig, value: string): void {
    this.config.set(key, value);
  }

  getAll(): BLNTConfig {
    return this.config.store;
  }

  clear(): void {
    this.config.clear();
  }
}

export const configManager = new ConfigManager();
