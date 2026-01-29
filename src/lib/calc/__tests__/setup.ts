/**
 * Vitest Setup for Calculation Tests
 *
 * Sets up mocks and global state needed for running tests in Node environment.
 */

import { beforeAll, afterEach, vi } from 'vitest';

// Mock localStorage for Node environment
const localStorageMock = {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn(() => null),
};

beforeAll(() => {
    // Set up localStorage mock
    Object.defineProperty(globalThis, 'localStorage', {
        value: localStorageMock,
        writable: true,
    });
});

afterEach(() => {
    // Clear mock call history between tests
    vi.clearAllMocks();
});
