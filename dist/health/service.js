"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthService = void 0;
let connected = false;
let connectionError = null;
exports.healthService = {
    get connected() {
        return connected;
    },
    get error() {
        return connectionError;
    },
    setConnected(value, error) {
        connected = value;
        connectionError = error || null;
    },
    getStatus() {
        return {
            alive: true,
            ready: connected,
            ...(connectionError && { error: connectionError }),
        };
    },
};
