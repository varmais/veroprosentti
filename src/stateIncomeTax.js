import config from "./config";

export function stateIncomeTax(salary) {
  const { income_tax } = config;

  if (typeof salary !== "number") {
    throw new Error("calculateIncomeTax expects a number");
  }

  if (salary > income_tax.level4.limit) {
    return calculateTaxWithLevel(salary, income_tax.level4);
  }
  if (salary > income_tax.level3.limit) {
    return calculateTaxWithLevel(salary, income_tax.level3);
  }
  if (salary > income_tax.level2.limit) {
    return calculateTaxWithLevel(salary, income_tax.level2);
  }
  if (salary > income_tax.level1.limit) {
    return calculateTaxWithLevel(salary, income_tax.level1);
  }

  return 0;
}

function calculateTaxWithLevel(salary, level) {
  return (
    Math.round((level.amount + (salary - level.limit) * level.tax) * 100) / 100
  );
}
