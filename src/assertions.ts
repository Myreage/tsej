export type Assertion<U> = <T extends U>(actual: T, expected: T) => void;

export type SuccessfulAssertResult = { type: "SuccessfulAssertResult" };
export type FailedAssertResult<T> = { type: "FailedAssertResult"; reason: { expected: T; received: T } };
export type AssertResult<T> = SuccessfulAssertResult | FailedAssertResult<T>;

const toString = <T>(input: T) => {
  return JSON.stringify(input, (_, value) => {
    if (typeof value === "function") {
      return value.toString();
    }
    return value;
  });
};

export const assertEqual = <T>(actual: T, expected: T): AssertResult<string> => {
  const actualStringified = toString(actual);
  const expectedStringified = toString(expected);

  if (actualStringified === expectedStringified) {
    return {
      type: "SuccessfulAssertResult",
    };
  }
  return {
    type: "FailedAssertResult",
    reason: { expected: expectedStringified, received: actualStringified },
  };
};
