import { assertEqual } from "./assertions";
import { onlyTest, registerTest, registerTestSuite, skipTest } from "./testRunner";

registerTestSuite("my test suite", [
  registerTest("test number pass", () => assertEqual(1, 1)),
  registerTest("test number fail", () => assertEqual(1, 6)),
  registerTest("test string pass", () => assertEqual("coucou", "coucou")),
  registerTest("test string fail", () => assertEqual("coucou", "non merci")),
  registerTest("test throw", () => {
    throw new Error("oulala");
  }),
  registerTest("test object pass", () =>
    assertEqual(
      { clientId: "clientId", age: 8, pets: ["doggo", "catto"], caracterisitcs: { strength: 20, agility: 5 } },
      { clientId: "clientId", age: 8, pets: ["doggo", "catto"], caracterisitcs: { strength: 20, agility: 5 } }
    )
  ),
  registerTest("test object fail", () => assertEqual({ a: 1 }, { a: 2 })),
  registerTest("test function pass", () =>
    assertEqual(
      (str: string) => `Hello ${str}`,
      (str: string) => `Hello ${str}`
    )
  ),
  registerTest("test function fail", () =>
    assertEqual(
      (str: string) => `Hello ${str}`,
      (str: string) => `Goodbye ${str}`
    )
  ),
  registerTest("test function in array pass", () =>
    assertEqual([(str: string) => `Hello ${str}`], [(str: string) => `Hello ${str}`])
  ),
  registerTest("test function in array fail", () =>
    assertEqual([(str: string) => `Hello ${str}`], [(str: string) => `Goodbye ${str}`])
  ),
]);
