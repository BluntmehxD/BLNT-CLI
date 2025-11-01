import { OllamaClient } from './ollama-client.js';
import { APIClient } from './api-client.js';

export class AIProvider {
  private ollamaClient: OllamaClient;
  private apiClient: APIClient;
  private useOllama: boolean = false;

  constructor() {
    this.ollamaClient = new OllamaClient();
    this.apiClient = new APIClient();
  }

  async initialize(): Promise<void> {
    // Try Ollama first (local-first approach)
    this.useOllama = await this.ollamaClient.initialize();
    
    if (!this.useOllama) {
      // Fallback to API if Ollama is not available
      const apiInitialized = await this.apiClient.initializeOpenAI();
      if (!apiInitialized) {
        console.warn('⚠️  Ollama not detected and no API key configured.');
        console.warn('Please either:');
        console.warn('  1. Start Ollama (http://localhost:11434)');
        console.warn('  2. Set an API key: blnt config set apiKey YOUR_API_KEY');
      }
    }
  }

  async chat(message: string, model?: string): Promise<string> {
    if (this.useOllama) {
      return this.ollamaClient.chat(message, model);
    } else {
      return this.apiClient.chatWithOpenAI(message, model);
    }
  }

  async generate(prompt: string, model?: string): Promise<string> {
    if (this.useOllama) {
      return this.ollamaClient.generate(prompt, model);
    } else {
      return this.apiClient.chatWithOpenAI(prompt, model);
    }
  }

  getProvider(): string {
    return this.useOllama ? 'Ollama (Local)' : 'OpenAI API';
  }

  isOllamaActive(): boolean {
    return this.useOllama;
  }
}
