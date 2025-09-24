import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "replace-with-a-strong-random-secret";
console.log("🔑 JWT_SECRET from env:", process.env.JWT_SECRET ? "Loaded" : "Not loaded");
console.log("🔑 JWT_SECRET length:", process.env.JWT_SECRET?.length);
function base64url(input: Buffer | string) {
  return (typeof input === 'string' ? Buffer.from(input) : input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export function signToken(payload: Record<string, any>, expiresInSeconds = 60 * 60 * 24 * 7) {
  console.log("🎫 SIGN TOKEN STARTED ==========")
  console.log("📄 Payload:", payload)
  console.log("🔑 Secret length:", JWT_SECRET.length)
  
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const body = { ...payload, iat: now, exp: now + expiresInSeconds };

  const headerB64 = base64url(JSON.stringify(header));
  const payloadB64 = base64url(JSON.stringify(body));
  const data = `${headerB64}.${payloadB64}`;
  
  console.log("📊 Header B64:", headerB64)
  console.log("📊 Payload B64:", payloadB64)
  console.log("📊 Data to sign:", data)
  
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(data)
    .digest();
  const sigB64 = base64url(signature);
  
  const token = `${data}.${sigB64}`;
  console.log("✅ Final Token:", token)
  console.log("🎫 SIGN TOKEN COMPLETED ========")
  
  return token;
}

export function verifyToken(token: string): { valid: boolean; payload?: any } {
  console.log("🔐 VERIFY TOKEN STARTED ========")
  console.log("🎫 Token received:", token)
  console.log("🔑 Secret length:", JWT_SECRET.length)
  
  try {
    const parts = token.split('.');
    console.log("📊 Token parts:", parts.length)
    
    if (parts.length !== 3) {
      console.log("❌ Invalid token parts")
      return { valid: false };
    }
    
    const [headerB64, payloadB64, sigB64] = parts;
    const data = `${headerB64}.${payloadB64}`;
    
    console.log("📊 Header B64:", headerB64)
    console.log("📊 Payload B64:", payloadB64)
    console.log("📊 Signature B64:", sigB64)
    console.log("📊 Data to verify:", data)
    
    const expectedSig = base64url(
      crypto.createHmac('sha256', JWT_SECRET).update(data).digest()
    );
    
    console.log("🔍 Expected Sig:", expectedSig)
    console.log("🔍 Actual Sig:", sigB64)
    console.log("🔍 Signature Match:", expectedSig === sigB64)
    
    if (expectedSig !== sigB64) {
      console.log("❌ Signature mismatch")
      return { valid: false };
    }
    
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString());
    console.log("📄 Decoded Payload:", payload)
    
    const now = Math.floor(Date.now() / 1000);
    console.log("⏰ Current time:", now)
    console.log("⏰ Token expiry:", payload.exp)
    console.log("⏰ Token expired:", payload.exp && now > payload.exp)
    
    if (payload.exp && now > payload.exp) {
      console.log("❌ Token expired")
      return { valid: false };
    }
    
    console.log("✅ Token verification successful")
    return { valid: true, payload };
  } catch (error) {
    console.log("❌ Token verification error:", error)
    return { valid: false };
  }
}

export function hashPasswordSHA256(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex');
}
