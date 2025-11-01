import { Ollama } from 'ollama';
import axios from 'axios';
import { configManager } from './config.js';

export class OllamaClient {
  private client: Ollama | null = null;
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || configManager.get('ollamaUrl') || 'http://localhost:11434';
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/tags`, { timeout: 2000 });
      return response.status === 200;
    } catch {
      return false;
    }
  }

  async initialize(): Promise<boolean> {
    const available = await this.isAvailable();
    if (available) {
      this.client = new Ollama({ host: this.baseUrl });
      return true;
    }
    return false;
  }

  async chat(message: string, model?: string): Promise<string> {
    if (!this.client) {
      throw new Error('Ollama client not initialized. Please ensure Ollama is running.');
    }

    const modelName = model || configManager.get('model') || 'llama2';
    
    try {
      const response = await this.client.chat({
        model: modelName,
        messages: [{ role: 'user', content: message }],
      });

      return response.message.content;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Ollama chat error: ${error.message}`);
      }
      throw error;
    }
  }

  async generate(prompt: string, model?: string): Promise<string> {
    if (!this.client) {
      throw new Error('Ollama client not initialized. Please ensure Ollama is running.');
    }

    const modelName = model || configManager.get('model') || 'llama2';
    
    try {
      const response = await this.client.generate({
        model: modelName,
        prompt,
      });

      return response.response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Ollama generate error: ${error.message}`);
      }
      throw error;
    }
  }

  async listModels(): Promise<string[]> {
    if (!this.client) {
      throw new Error('Ollama client not initialized');
    }

    try {
      const response = await this.client.list();
      return response.models.map((m) => m.name);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to list models: ${error.message}`);
      }
      throw error;
    }
  }
}
