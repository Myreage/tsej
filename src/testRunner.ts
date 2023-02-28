import chalk = require("chalk");
import { AssertResult, FailedAssertResult, SuccessfulAssertResult } from "./assertions";

type Test<T> = {
  name: string;
  flag?: "only" | "skip";
  testScenario: () => AssertResult<T>;
};

type FailedTestResult<T> = FailedAssertResult<T> & { name: string };
type SuccessfulTestResult = SuccessfulAssertResult & { name: string };
type FatalErrorTestResult = { type: "FatalErrorTestResult"; message: string; name: string };
export type TestResult<T> = FailedTestResult<T> | SuccessfulTestResult | FatalErrorTestResult;

const runTest = (test: Test<any>): TestResult<any> => {
  try {
    return {
      ...test.testScenario(),
      name: test.name,
    };
  } catch (e) {
    return {
      type: "FatalErrorTestResult",
      message: e.message,
      name: test.name,
    };
  }
};

export const registerTestSuite = (name: string, tests: Test<any>[]) => {
  const onlyTests = tests.filter(({ flag }) => flag === "only");

  const testsToRun = onlyTests.length ? onlyTests : tests;

  const results = testsToRun.map(runTest);
  displayTestsSuiteRunResults(results);
};

export const registerTest = <T>(name: string, testScenario: () => AssertResult<T>): Test<T> => ({
  name,
  testScenario,
});

export const skipTest = <T>(name: string, testScenario: () => AssertResult<T>): Test<T> => ({
  name,
  flag: "skip",
  testScenario,
});

export const onlyTest = <T>(name: string, testScenario: () => AssertResult<T>): Test<T> => ({
  name,
  flag: "only",
  testScenario,
});

const displaySuccessFullTestResult = (): void => {
  const testSuccess = chalk.bold.green;
  console.log(testSuccess("  Test passed"));
};

const displayFatalErrorTestResult = (result: FatalErrorTestResult): void => {
  const testError = chalk.bold.yellow;
  const testErrorReason = chalk.yellow;
  console.log(testError("  🚨 Fatal error occured 🚨"));
  console.log(testErrorReason(`    ${result.message}`));
};

const displayFailedTestResult = (result: FailedTestResult<any>): void => {
  const testError = chalk.bold.red;
  const testErrorReason = chalk.red;
  console.log(testError("  Test failed"));
  console.log(testErrorReason(`    Expected: ${result.reason.expected}`));
  console.log(testErrorReason(`    Received: ${result.reason.received}`));
};
const displayTestTitle = (result: TestResult<any>): void => {
  const testTitle = chalk.underline;
  console.log(testTitle(result.name));
};

export const displayTestsSuiteRunResults = (results: TestResult<any>[]): void => {
  results.forEach((result) => {
    displayTestTitle(result);
    switch (result.type) {
      case "FatalErrorTestResult":
        displayFatalErrorTestResult(result);
        break;
      case "FailedAssertResult":
        displayFailedTestResult(result);
        break;
      case "SuccessfulAssertResult":
        displaySuccessFullTestResult();
        break;
    }
    console.log("\n");
  });
};
