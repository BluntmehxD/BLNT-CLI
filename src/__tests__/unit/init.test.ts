import * as fs from 'fs';
import * as path from 'path';
import { initCommand } from '../../commands/init';

// Mock dependencies
jest.mock('ora', () => {
  return jest.fn(() => ({
    start: jest.fn().mockReturnThis(),
    succeed: jest.fn().mockReturnThis(),
    warn: jest.fn().mockReturnThis(),
    fail: jest.fn().mockReturnThis(),
  }));
});

describe('init command', () => {
  const testDir = path.join(__dirname, 'test-init');
  const configPath = path.join(testDir, '.blnt-config.json');

  beforeEach(() => {
    // Create test directory
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    // Change to test directory
    process.chdir(testDir);
  });

  afterEach(() => {
    // Clean up
    if (fs.existsSync(configPath)) {
      fs.unlinkSync(configPath);
    }
  });

  it('should create config file on first init', async () => {
    await initCommand({});

    expect(fs.existsSync(configPath)).toBe(true);
  });

  it('should create valid JSON config', async () => {
    await initCommand({});

    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(config).toHaveProperty('version');
    expect(config).toHaveProperty('mode');
    expect(config).toHaveProperty('agents');
  });

  it('should not overwrite existing config without force', async () => {
    // First init
    await initCommand({});
    const firstConfig = fs.readFileSync(configPath, 'utf-8');

    // Wait a bit to ensure timestamp would be different
    await new Promise((resolve) => setTimeout(resolve, 10));

    // Second init without force
    await initCommand({});
    const secondConfig = fs.readFileSync(configPath, 'utf-8');

    // Config should be the same
    expect(firstConfig).toBe(secondConfig);
  });

  it('should overwrite config with force option', async () => {
    // First init
    await initCommand({});
    const firstConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    // Wait a bit to ensure timestamp would be different
    await new Promise((resolve) => setTimeout(resolve, 10));

    // Second init with force
    await initCommand({ force: true });
    const secondConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    // Timestamps should be different
    expect(firstConfig.createdAt).not.toBe(secondConfig.createdAt);
  });
});
