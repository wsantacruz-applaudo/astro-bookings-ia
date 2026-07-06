export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

type LogData = Record<string, unknown>;

const stringifyData = (data?: LogData): string => {
  if (!data) {
    return '';
  }

  try {
    return ` ${JSON.stringify(data)}`;
  } catch {
    return ' {"error":"Failed to serialize log data"}';
  }
};

export const log = (level: LogLevel, context: string, message: string, data?: LogData): void => {
  const timestamp = new Date().toISOString();
  const payload = stringifyData(data);
  console.log(`[${timestamp}] ${level} ${context} - ${message}${payload}`);
};

export const info = (context: string, message: string, data?: LogData): void => {
  log('INFO', context, message, data);
};

export const warn = (context: string, message: string, data?: LogData): void => {
  log('WARN', context, message, data);
};

export const error = (context: string, message: string, data?: LogData): void => {
  log('ERROR', context, message, data);
};

export const debug = (context: string, message: string, data?: LogData): void => {
  log('DEBUG', context, message, data);
};