import config from "./config";
import { calculateEffectiveIncome } from "./deductions";
import { orZero, round } from "./utils";

export function stateIncomeTax(salary) {
  if (typeof salary !== "number") {
    throw new Error("stateIncomeTax expects a number");
  }

  const { income_tax } = config;
  const effectiveIncome = calculateEffectiveIncome(salary);

  if (salary > income_tax.level4.limit) {
    return calculateTaxWithLevel(effectiveIncome, income_tax.level4);
  }
  if (salary > income_tax.level3.limit) {
    return calculateTaxWithLevel(effectiveIncome, income_tax.level3);
  }
  if (salary > income_tax.level2.limit) {
    return calculateTaxWithLevel(effectiveIncome, income_tax.level2);
  }
  if (salary > income_tax.level1.limit) {
    return calculateTaxWithLevel(effectiveIncome, income_tax.level1);
  }

  return 0;
}

function calculateTaxWithLevel(salary, level) {
  return orZero(round(level.amount + (salary - level.limit) * level.tax));
}
