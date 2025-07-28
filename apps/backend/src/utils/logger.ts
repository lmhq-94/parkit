import { Request } from 'express';

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  operation?: string;
  duration?: number;
  error?: Error;
  metadata?: Record<string, any>;
}

class Logger {
  private logLevel: LogLevel;

  constructor() {
    this.logLevel = (process.env.LOG_LEVEL as LogLevel) || LogLevel.INFO;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO, LogLevel.DEBUG];
    return levels.indexOf(level) <= levels.indexOf(this.logLevel);
  }

  private formatLog(entry: LogEntry): string {
    const base = `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`;
    const metadata = entry.metadata ? ` | ${JSON.stringify(entry.metadata)}` : '';
    return base + metadata;
  }

  private log(level: LogLevel, message: string, metadata?: Record<string, any>): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata,
    };

    const formattedLog = this.formatLog(entry);

    switch (level) {
      case LogLevel.ERROR:
        console.error(formattedLog);
        break;
      case LogLevel.WARN:
        console.warn(formattedLog);
        break;
      case LogLevel.INFO:
        console.info(formattedLog);
        break;
      case LogLevel.DEBUG:
        console.debug(formattedLog);
        break;
    }
  }

  error(message: string, error?: Error, metadata?: Record<string, any>): void {
    this.log(LogLevel.ERROR, message, { ...metadata, error: error?.stack });
  }

  warn(message: string, metadata?: Record<string, any>): void {
    this.log(LogLevel.WARN, message, metadata);
  }

  info(message: string, metadata?: Record<string, any>): void {
    this.log(LogLevel.INFO, message, metadata);
  }

  debug(message: string, metadata?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, message, metadata);
  }

  // Request logging
  logRequest(req: Request, operation: string, duration?: number, error?: Error): void {
    const metadata = {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      userId: (req as any).user?.id,
      operation,
      duration,
    };

    if (error) {
      this.error(`Request failed: ${operation}`, error, metadata);
    } else {
      this.info(`Request completed: ${operation}`, metadata);
    }
  }

  // Authentication logging
  logAuth(userId: string, action: string, success: boolean, metadata?: Record<string, any>): void {
    const level = success ? LogLevel.INFO : LogLevel.WARN;
    const message = `Authentication ${action}: ${success ? 'SUCCESS' : 'FAILED'} for user ${userId}`;
    this.log(level, message, { userId, action, success, ...metadata });
  }

  // Database logging
  logDatabase(operation: string, table: string, duration: number, metadata?: Record<string, any>): void {
    this.debug(`Database operation: ${operation} on ${table}`, {
      operation,
      table,
      duration,
      ...metadata,
    });
  }
}

export const logger = new Logger();
