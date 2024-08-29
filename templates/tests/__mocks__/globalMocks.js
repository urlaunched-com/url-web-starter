jest.mock("@/shared", () => ({
  axiosBaseQuery: jest.fn(),
  createBem: jest.fn().mockReturnValue(jest.fn()),
  useTranslations: jest.fn().mockReturnValue(jest.fn()),
}));
