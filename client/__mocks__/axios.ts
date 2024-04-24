import { vi } from "vitest";

const mockAxios = {
  get: vi.fn(() => Promise.resolve({ data: {} })),
  post: vi.fn(() => Promise.resolve({ data: [] })),
  delete: vi.fn(() => Promise.resolve({ data: [] })),
  put: vi.fn(() => Promise.resolve({ data: [] })),
  isAxiosError: vi.fn((err) => {
    return err.isAxiosError;
  }),
};

export default mockAxios;
