import { Args, Command, Flags } from '@oclif/core';
import { AIProvider } from '../utils/ai-provider.js';
import { printLogo, theme, formatError, formatSuccess } from '../utils/theme.js';
import * as fs from 'fs';
import * as path from 'path';

export default class Context extends Command {
  static description = 'Query AI with BLNT.md context file';

  static examples = [
    '<%= config.bin %> context "What does this project do?"',
    '<%= config.bin %> context --file ./CONTEXT.md "Explain the architecture"',
  ];

  static args = {
    query: Args.string({
      description: 'Query to ask with context',
      required: true,
    }),
  };

  static flags = {
    file: Flags.string({
      char: 'f',
      description: 'Context file to use',
      default: 'BLNT.md',
    }),
    model: Flags.string({ char: 'm', description: 'Model to use' }),
    help: Flags.help({ char: 'h' }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Context);

    printLogo();

    // Look for context file
    const contextFile = path.resolve(process.cwd(), flags.file);
    
    let contextContent = '';
    if (fs.existsSync(contextFile)) {
      this.log(theme.primary(`📄 Loading context from: ${flags.file}`));
      contextContent = fs.readFileSync(contextFile, 'utf-8');
    } else {
      this.log(theme.warning(`⚠️  Context file not found: ${flags.file}`));
      this.log(theme.dim('Proceeding without context...\n'));
    }

    const provider = new AIProvider();
    
    try {
      this.log(theme.primary('🔄 Initializing AI provider...'));
      await provider.initialize();
      
      this.log(theme.dim(`📡 Using: ${provider.getProvider()}\n`));

      // Construct prompt with context
      let prompt = args.query;
      if (contextContent) {
        prompt = `Context:\n${contextContent}\n\nQuestion: ${args.query}`;
      }

      this.log(theme.accent('Query: ') + args.query);
      this.log(theme.dim('━'.repeat(60)));

      const response = await provider.generate(prompt, flags.model);
      
      this.log('\n' + theme.success('Response:'));
      this.log(theme.text(response));
      this.log('\n' + formatSuccess('Query completed'));
    } catch (error) {
      this.log('\n' + formatError(error as Error));
      this.exit(1);
    }
  }
}
