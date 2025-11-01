import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { AutonomousAgent, Task } from '../agents/autonomous-agent';
import { ConfigManager } from '../utils/config-manager';

export function AgentCommand(program: Command): void {
  const agentCmd = program
    .command('agent')
    .description('Autonomous agent operations');

  agentCmd
    .command('run')
    .description('Run autonomous agent with a goal')
    .option('-g, --goal <goal>', 'Agent goal/objective')
    .option('-v, --verbose', 'Verbose output')
    .action(async (options) => {
      const configManager = new ConfigManager();
      await configManager.load();
      const config = configManager.get();

      let goal = options.goal;

      if (!goal) {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'goal',
            message: 'What is the agent goal?',
            validate: (input) => input.length > 0 || 'Goal cannot be empty',
          },
        ]);
        goal = answers.goal;
      }

      console.log(chalk.cyan(`\n🤖 Starting autonomous agent with goal: ${goal}\n`));

      const agent = new AutonomousAgent({
        ...config.agent,
        verbose: options.verbose || config.agent.verbose,
      });

      // Example: Break down goal into tasks
      const tasks: Task[] = [
        {
          id: 'task-1',
          description: `Analyze goal: ${goal}`,
          type: 'terminal',
          status: 'pending',
        },
        {
          id: 'task-2',
          description: 'Execute actions based on analysis',
          type: 'composite',
          status: 'pending',
          subtasks: [],
        },
      ];

      for (const task of tasks) {
        await agent.addTask(task);
      }

      await agent.processTasks();

      const status = agent.getStatus();
      console.log(chalk.green('\n✓ Agent execution completed'));
      console.log(chalk.gray(`Completed tasks: ${status.completed}`));
    });

  agentCmd
    .command('status')
    .description('Show agent status')
    .action(() => {
      console.log(chalk.cyan('\n=== Agent Status ===\n'));
      console.log(chalk.yellow('Agent is ready to execute tasks'));
      console.log(chalk.gray('Use "blnt agent run" to start the agent\n'));
    });

  agentCmd
    .command('task')
    .description('Execute a specific task')
    .option('-t, --type <type>', 'Task type (browser, desktop, terminal, composite)')
    .option('-d, --description <desc>', 'Task description')
    .action(async (options) => {
      const configManager = new ConfigManager();
      await configManager.load();
      const config = configManager.get();

      let taskType = options.type;
      let taskDescription = options.description;

      if (!taskType || !taskDescription) {
        const answers = await inquirer.prompt([
          {
            type: 'list',
            name: 'type',
            message: 'Select task type:',
            choices: ['browser', 'desktop', 'terminal', 'composite'],
            when: !taskType,
          },
          {
            type: 'input',
            name: 'description',
            message: 'Task description:',
            when: !taskDescription,
          },
        ]);

        taskType = taskType || answers.type;
        taskDescription = taskDescription || answers.description;
      }

      const agent = new AutonomousAgent(config.agent);
      
      const task: Task = {
        id: `task-${Date.now()}`,
        description: taskDescription,
        type: taskType as any,
        status: 'pending',
      };

      await agent.executeTask(task);
      console.log(chalk.green('\n✓ Task completed successfully'));
    });
}
