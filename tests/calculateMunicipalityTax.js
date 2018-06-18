import test from "tape";
import { calculateMunicipalityTax } from "../src/calculateMunicipalityTax";

test("calculates municipality tax", function(t) {
  t.equal(calculateMunicipalityTax(500000), 89886.36);
  t.equal(calculateMunicipalityTax(50000), 8460.61);
  t.equal(calculateMunicipalityTax(5000), -1753.75);
  t.equal(calculateMunicipalityTax(500), -2420.17);
  t.end();
});
