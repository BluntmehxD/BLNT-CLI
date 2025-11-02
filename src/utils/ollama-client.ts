import { Ollama } from 'ollama';
import axios, { AxiosInstance } from 'axios';
import { Agent as HttpAgent } from 'http';
import { Agent as HttpsAgent } from 'https';
import { configManager } from './config.js';

export class OllamaClient {
  private client: Ollama | null = null;
  private baseUrl: string;
  private axiosInstance: AxiosInstance;
  private availabilityCache: { result: boolean; timestamp: number } | null = null;
  private readonly CACHE_TTL = 30000; // 30 seconds cache

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || configManager.get('ollamaUrl') || 'http://localhost:11434';
    // Create axios instance with connection pooling
    this.axiosInstance = axios.create({
      timeout: 2000,
      maxRedirects: 0,
      httpAgent: new HttpAgent({ 
        keepAlive: true,
        maxSockets: 5,
        keepAliveMsecs: 30000,
      }),
      httpsAgent: new HttpsAgent({ 
        keepAlive: true,
        maxSockets: 5,
        keepAliveMsecs: 30000,
      }),
    });
  }

  async isAvailable(): Promise<boolean> {
    // Check cache first
    if (this.availabilityCache) {
      const now = Date.now();
      if (now - this.availabilityCache.timestamp < this.CACHE_TTL) {
        return this.availabilityCache.result;
      }
    }

    try {
      const response = await this.axiosInstance.get(`${this.baseUrl}/api/tags`);
      const result = response.status === 200;
      this.availabilityCache = { result, timestamp: Date.now() };
      return result;
    } catch {
      const result = false;
      this.availabilityCache = { result, timestamp: Date.now() };
      return result;
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
