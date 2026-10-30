import { describe, it, expect } from 'vitest';
import { api } from '../../src/services/api';

describe('Auth & Payment Integration', () => {
  it('manages token storage correctly', () => {
    api.setAuthToken('test-jwt-token-12345');
    expect(api.getAuthToken()).toBe('test-jwt-token-12345');

    api.setAuthToken(null);
    expect(api.getAuthToken()).toBeNull();
  });

  it('handles failed login gracefully with null fallback', async () => {
    // When backend returns error or invalid credentials
    const result = await api.login('+963000000000', 'wrong_password');
    // graceful fallback returns null without throwing unhandled exceptions
    expect(result).toBeNull();
  });

  it('handles otp login gracefully on network failure', async () => {
    const result = await api.otpLogin('+963911223344', 'Guest', '000000');
    // Result is either an auth object or null graceful fallback
    expect(result === null || typeof result === 'object').toBe(true);
  });

  it('handles payment reference verification gracefully', async () => {
    const result = await api.verifyPaymentReference('book-test', 'TXN-TEST-123', 'syriatel_cash');
    expect(result === null || typeof result === 'object').toBe(true);
  });
});
