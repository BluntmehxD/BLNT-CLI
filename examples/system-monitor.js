#!/usr/bin/env node

/**
 * Example: System Monitor
 * 
 * This example demonstrates desktop automation and system monitoring.
 */

const { DesktopController } = require('blnt-cli');

async function monitorSystem() {
  const desktop = new DesktopController({ verbose: true });

  try {
    console.log('🖥️  Getting system information...\n');
    
    const info = await desktop.getSystemInfo();
    console.log(`Platform: ${info.platform}`);
    console.log(`Architecture: ${info.arch}`);
    console.log(`Node Version: ${info.nodeVersion}`);

    console.log('\n📋 Listing processes...\n');
    const processes = await desktop.listProcesses();
    const processLines = processes.split('\n').slice(0, 10);
    processLines.forEach(line => console.log(line));

    console.log('\n📢 Sending notification...');
    await desktop.sendNotification(
      'System Monitor',
      `Platform: ${info.platform} | Arch: ${info.arch}`
    );

    console.log('✅ Monitoring complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

monitorSystem();
