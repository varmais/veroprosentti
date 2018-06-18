import test from "tape";
import { calculateMunicipalityTax } from "../src/calculateMunicipalityTax";

test("calculates municipality tax", function(t) {
  t.equal(calculateMunicipalityTax(500000), 89439.51);
  t.equal(calculateMunicipalityTax(50000), 8415.92);
  t.equal(calculateMunicipalityTax(5000), -1888.98);
  t.equal(calculateMunicipalityTax(500), -2550.13);
  t.end();
});
