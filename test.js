#!/usr/bin/env node

/**
 * Simple test to verify BLNT-CLI installation and basic functionality
 */

console.log('🧪 Testing BLNT-CLI...\n');

const tests = [];

// Test 1: Check if modules can be imported
console.log('Test 1: Module imports...');
try {
  const { AutonomousAgent } = require('./dist/agents/autonomous-agent');
  const { BrowserController } = require('./dist/integrations/browser-controller');
  const { DesktopController } = require('./dist/integrations/desktop-controller');
  const { ConfigManager } = require('./dist/utils/config-manager');
  
  tests.push({ name: 'Module imports', passed: true });
  console.log('✅ Module imports successful\n');
} catch (error) {
  tests.push({ name: 'Module imports', passed: false, error });
  console.log('❌ Module imports failed:', error.message, '\n');
}

// Test 2: Create DesktopController instance
console.log('Test 2: DesktopController instantiation...');
try {
  const { DesktopController } = require('./dist/integrations/desktop-controller');
  const controller = new DesktopController({ verbose: false });
  
  tests.push({ name: 'DesktopController instantiation', passed: true });
  console.log('✅ DesktopController created successfully\n');
} catch (error) {
  tests.push({ name: 'DesktopController instantiation', passed: false, error });
  console.log('❌ DesktopController creation failed:', error.message, '\n');
}

// Test 3: Create AutonomousAgent instance
console.log('Test 3: AutonomousAgent instantiation...');
try {
  const { AutonomousAgent } = require('./dist/agents/autonomous-agent');
  const agent = new AutonomousAgent({ verbose: false });
  
  tests.push({ name: 'AutonomousAgent instantiation', passed: true });
  console.log('✅ AutonomousAgent created successfully\n');
} catch (error) {
  tests.push({ name: 'AutonomousAgent instantiation', passed: false, error });
  console.log('❌ AutonomousAgent creation failed:', error.message, '\n');
}

// Test 4: Create ConfigManager instance
console.log('Test 4: ConfigManager instantiation...');
try {
  const { ConfigManager } = require('./dist/utils/config-manager');
  const config = new ConfigManager();
  const settings = config.get();
  
  tests.push({ name: 'ConfigManager instantiation', passed: true });
  console.log('✅ ConfigManager created successfully\n');
} catch (error) {
  tests.push({ name: 'ConfigManager instantiation', passed: false, error });
  console.log('❌ ConfigManager creation failed:', error.message, '\n');
}

// Test 5: Check CLI executable
console.log('Test 5: CLI executable...');
try {
  const fs = require('fs');
  const path = require('path');
  const cliPath = path.join(__dirname, 'dist', 'index.js');
  
  if (fs.existsSync(cliPath)) {
    tests.push({ name: 'CLI executable exists', passed: true });
    console.log('✅ CLI executable found\n');
  } else {
    tests.push({ name: 'CLI executable exists', passed: false });
    console.log('❌ CLI executable not found\n');
  }
} catch (error) {
  tests.push({ name: 'CLI executable exists', passed: false, error });
  console.log('❌ CLI check failed:', error.message, '\n');
}

// Summary
console.log('═══════════════════════════════════════');
console.log('Test Summary');
console.log('═══════════════════════════════════════');

const passed = tests.filter(t => t.passed).length;
const total = tests.length;

console.log(`\nTotal Tests: ${total}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${total - passed}`);

tests.forEach(test => {
  console.log(`${test.passed ? '✅' : '❌'} ${test.name}`);
});

console.log('\n═══════════════════════════════════════\n');

if (passed === total) {
  console.log('🎉 All tests passed!\n');
  process.exit(0);
} else {
  console.log('⚠️  Some tests failed. Please check the errors above.\n');
  process.exit(1);
}
