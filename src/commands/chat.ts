import { Command, Flags } from '@oclif/core';
import { render } from 'ink';
import React from 'react';
import { AIProvider } from '../utils/ai-provider.js';
import { ChatUI } from '../ui/ChatUI.js';
import { printLogo } from '../utils/theme.js';

export default class Chat extends Command {
  static description = 'Start an interactive chat session with the AI';

  static examples = [
    '<%= config.bin %> chat',
    '<%= config.bin %> chat --model llama2',
  ];

  static flags = {
    model: Flags.string({ char: 'm', description: 'Model to use for chat' }),
    help: Flags.help({ char: 'h' }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Chat);

    printLogo();

    const provider = new AIProvider();
    await provider.initialize();

    const handleMessage = async (message: string): Promise<string> => {
      return provider.chat(message, flags.model);
    };

    render(
      React.createElement(ChatUI, {
        onMessage: handleMessage,
        provider: provider.getProvider(),
      })
    );
  }
}
