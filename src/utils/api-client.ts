import OpenAI from 'openai';
import { configManager } from './config.js';

export class APIClient {
  private openaiClient: OpenAI | null = null;

  async initializeOpenAI(): Promise<boolean> {
    const apiKey = configManager.get('apiKey') || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return false;
    }

    this.openaiClient = new OpenAI({ apiKey });
    return true;
  }

  async chatWithOpenAI(message: string, model?: string): Promise<string> {
    if (!this.openaiClient) {
      await this.initializeOpenAI();
    }

    if (!this.openaiClient) {
      throw new Error('OpenAI API key not configured. Set it with: blnt config set apiKey YOUR_API_KEY');
    }

    const modelName = model || configManager.get('model') || 'gpt-3.5-turbo';

    try {
      const response = await this.openaiClient.chat.completions.create({
        model: modelName,
        messages: [{ role: 'user', content: message }],
      });

      return response.choices[0]?.message?.content || 'No response';
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`OpenAI API error: ${error.message}`);
      }
      throw error;
    }
  }
}
