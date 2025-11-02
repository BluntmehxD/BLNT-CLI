import { Args, Command, Flags } from '@oclif/core';
import { AIProvider } from '../utils/ai-provider.js';
import { printLogo, theme, formatError, formatSuccess } from '../utils/theme.js';

export default class Query extends Command {
  static args = {
    query: Args.string({ description: 'Direct query to the AI', required: true }),
  };

  static description = 'Query the AI directly (default command)';

  static examples = [
    '<%= config.bin %> query "What is the capital of France?"',
    '<%= config.bin %> query --model llama2 "Explain quantum computing"',
  ];

  static flags = {
    model: Flags.string({ char: 'm', description: 'Model to use for the query' }),
    help: Flags.help({ char: 'h' }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Query);

    printLogo();
    
    const provider = AIProvider.getInstance();
    
    try {
      this.log(theme.primary('🔄 Initializing AI provider...'));
      await provider.initialize();
      
      this.log(theme.dim(`📡 Using: ${provider.getProvider()}\n`));
      this.log(theme.accent('Query: ') + args.query);
      this.log(theme.dim('━'.repeat(60)));

      const response = await provider.chat(args.query, flags.model);
      
      this.log('\n' + theme.success('Response:'));
      this.log(theme.text(response));
      this.log('\n' + formatSuccess('Query completed'));
    } catch (error) {
      this.log('\n' + formatError(error as Error));
      this.exit(1);
    }
  }
}
