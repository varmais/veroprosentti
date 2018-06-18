import test from "tape";
import { municipalityTax } from "../src/municipalityTax";

test("calculates municipality tax", function(t) {
  t.equal(municipalityTax(500000), 89439.51);
  t.equal(municipalityTax(50000), 8415.92);
  t.equal(municipalityTax(5000), -1888.98);
  t.equal(municipalityTax(500), -2550.13);
  t.end();
});
