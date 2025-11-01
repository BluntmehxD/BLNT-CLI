import { Args, Command, Flags } from '@oclif/core';
import { AIProvider } from '../utils/ai-provider.js';
import { printLogo, theme, formatError, formatSuccess } from '../utils/theme.js';

export default class Index extends Command {
  static args = {
    query: Args.string({ description: 'Direct query to the AI', required: false }),
  };

  static description = 'Query the AI directly';

  static examples = [
    '<%= config.bin %> "What is the capital of France?"',
    '<%= config.bin %> --model llama2 "Explain quantum computing"',
  ];

  static flags = {
    model: Flags.string({ char: 'm', description: 'Model to use for the query' }),
    help: Flags.help({ char: 'h' }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Index);

    if (!args.query) {
      printLogo();
      this.log(theme.text('Usage: blnt <query> or blnt chat for interactive mode'));
      this.log(theme.dim('\nExamples:'));
      this.log(theme.accent('  blnt "What is Node.js?"'));
      this.log(theme.accent('  blnt chat'));
      this.log(theme.accent('  blnt context'));
      this.log(theme.dim('\nType "blnt --help" for more information'));
      return;
    }

    printLogo();
    
    const provider = new AIProvider();
    
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
