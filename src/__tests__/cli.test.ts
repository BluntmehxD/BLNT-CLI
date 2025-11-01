import { cli } from '../cli';
import packageJson from '../../package.json';

// Mock console methods to suppress output during tests
const mockLog = jest.spyOn(console, 'log').mockImplementation();
const mockError = jest.spyOn(console, 'error').mockImplementation();
const mockWarn = jest.spyOn(console, 'warn').mockImplementation();

// Mock process.exit to prevent tests from exiting
const mockExit = jest
  .spyOn(process, 'exit')
  .mockImplementation((code?: string | number | null | undefined) => {
    throw new Error(`process.exit(${code})`);
  });

describe('BLNT CLI', () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    mockLog.mockClear();
    mockError.mockClear();
    mockWarn.mockClear();
    mockExit.mockClear();
  });

  afterEach(() => {
    process.argv = originalArgv;
  });

  afterAll(() => {
    mockLog.mockRestore();
    mockError.mockRestore();
    mockWarn.mockRestore();
    mockExit.mockRestore();
  });

  it('should handle version flag', () => {
    process.argv = ['node', 'blnt', '--version'];
    expect(() => cli()).toThrow('process.exit(0)');
  });

  it('should handle help flag', () => {
    process.argv = ['node', 'blnt', '--help'];
    expect(() => cli()).toThrow('process.exit(0)');
  });

  it('should have proper package metadata', () => {
    expect(packageJson.name).toBe('blnt-cli');
    expect(packageJson.version).toBeDefined();
    expect(packageJson.bin.blnt).toBeDefined();
  });
});
