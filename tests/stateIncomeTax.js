import { stateIncomeTax } from "../src/stateIncomeTax";
import test from "tape";

test("calculates state income tax", function(t) {
  t.equal(stateIncomeTax(100000), 14928.13);
  t.equal(stateIncomeTax(40000), 2180.55);
  t.equal(stateIncomeTax(10000), 0);
  t.equal(stateIncomeTax(0), 0);
  t.end();
});

test("throws an error when parameter is not a number", function(t) {
  const expectedError = "stateIncomeTax expects a number";
  t.throws(() => stateIncomeTax(), expectedError);
  t.throws(() => stateIncomeTax("string"), expectedError);
  t.throws(() => stateIncomeTax(null), expectedError);
  t.end();
});
