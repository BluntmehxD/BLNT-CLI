import { EventEmitter } from 'events';
import chalk from 'chalk';
import ora from 'ora';

export interface Task {
  id: string;
  description: string;
  type: 'browser' | 'desktop' | 'terminal' | 'composite';
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: any;
  error?: Error;
  subtasks?: Task[];
}

export interface AgentConfig {
  maxConcurrentTasks: number;
  timeout: number;
  retryAttempts: number;
  verbose: boolean;
}

export class AutonomousAgent extends EventEmitter {
  private config: AgentConfig;
  private taskQueue: Task[] = [];
  private runningTasks: Map<string, Task> = new Map();
  private completedTasks: Task[] = [];

  constructor(config: Partial<AgentConfig> = {}) {
    super();
    this.config = {
      maxConcurrentTasks: config.maxConcurrentTasks || 3,
      timeout: config.timeout || 60000,
      retryAttempts: config.retryAttempts || 2,
      verbose: config.verbose || false,
    };
  }

  async executeTask(task: Task): Promise<any> {
    const spinner = ora(chalk.blue(`Executing: ${task.description}`)).start();
    
    try {
      task.status = 'running';
      this.runningTasks.set(task.id, task);
      this.emit('task:start', task);

      // Execute based on task type
      let result;
      switch (task.type) {
        case 'browser':
          result = await this.executeBrowserTask(task);
          break;
        case 'desktop':
          result = await this.executeDesktopTask(task);
          break;
        case 'terminal':
          result = await this.executeTerminalTask(task);
          break;
        case 'composite':
          result = await this.executeCompositeTask(task);
          break;
        default:
          throw new Error(`Unknown task type: ${task.type}`);
      }

      task.status = 'completed';
      task.result = result;
      this.completedTasks.push(task);
      this.runningTasks.delete(task.id);
      
      spinner.succeed(chalk.green(`Completed: ${task.description}`));
      this.emit('task:complete', task);
      
      return result;
    } catch (error) {
      task.status = 'failed';
      task.error = error as Error;
      this.runningTasks.delete(task.id);
      
      spinner.fail(chalk.red(`Failed: ${task.description}`));
      this.emit('task:error', task, error);
      
      throw error;
    }
  }

  private async executeBrowserTask(task: Task): Promise<any> {
    // Browser task execution logic (implemented in browser integration)
    return { type: 'browser', task: task.description, completed: true };
  }

  private async executeDesktopTask(task: Task): Promise<any> {
    // Desktop task execution logic
    return { type: 'desktop', task: task.description, completed: true };
  }

  private async executeTerminalTask(task: Task): Promise<any> {
    // Terminal task execution logic
    return { type: 'terminal', task: task.description, completed: true };
  }

  private async executeCompositeTask(task: Task): Promise<any> {
    // Execute subtasks sequentially or in parallel
    const results = [];
    
    if (task.subtasks && task.subtasks.length > 0) {
      for (const subtask of task.subtasks) {
        const result = await this.executeTask(subtask);
        results.push(result);
      }
    }
    
    return { type: 'composite', results };
  }

  async addTask(task: Task): Promise<void> {
    this.taskQueue.push(task);
    this.emit('task:queued', task);
  }

  async processTasks(): Promise<void> {
    const spinner = ora(chalk.yellow('Processing task queue...')).start();
    
    while (this.taskQueue.length > 0) {
      const task = this.taskQueue.shift();
      if (task) {
        try {
          await this.executeTask(task);
        } catch (error) {
          if (this.config.verbose) {
            console.error(chalk.red(`Task ${task.id} failed:`), error);
          }
        }
      }
    }
    
    spinner.succeed(chalk.green('All tasks processed'));
  }

  getStatus(): {
    queued: number;
    running: number;
    completed: number;
  } {
    return {
      queued: this.taskQueue.length,
      running: this.runningTasks.size,
      completed: this.completedTasks.length,
    };
  }

  clearCompleted(): void {
    this.completedTasks = [];
  }
}
