import { createHash, timingSafeEqual } from 'node:crypto';

export function generateCsrfToken(): string {
  return createHash('sha256')
    .update(crypto.randomUUID())
    .digest('hex');
}

export function validateCsrfToken(token: string | null, sessionToken: string): boolean {
  if (!token || !sessionToken) return false;
  
  try {
    const tokenBuffer = Buffer.from(token, 'hex');
    const sessionBuffer = Buffer.from(sessionToken, 'hex');
    
    if (tokenBuffer.length !== sessionBuffer.length) {
      return false;
    }
    
    return timingSafeEqual(tokenBuffer, sessionBuffer);
  } catch {
    return false;
  }
}
