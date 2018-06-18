import test from "tape";
import config from "../src/config";
import {
  incomeGenerationDeduction,
  pensionInsurance,
  calculateEffectiveIncome,
  healthInsurance,
  unemploymentInsurance
} from "../src/deductions";

test("calculates income generation deduction", function(t) {
  t.equal(
    incomeGenerationDeduction(config.constants.INCOME_GENERATION_MAX_DEDUCTION),
    750
  );
  t.equal(
    incomeGenerationDeduction(
      config.constants.INCOME_GENERATION_MAX_DEDUCTION - 1
    ),
    config.constants.INCOME_GENERATION_MAX_DEDUCTION - 1
  );
  t.end();
});

test("calculates pension insurance", function(t) {
  t.equal(pensionInsurance(10000), 635);
  t.end();
});

test("calculates health insurance", function(t) {
  t.equal(healthInsurance(config.constants.HEALTH_INSURANCE_MIN_SALARY), 0);
  t.equal(healthInsurance(100000), 1530);
  t.end();
});

test("calculates unemployment insurance", function(t) {
  t.equal(unemploymentInsurance(10000), 190);
  t.end();
});

test("calculates effective income", function(t) {
  t.equal(calculateEffectiveIncome(10000), 8425);
  t.equal(calculateEffectiveIncome(100000), 89470);
  t.end();
});
