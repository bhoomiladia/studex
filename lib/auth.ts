import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

function base64url(input: Buffer | string) {
  return (typeof input === 'string' ? Buffer.from(input) : input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export function signToken(payload: Record<string, any>, expiresInSeconds = 60 * 60 * 24 * 7) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const body = { ...payload, iat: now, exp: now + expiresInSeconds };

  const headerB64 = base64url(JSON.stringify(header));
  const payloadB64 = base64url(JSON.stringify(body));
  const data = `${headerB64}.${payloadB64}`;
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(data)
    .digest();
  const sigB64 = base64url(signature);
  return `${data}.${sigB64}`;
}

export function verifyToken(token: string): { valid: boolean; payload?: any } {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false };
    const [headerB64, payloadB64, sigB64] = parts;
    const data = `${headerB64}.${payloadB64}`;
    const expectedSig = base64url(
      crypto.createHmac('sha256', JWT_SECRET).update(data).digest()
    );
    if (expectedSig !== sigB64) return { valid: false };
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString());
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && now > payload.exp) return { valid: false };
    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}

export function hashPasswordSHA256(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex');
}
