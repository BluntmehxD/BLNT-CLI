import { cli } from '../cli';

// Mock console methods
const mockLog = jest.spyOn(console, 'log').mockImplementation();
const mockError = jest.spyOn(console, 'error').mockImplementation();
const mockWarn = jest.spyOn(console, 'warn').mockImplementation();

describe('BLNT CLI', () => {
  beforeEach(() => {
    mockLog.mockClear();
    mockError.mockClear();
    mockWarn.mockClear();
  });

  afterAll(() => {
    mockLog.mockRestore();
    mockError.mockRestore();
    mockWarn.mockRestore();
  });

  it('should initialize without errors', () => {
    expect(() => cli()).not.toThrow();
  });

  it('should have proper package metadata', () => {
    const pkg = require('../../package.json');
    expect(pkg.name).toBe('blnt-cli');
    expect(pkg.version).toBeDefined();
    expect(pkg.bin.blnt).toBeDefined();
  });
});
