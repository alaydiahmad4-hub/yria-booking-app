const getBaseUrl = () => {
  if (typeof window === 'undefined') return 'http://192.168.1.6:5001/api';
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    return 'http://localhost:5001/api';
  }
  if (host === 'appassets.androidplatform.net' || !host) {
    return 'http://192.168.1.6:5001/api';
  }
  return `http://${host}:5001/api`;
};

const API_URL = getBaseUrl();

export interface AuthUser {
  id: string;
  phone: string;
  name: string;
  role: 'guest' | 'host' | 'admin';
}

export const api = {
  getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('seyran_auth_token');
  },

  setAuthToken(token: string | null) {
    if (typeof window === 'undefined') return;
    if (token) localStorage.setItem('seyran_auth_token', token);
    else localStorage.removeItem('seyran_auth_token');
  },

  // 1. Authentication Endpoints (Step 2)
  async login(phone: string, password: string): Promise<{ user: AuthUser; token: string } | null> {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
        signal: AbortSignal.timeout(4000)
      });
      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      if (data.token) this.setAuthToken(data.token);
      return data;
    } catch (e) {
      console.warn('API login error:', e);
      return null;
    }
  },

  async register(phone: string, name: string, password: string, role: string = 'guest'): Promise<{ user: AuthUser; token: string } | null> {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, name, password, role }),
        signal: AbortSignal.timeout(4000)
      });
      if (!res.ok) throw new Error('Registration failed');
      const data = await res.json();
      if (data.token) this.setAuthToken(data.token);
      return data;
    } catch (e) {
      console.warn('API register error:', e);
      return null;
    }
  },

  async otpLogin(phone: string, name?: string, otp: string = '123456'): Promise<{ user: AuthUser; token: string } | null> {
    try {
      const res = await fetch(`${API_URL}/auth/otp-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, name, otp }),
        signal: AbortSignal.timeout(4000)
      });
      if (!res.ok) throw new Error('OTP Login failed');
      const data = await res.json();
      if (data.token) this.setAuthToken(data.token);
      return data;
    } catch (e) {
      console.warn('API otpLogin error:', e);
      return null;
    }
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    const token = this.getAuthToken();
    if (!token) return null;
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` },
        signal: AbortSignal.timeout(3000)
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.user;
    } catch {
      return null;
    }
  },

  // 2. Properties Endpoints
  async getProperties(includeAll: boolean = false) {
    try {
      const res = await fetch(`${API_URL}/properties?all=${includeAll}`, {
        signal: AbortSignal.timeout(2500)
      });
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (e) {
      console.warn('API getProperties fallback to local', e);
      return null;
    }
  },

  async createProperty(property: any) {
    try {
      const res = await fetch(`${API_URL}/properties`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(property),
        signal: AbortSignal.timeout(2500)
      });
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (e) {
      console.warn('API createProperty fallback', e);
      return null;
    }
  },

  async updateProperty(id: string, updates: any) {
    try {
      const res = await fetch(`${API_URL}/properties/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
        signal: AbortSignal.timeout(2500)
      });
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (e) {
      console.warn('API updateProperty fallback', e);
      return null;
    }
  },

  async deleteProperty(id: string) {
    try {
      const res = await fetch(`${API_URL}/properties/${id}`, {
        method: 'DELETE',
        signal: AbortSignal.timeout(2500)
      });
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (e) {
      console.warn('API deleteProperty fallback', e);
      return null;
    }
  },

  // 3. Bookings & Escrow Endpoints
  async getBookings() {
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        signal: AbortSignal.timeout(2500)
      });
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (e) {
      console.warn('API getBookings fallback', e);
      return null;
    }
  },

  async createBooking(booking: any): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const token = this.getAuthToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers,
        body: JSON.stringify(booking),
        signal: AbortSignal.timeout(4000)
      });

      if (res.status === 409) {
        const errorData = await res.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.error || 'عذراً، هذا العقار محجوز مسبقاً في هذه التواريخ المحددة. يرجى اختيار تاريخ آخر.'
        };
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.error || `خطأ في معالجة الحجز (${res.status})`
        };
      }

      const data = await res.json();
      return { success: true, data };
    } catch (e: any) {
      console.warn('API createBooking offline fallback', e);
      // If server is unreachable, we treat it as an offline booking success
      return { success: true };
    }
  },

  async updateBooking(id: string, updates: any) {
    try {
      const res = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
        signal: AbortSignal.timeout(2500)
      });
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (e) {
      console.warn('API updateBooking fallback', e);
      return null;
    }
  },

  // 4. Platform Settings (Dynamic Exchange Rate)
  async getExchangeRate(): Promise<number> {
    try {
      const res = await fetch(`${API_URL}/settings/exchange-rate`, {
        signal: AbortSignal.timeout(2500)
      });
      if (!res.ok) throw new Error('Failed to fetch exchange rate');
      const data = await res.json();
      return Number(data.rate) || 14500;
    } catch (e) {
      console.warn('API getExchangeRate fallback to default', e);
      return 14500;
    }
  },

  async updateExchangeRate(rate: number): Promise<{ success: boolean; error?: string }> {
    try {
      const token = this.getAuthToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/settings/exchange-rate`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ rate: Number(rate) }),
        signal: AbortSignal.timeout(4000)
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { success: false, error: data.error || 'تعذر تحديث سعر الصرف في الخادم' };
      }
      return { success: true };
    } catch (e: any) {
      console.warn('API updateExchangeRate error', e);
      return { success: false, error: e.message || 'تعذر الاتصال بالخادم لتحديث سعر الصرف' };
    }
  },

  // 4. Payment Gateway Webhooks (Step 3)
  async verifyPaymentReference(bookingId: string, reference: string, provider: string = 'al_haram') {
    try {
      const res = await fetch(`${API_URL}/payments/verify-reference`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, reference, provider }),
        signal: AbortSignal.timeout(4000)
      });
      if (!res.ok) throw new Error('Payment verification error');
      return await res.json();
    } catch (e) {
      console.warn('API verifyPaymentReference error:', e);
      return null;
    }
  },

  async triggerSyriatelWebhook(transactionId: string, bookingId: string, amountSyp: number, senderPhone: string) {
    try {
      const res = await fetch(`${API_URL}/payments/syriatel/webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId, bookingId, amountSyp, senderPhone, status: 'SUCCESS' }),
        signal: AbortSignal.timeout(4000)
      });
      if (!res.ok) throw new Error('Syriatel webhook error');
      return await res.json();
    } catch (e) {
      console.warn('API triggerSyriatelWebhook error:', e);
      return null;
    }
  },

  // 5. Admin & PDF Endpoints
  async getStats() {
    try {
      const res = await fetch(`${API_URL}/stats`, {
        signal: AbortSignal.timeout(2500)
      });
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (e) {
      console.warn('API getStats fallback', e);
      return null;
    }
  },

  async downloadVoucherPdf(bookingId: string) {
    try {
      window.open(`${API_URL}/bookings/${bookingId}/pdf`, '_blank');
    } catch (e) {
      console.error('Download voucher PDF failed', e);
    }
  },

  // 6. Chat & Concierge Endpoints
  async getChatMessages() {
    try {
      const res = await fetch(`${API_URL}/chat/messages`, {
        signal: AbortSignal.timeout(2500)
      });
      if (!res.ok) throw new Error('Chat API error');
      return await res.json();
    } catch (e) {
      console.warn('API getChatMessages fallback to local', e);
      return null;
    }
  },

  async sendChatMessage(payload: {
    text: string;
    sender?: string;
    senderName?: string;
    propertyId?: string | null;
    propertyTitle?: string | null;
  }) {
    try {
      const res = await fetch(`${API_URL}/chat/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(4000)
      });
      if (!res.ok) throw new Error('Chat API error');
      return await res.json();
    } catch (e) {
      console.warn('API sendChatMessage fallback to local', e);
      return null;
    }
  },

  async resetChatMessages() {
    try {
      const res = await fetch(`${API_URL}/chat/messages`, {
        method: 'DELETE',
        signal: AbortSignal.timeout(3000)
      });
      if (!res.ok) throw new Error('Chat API error');
      return await res.json();
    } catch (e) {
      console.warn('API resetChatMessages fallback to local', e);
      return null;
    }
  }
};
