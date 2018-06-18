import { stateIncomeTax } from "./stateIncomeTax";
import config from "./config";

function incomeGenerationDeduction(salary) {
  // Tulonhankkimisvähennys
  const maxIncomeGenerationDeduction = 750;
  return salary > maxIncomeGenerationDeduction
    ? maxIncomeGenerationDeduction
    : salary;
}

function pensionInsurance(salary) {
  // Työeläkevakuutusmaksu
  const pensionInsurancePercentage = 0.0635; // 6.35 %
  return salary * pensionInsurancePercentage;
}

function unemploymentInsurance(salary) {
  // Työttömyysvakuutusmaksu
  const unemploymentInsurancePercentage = 0.019; // 1.9 %
  return salary * unemploymentInsurancePercentage;
}

function healthInsurance(salary) {
  // Sairausvakuutuksen päivärahamaksu
  const healthInsurancePercentage = 0.0153; // 1.53%
  if (salary > 14000) {
    return salary * healthInsurancePercentage;
  }
  return 0;
}

function calculateEffectiveIncome(salary) {
  // Laskennalliset vuositulot
  return (
    salary -
    incomeGenerationDeduction(salary) -
    pensionInsurance(salary) -
    unemploymentInsurance(salary) -
    healthInsurance(salary)
  );
}

function incomeDeduction(salary) {
  // Ansiotulovähennys
  let deduction = (7230 - 2500) * 0.51 + (salary - 7230) * 0.28;
  deduction = deduction > 3570 ? 3570 : deduction;
  deduction = deduction - (salary - 750 - 14000) * 0.045;
  return deduction < 0 ? 0 : deduction;
}

function basicDeduction(effectiveIncome, salary) {
  // Perusvähennys
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
  // Työtulovähennys
  const maxEarningsDeduction = maxEarningDeduction(effectiveIncome, salary);
  const workIncomeDeduction = maxEarningsDeduction - stateIncomeTax;
  return workIncomeDeduction < 0 ? 0 : workIncomeDeduction;
}

export function municipalityTax(salary) {
  const effectiveIncome = calculateEffectiveIncome(salary);
  const effectiveIncomeAfterDeductions =
    effectiveIncome -
    incomeDeduction(salary) -
    basicDeduction(effectiveIncome, salary);

  return (
    Math.round(
      (effectiveIncomeAfterDeductions * config.municipality_tax.average -
        earningDeduction(effectiveIncome, salary, stateIncomeTax(salary))) *
        100
    ) / 100
  );
}
