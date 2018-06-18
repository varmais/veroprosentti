import test from "tape";
import { municipalityTax } from "../src/municipalityTax";

test("calculates municipality tax", function(t) {
  t.equal(municipalityTax(500000), 89439.51);
  t.equal(municipalityTax(50000), 8415.92);
  t.equal(municipalityTax(25000), 2399.25);
  t.equal(municipalityTax(5000), 0);
  t.equal(municipalityTax(0), 0);
  t.end();
});
