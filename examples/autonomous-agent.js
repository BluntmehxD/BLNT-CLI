#!/usr/bin/env node

/**
 * Example: Autonomous Agent
 * 
 * This example demonstrates using the autonomous agent for complex tasks.
 */

const { AutonomousAgent } = require('blnt-cli');

async function runAutomatedTasks() {
  const agent = new AutonomousAgent({
    maxConcurrentTasks: 3,
    timeout: 60000,
    verbose: true,
  });

  console.log('🤖 Starting autonomous agent...\n');

  // Define a complex task with subtasks
  const tasks = [
    {
      id: 'task-1',
      description: 'Gather system information',
      type: 'desktop',
      status: 'pending',
    },
    {
      id: 'task-2',
      description: 'Check online resources',
      type: 'browser',
      status: 'pending',
    },
    {
      id: 'task-3',
      description: 'Process and analyze data',
      type: 'terminal',
      status: 'pending',
    },
  ];

  // Queue tasks
  for (const task of tasks) {
    await agent.addTask(task);
  }

  // Process all tasks
  await agent.processTasks();

  // Get final status
  const status = agent.getStatus();
  console.log('\n📊 Final Status:');
  console.log(`   Completed: ${status.completed}`);
  console.log(`   Running: ${status.running}`);
  console.log(`   Queued: ${status.queued}`);

  console.log('\n✅ Agent execution complete!');
}

runAutomatedTasks();
