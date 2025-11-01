import chalk from 'chalk';

export const BLNT_LOGO = `
██████╗ ██╗     ███╗   ██╗████████╗
██╔══██╗██║     ████╗  ██║╚══██╔══╝
██████╔╝██║     ██╔██╗ ██║   ██║   
██╔══██╗██║     ██║╚██╗██║   ██║   
██████╔╝███████╗██║ ╚████║   ██║   
╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   
`;

export const theme = {
  primary: chalk.hex('#00FFFF'), // Neon cyan
  secondary: chalk.hex('#FF00FF'), // Neon magenta
  accent: chalk.hex('#00FF00'), // Neon green
  error: chalk.hex('#FF0066'), // Neon red
  warning: chalk.hex('#FFFF00'), // Neon yellow
  success: chalk.hex('#00FF88'), // Neon green-cyan
  dim: chalk.hex('#666666'), // Dim gray
  text: chalk.white,
};

export function printLogo(): void {
  console.log(theme.primary(BLNT_LOGO));
  console.log(theme.secondary('  AI-Powered Terminal Assistant'));
  console.log(theme.dim('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
}

export function printWelcome(): void {
  printLogo();
  console.log(theme.text('  Welcome to BLNT-CLI v1.0.0'));
  console.log(theme.dim('  Local-first AI with Ollama, API fallback\n'));
}

export function formatMessage(label: string, message: string, color = theme.text): void {
  console.log(color(`${label}: `) + message);
}

export function formatError(error: Error | string): string {
  const message = error instanceof Error ? error.message : error;
  return theme.error(`✗ ${message}`);
}

export function formatSuccess(message: string): string {
  return theme.success(`✓ ${message}`);
}

export function formatInfo(message: string): string {
  return theme.primary(`ℹ ${message}`);
}
