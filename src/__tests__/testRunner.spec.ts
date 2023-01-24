import { clearTestsSuite, registerTest, runTestsSuite } from "../testRunner";

afterEach(clearTestsSuite);

it("test number pass", () => {
  const expected = [{ name: "test number pass", result: true }];
  registerTest("test number pass", (assert) => {
    assert(1, 1);
  });
  const actual = runTestsSuite();
  expect(actual).toEqual(expected);
});

it("test number fail", () => {
  const expected = [{ name: "test number fail", result: false }];
  registerTest("test number fail", (assert) => assert(1, 6));
  const actual = runTestsSuite();
  expect(actual).toEqual(expected);
});

it("test string pass", () => {
  const expected = [{ name: "test string pass", result: true }];
  registerTest("test string pass", (assert) => assert("coucou", "coucou"));
  const actual = runTestsSuite();
  expect(actual).toEqual(expected);
});

it("test string fail", () => {
  const expected = [{ name: "test string fail", result: false }];
  registerTest("test string fail", (assert) => assert("coucou", "non merci"));
  const actual = runTestsSuite();
  expect(actual).toEqual(expected);
});
