import { exec } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';
import ora from 'ora';
import notifier from 'node-notifier';

const execPromise = promisify(exec);

export interface DesktopConfig {
  verbose: boolean;
}

export class DesktopController {
  private config: DesktopConfig;

  constructor(config: Partial<DesktopConfig> = {}) {
    this.config = {
      verbose: config.verbose ?? false,
    };
  }

  async executeCommand(command: string, options: any = {}): Promise<string> {
    const spinner = this.config.verbose ? ora(chalk.blue(`Executing: ${command}`)).start() : null;
    
    try {
      const { stdout, stderr } = await execPromise(command, options);
      
      if (spinner) {
        spinner.succeed(chalk.green('Command executed successfully'));
      }
      
      if (stderr && this.config.verbose) {
        console.warn(chalk.yellow('STDERR:'), stderr.toString());
      }
      
      return stdout.toString();
    } catch (error) {
      if (spinner) {
        spinner.fail(chalk.red('Command execution failed'));
      }
      throw error;
    }
  }

  async getSystemInfo(): Promise<any> {
    const platform = process.platform;
    const info: any = {
      platform,
      arch: process.arch,
      nodeVersion: process.version,
    };

    try {
      if (platform === 'darwin') {
        const output = await this.executeCommand('system_profiler SPSoftwareDataType SPHardwareDataType');
        info.details = output;
      } else if (platform === 'linux') {
        const output = await this.executeCommand('uname -a && cat /etc/os-release');
        info.details = output;
      } else if (platform === 'win32') {
        const output = await this.executeCommand('systeminfo');
        info.details = output;
      }
    } catch (_error) {
      info.error = 'Failed to get detailed system info';
    }

    return info;
  }

  async listProcesses(): Promise<string> {
    const platform = process.platform;
    
    try {
      if (platform === 'win32') {
        return await this.executeCommand('tasklist');
      } else {
        return await this.executeCommand('ps aux');
      }
    } catch (error) {
      throw new Error(`Failed to list processes: ${error}`);
    }
  }

  async openApplication(appName: string): Promise<void> {
    const spinner = ora(chalk.blue(`Opening ${appName}...`)).start();
    const platform = process.platform;
    
    try {
      let command = '';
      
      if (platform === 'darwin') {
        command = `open -a "${appName}"`;
      } else if (platform === 'linux') {
        command = appName;
      } else if (platform === 'win32') {
        command = `start "" "${appName}"`;
      }
      
      await this.executeCommand(command);
      spinner.succeed(chalk.green(`${appName} opened successfully`));
    } catch (error) {
      spinner.fail(chalk.red(`Failed to open ${appName}`));
      throw error;
    }
  }

  async killProcess(processName: string): Promise<void> {
    const platform = process.platform;
    
    try {
      let command = '';
      
      if (platform === 'win32') {
        command = `taskkill /F /IM ${processName}`;
      } else {
        command = `pkill -f ${processName}`;
      }
      
      await this.executeCommand(command);
      console.log(chalk.green(`Process ${processName} terminated`));
    } catch (error) {
      throw new Error(`Failed to kill process: ${error}`);
    }
  }

  async sendNotification(title: string, message: string): Promise<void> {
    notifier.notify({
      title,
      message,
      sound: true,
      wait: false,
    });
  }

  async getClipboard(): Promise<string> {
    const platform = process.platform;
    
    try {
      let command = '';
      
      if (platform === 'darwin') {
        command = 'pbpaste';
      } else if (platform === 'linux') {
        command = 'xclip -selection clipboard -o';
      } else if (platform === 'win32') {
        command = 'powershell -command "Get-Clipboard"';
      }
      
      return await this.executeCommand(command);
    } catch (error) {
      throw new Error(`Failed to get clipboard: ${error}`);
    }
  }

  async setClipboard(text: string): Promise<void> {
    const platform = process.platform;
    
    try {
      let command = '';
      // Escape text for safe shell usage - escape backslashes first to prevent double-escaping
      const escapedText = text
        .replace(/\\/g, '\\\\')  // Escape backslashes first
        .replace(/"/g, '\\"')     // Escape double quotes
        .replace(/`/g, '\\`')     // Escape backticks
        .replace(/\$/g, '\\$');   // Escape dollar signs
      
      if (platform === 'darwin') {
        command = `echo "${escapedText}" | pbcopy`;
      } else if (platform === 'linux') {
        command = `echo "${escapedText}" | xclip -selection clipboard`;
      } else if (platform === 'win32') {
        // For Windows, use PowerShell with proper escaping
        const psEscaped = text
          .replace(/\\/g, '\\\\')
          .replace(/'/g, "''");
        command = `powershell -command "Set-Clipboard -Value '${psEscaped}'"`; 
      }
      
      await this.executeCommand(command);
      console.log(chalk.green('Clipboard updated'));
    } catch (error) {
      throw new Error(`Failed to set clipboard: ${error}`);
    }
  }

  async getEnvironmentVariables(): Promise<Record<string, string | undefined>> {
    return process.env;
  }

  async setEnvironmentVariable(key: string, value: string): Promise<void> {
    process.env[key] = value;
    console.log(chalk.green(`Environment variable ${key} set`));
  }

  async captureScreenshot(filename: string): Promise<void> {
    const platform = process.platform;
    const spinner = ora(chalk.blue('Capturing screenshot...')).start();
    
    try {
      let command = '';
      // Validate and sanitize filename to prevent command injection
      const sanitizedFilename = filename.replace(/[;&|`$()<>'"\\]/g, '');
      
      if (platform === 'darwin') {
        command = `screencapture "${sanitizedFilename}"`;
      } else if (platform === 'linux') {
        command = `import -window root "${sanitizedFilename}"`;
      } else if (platform === 'win32') {
        // Using PowerShell to capture screenshot on Windows with escaped filename
        const psFilename = sanitizedFilename.replace(/'/g, "''");
        command = `powershell -command "Add-Type -AssemblyName System.Windows.Forms;[System.Windows.Forms.SendKeys]::SendWait('%{PRTSC}');Start-Sleep -Milliseconds 500;$img = [System.Windows.Forms.Clipboard]::GetImage();$img.Save('${psFilename}')"`;
      }
      
      await this.executeCommand(command);
      spinner.succeed(chalk.green(`Screenshot saved to ${sanitizedFilename}`));
    } catch (error) {
      spinner.fail(chalk.red('Failed to capture screenshot'));
      throw error;
    }
  }
}
