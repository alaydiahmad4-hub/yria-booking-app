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

export const api = {
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

  async createBooking(booking: any) {
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
        signal: AbortSignal.timeout(2500)
      });
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (e) {
      console.warn('API createBooking fallback', e);
      return null;
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

  async getChatMessages() {
    try {
      const res = await fetch(`${API_URL}/chat/messages`, {
        signal: AbortSignal.timeout(3000)
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
