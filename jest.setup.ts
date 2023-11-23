import "@testing-library/jest-dom";
import "whatwg-fetch";

type MediaQueryListMock = {
  matches: boolean;
  media: string;
  onchange: null;
  addListener: jest.Mock; // deprecated
  removeListener: jest.Mock; // deprecated
  addEventListener: jest.Mock;
  removeEventListener: jest.Mock;
  dispatchEvent: jest.Mock;
};

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(
    (query: string): MediaQueryListMock => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  ),
});
