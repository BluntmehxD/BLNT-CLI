import { Args, Command } from '@oclif/core';
import { configManager, BLNTConfig } from '../../utils/config.js';
import { theme } from '../../utils/theme.js';

export default class ConfigGet extends Command {
  static args = {
    key: Args.string({
      description: 'Configuration key to retrieve (optional, shows all if omitted)',
      required: false,
      options: ['model', 'apiKey', 'provider', 'ollamaUrl'],
    }),
  };

  static description = 'Get configuration value(s)';

  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> model',
    '<%= config.bin %> <%= command.id %> apiKey',
  ];

  async run(): Promise<void> {
    const { args } = await this.parse(ConfigGet);

    if (args.key) {
      const value = configManager.get(args.key as keyof BLNTConfig);
      if (value === undefined) {
        this.log(theme.dim(`${args.key}: (not set)`));
      } else {
        // Mask API key for security
        const displayValue = args.key === 'apiKey' && value 
          ? `${value.substring(0, 8)}...` 
          : value;
        this.log(theme.accent(`${args.key}: `) + theme.text(displayValue));
      }
    } else {
      // Show all configuration
      const config = configManager.getAll();
      this.log(theme.primary('\n📋 Current Configuration:\n'));
      
      Object.entries(config).forEach(([key, value]) => {
        const displayValue = key === 'apiKey' && value 
          ? `${value.substring(0, 8)}...` 
          : value || '(not set)';
        this.log(theme.accent(`  ${key}: `) + theme.text(displayValue));
      });
      this.log('');
    }
  }
}
