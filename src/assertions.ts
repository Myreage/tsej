export type Assertion = <T>(actual: T, expected: T) => void;

export const assert =
  (state: { result: boolean }): Assertion =>
  (actual, expected) => {
    state.result = actual === expected;
  };
