import { assertEqual } from "../assertions";
import { clearTestsSuite, registerTest, runTestsSuites } from "../testRunner";

afterEach(clearTestsSuite);

it("test number pass", () => {
  const expected = [{ name: "test number pass", result: true }];
  registerTest("test number pass", () => assertEqual(1, 1));
  const actual = runTestsSuites();
  expect(actual).toEqual(expected);
});

it("test number fail", () => {
  const expected = [{ name: "test number fail", result: false }];
  registerTest("test number fail", () => assertEqual(1, 6));
  const actual = runTestsSuites();
  expect(actual).toEqual(expected);
});

it("test string pass", () => {
  const expected = [{ name: "test string pass", result: true }];
  registerTest("test string pass", () => assertEqual("coucou", "coucou"));
  const actual = runTestsSuites();
  expect(actual).toEqual(expected);
});

it("test string fail", () => {
  const expected = [{ name: "test string fail", result: false }];
  registerTest("test string fail", () => assertEqual("coucou", "non merci"));
  const actual = runTestsSuites();
  expect(actual).toEqual(expected);
});
