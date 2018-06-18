import { calculateIncomeTax } from "../src/calculateIncomeTax";
import test from "tape";

test("with 0 income returns 0", function(t) {
  t.equal(calculateIncomeTax(0), 0);
  t.end();
});

test("rounds tax to two decimals if necessary", function(t) {
  t.equal(calculateIncomeTax(17200), 0);
  t.equal(calculateIncomeTax(17201), 8.06);
  t.end();
});

test("throws an error when parameter is not a number", function(t) {
  const expectedError = "calculateIncomeTax expects a number";
  t.throws(() => calculateIncomeTax(), expectedError);
  t.throws(() => calculateIncomeTax("string"), expectedError);
  t.throws(() => calculateIncomeTax(null), expectedError);
  t.end();
});
