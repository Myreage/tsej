import { assert, Assertion } from "./assertions";

type Test = {
  name: string;
  testScenario: (assertion: Assertion) => void;
};

type TestsSuite = Test[];

let testsSuite: TestsSuite = [];

export const registerTest = (name: string, testScenario: (assertion: Assertion) => void) =>
  testsSuite.push({ name, testScenario });

export const runTestsSuite = () => {
  const results = testsSuite.map((test) => {
    const testResult = {
      result: false,
    };
    const assertWithState = assert(testResult);
    test.testScenario(assertWithState);
    return { name: test.name, result: testResult.result };
  });
  return results;
};

export const clearTestsSuite = () => {
  testsSuite = [];
};
