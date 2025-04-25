export const useRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
});