import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

describe('Authentication & JWT Utilities', () => {
  const secret = 'super-secret-jwt-key-for-shms-production';

  it('should generate and verify bcrypt password hashes', async () => {
    const rawPass = 'password123';
    const hash = await bcrypt.hash(rawPass, 10);
    const isMatch = await bcrypt.compare(rawPass, hash);
    expect(isMatch).toBe(true);
  });

  it('should reject incorrect password hashes', async () => {
    const hash = await bcrypt.hash('password123', 10);
    const isMatch = await bcrypt.compare('wrongpass', hash);
    expect(isMatch).toBe(false);
  });

  it('should sign and verify valid JWT tokens', () => {
    const payload = { userId: 'u-101', role: 'DOCTOR' };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    const decoded: any = jwt.verify(token, secret);
    expect(decoded.userId).toBe('u-101');
    expect(decoded.role).toBe('DOCTOR');
  });

  it('should throw error when verifying expired or malformed JWT token', () => {
    expect(() => jwt.verify('malformed.token.string', secret)).toThrow();
  });
});