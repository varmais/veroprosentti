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
  t.throws(() => stateIncomeTax());
  t.throws(() => stateIncomeTax("string"));
  t.throws(() => stateIncomeTax(null));
  t.doesNotThrow(() => stateIncomeTax(24));
  t.end();
});
