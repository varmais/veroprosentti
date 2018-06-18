import { stateIncomeTax } from "./stateIncomeTax";
import { calculateEffectiveIncome } from "./deductions";
import { orZero, round } from "./utils";
import config from "./config";

function incomeDeduction(salary) {
  let deduction = (7230 - 2500) * 0.51 + (salary - 7230) * 0.28;
  deduction = deduction > 3570 ? 3570 : deduction;
  deduction = deduction - (salary - 750 - 14000) * 0.045;
  return deduction < 0 ? 0 : deduction;
}

function basicDeduction(effectiveIncome, salary) {
  const deduction = incomeDeduction(salary);
  const basicDeduction = 3100 - (effectiveIncome - deduction - 3100) * 0.18;
  return basicDeduction < 0 ? 0 : basicDeduction;
}

function maxEarningDeduction(effectiveIncome, salary) {
  if (salary > 33000) {
    const stateEffectiveIncome = (effectiveIncome - 2500) * 0.12;
    const stateEffectiveIncomeMax =
      stateEffectiveIncome > 1540 ? 1540 : stateEffectiveIncome;
    const overEffectiveStateIncomeMax = salary - 750 - 33000;
    return stateEffectiveIncomeMax - overEffectiveStateIncomeMax * 0.0165;
  }
  return 1540;
}

function earningDeduction(effectiveIncome, salary, stateIncomeTax) {
  const earningDeduction = maxEarningDeduction(effectiveIncome, salary);
  const workIncomeDeduction = earningDeduction - stateIncomeTax;
  return workIncomeDeduction < 0 ? 0 : workIncomeDeduction;
}

export function municipalityTax(
  salary,
  taxPercentage = config.municipality_tax.AVERAGE
) {
  const effectiveIncome = calculateEffectiveIncome(salary);
  const effectiveIncomeAfterDeductions =
    effectiveIncome -
    incomeDeduction(salary) -
    basicDeduction(effectiveIncome, salary);
  return orZero(
    round(
      effectiveIncomeAfterDeductions * taxPercentage -
        earningDeduction(effectiveIncome, salary, stateIncomeTax(salary))
    )
  );
}
