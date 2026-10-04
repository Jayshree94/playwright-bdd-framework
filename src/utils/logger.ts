type LogLevel = 'info' | 'warn' | 'error';

const MASK_KEYS = ['password', 'pwd', 'otp', 'pin'];

/** Replaces values of sensitive keys before anything is written to stdout/report attachments. */
function maskSensitive(data: unknown): unknown {
  if (data === null || typeof data !== 'object') return data;
  if (Array.isArray(data)) return data.map(maskSensitive);
  return Object.fromEntries(
    Object.entries(data as Record<string, unknown>).map(([key, value]) => [
      key,
      MASK_KEYS.includes(key.toLowerCase()) ? '***' : maskSensitive(value),
    ]),
  );
}

function write(level: LogLevel, message: string, meta?: unknown): void {
  const line = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;
  const payload = meta !== undefined ? maskSensitive(meta) : undefined;
  if (level === 'error') {
    console.error(line, payload ?? '');
  } else if (level === 'warn') {
    console.warn(line, payload ?? '');
  } else {
    console.log(line, payload ?? '');
  }
}

export const logger = {
  info: (message: string, meta?: unknown) => write('info', message, meta),
  warn: (message: string, meta?: unknown) => write('warn', message, meta),
  error: (message: string, meta?: unknown) => write('error', message, meta),
};
