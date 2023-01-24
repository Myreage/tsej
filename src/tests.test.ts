import { registerTest, runTestsSuite } from "./testRunner";

registerTest("test number pass", (assert) => {
  assert(1, 1);
});
registerTest("test number fail", (assert) => assert(1, 6));
registerTest("test string pass", (assert) => assert("coucou", "coucou"));
registerTest("test string fail", (assert) => assert("coucou", "non merci"));

console.log(runTestsSuite());
