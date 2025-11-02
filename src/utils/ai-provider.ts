import { OllamaClient } from './ollama-client.js';
import { APIClient } from './api-client.js';

export class AIProvider {
  private static instance: AIProvider | null = null;
  private ollamaClient: OllamaClient | null = null;
  private apiClient: APIClient | null = null;
  private useOllama: boolean = false;
  private initialized: boolean = false;

  private constructor() {
    // Clients are now lazily initialized
  }

  static getInstance(): AIProvider {
    if (!AIProvider.instance) {
      AIProvider.instance = new AIProvider();
    }
    return AIProvider.instance;
  }

  async initialize(): Promise<void> {
    // Skip if already initialized
    if (this.initialized) {
      return;
    }

    // Lazy initialize OllamaClient
    if (!this.ollamaClient) {
      this.ollamaClient = new OllamaClient();
    }

    // Try Ollama first (local-first approach)
    this.useOllama = await this.ollamaClient.initialize();
    
    if (!this.useOllama) {
      // Lazy initialize APIClient only if needed
      if (!this.apiClient) {
        this.apiClient = new APIClient();
      }
      
      // Fallback to API if Ollama is not available
      const apiInitialized = await this.apiClient.initializeOpenAI();
      if (!apiInitialized) {
        console.warn('⚠️  Ollama not detected and no API key configured.');
        console.warn('Please either:');
        console.warn('  1. Start Ollama (http://localhost:11434)');
        console.warn('  2. Set an API key: blnt config set apiKey YOUR_API_KEY');
      }
    }

    this.initialized = true;
  }

  async chat(message: string, model?: string): Promise<string> {
    if (this.useOllama && this.ollamaClient) {
      return this.ollamaClient.chat(message, model);
    } else if (this.apiClient) {
      return this.apiClient.chatWithOpenAI(message, model);
    } else {
      throw new Error('No AI provider available. Please initialize first.');
    }
  }

  async generate(prompt: string, model?: string): Promise<string> {
    if (this.useOllama && this.ollamaClient) {
      return this.ollamaClient.generate(prompt, model);
    } else if (this.apiClient) {
      return this.apiClient.chatWithOpenAI(prompt, model);
    } else {
      throw new Error('No AI provider available. Please initialize first.');
    }
  }

  getProvider(): string {
    return this.useOllama ? 'Ollama (Local)' : 'OpenAI API';
  }

  isOllamaActive(): boolean {
    return this.useOllama;
  }
}
