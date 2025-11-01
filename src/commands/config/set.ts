import { Args, Command } from '@oclif/core';
import { configManager, BLNTConfig } from '../../utils/config.js';
import { formatSuccess } from '../../utils/theme.js';

export default class ConfigSet extends Command {
  static args = {
    key: Args.string({
      description: 'Configuration key (model, apiKey, provider, ollamaUrl)',
      required: true,
      options: ['model', 'apiKey', 'provider', 'ollamaUrl'],
    }),
    value: Args.string({
      description: 'Configuration value',
      required: true,
    }),
  };

  static description = 'Set a configuration value';

  static examples = [
    '<%= config.bin %> <%= command.id %> model llama2',
    '<%= config.bin %> <%= command.id %> apiKey sk-...',
    '<%= config.bin %> <%= command.id %> provider ollama',
    '<%= config.bin %> <%= command.id %> ollamaUrl http://localhost:11434',
  ];

  async run(): Promise<void> {
    const { args } = await this.parse(ConfigSet);

    try {
      configManager.set(args.key as keyof BLNTConfig, args.value);
      this.log(formatSuccess(`Configuration updated: ${args.key} = ${args.value}`));
    } catch (error) {
      this.error(`Failed to set configuration: ${error}`);
    }
  }
}
