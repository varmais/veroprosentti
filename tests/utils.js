import test from "tape";
import { orZero, round } from "../src/utils";

test("rounds number by two decimals", function(t) {
  t.equal(round(1.111), 1.11);
  t.equal(round(5.555), 5.56);
  t.end();
});

test("return number or zero if number lower than zero", function(t) {
  t.equal(orZero(0.01), 0.01);
  t.equal(orZero(0), 0);
  t.equal(orZero(-0.01), 0);
  t.end();
});
