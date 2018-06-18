import { stateIncomeTax } from "../src/stateIncomeTax";
import test from "tape";

test("with 0 income returns 0", function(t) {
  t.equal(stateIncomeTax(0), 0);
  t.end();
});

test("rounds tax to two decimals if necessary", function(t) {
  t.equal(stateIncomeTax(17200), 0);
  t.equal(stateIncomeTax(17201), 8.06);
  t.end();
});

test("throws an error when parameter is not a number", function(t) {
  const expectedError = "calculateIncomeTax expects a number";
  t.throws(() => stateIncomeTax(), expectedError);
  t.throws(() => stateIncomeTax("string"), expectedError);
  t.throws(() => stateIncomeTax(null), expectedError);
  t.end();
});
