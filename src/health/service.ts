let connected = false;
let connectionError: string | null = null;

export const healthService = {
  get connected() {
    return connected;
  },

  get error() {
    return connectionError;
  },

  setConnected(value: boolean, error?: string | null): void {
    connected = value;
    connectionError = error || null;
  },

  getStatus(): { alive: boolean; ready: boolean; error?: string } {
    return {
      alive: true,
      ready: connected,
      ...(connectionError && { error: connectionError }),
    };
  },
};
