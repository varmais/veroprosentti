import { calculateIncomeTax } from "./calculateIncomeTax";
import config from "./config";

function deductIncomeGenerationDeduction(salary) {
  const maxIncomeGenerationDeduction = 750;
  return (
    salary -
    (salary > maxIncomeGenerationDeduction
      ? maxIncomeGenerationDeduction
      : salary)
  );
}

function deductPensionInsurance(effectiveIncome, salary) {
  const pensionInsurancePercentage = 0.0635; // 6.35 %
  return effectiveIncome - salary * pensionInsurancePercentage;
}

function deductUnemploymentInsurance(effectiveIncome, salary) {
  const unemploymentInsurancePercentage = 0.019; // 1.9 %
  return effectiveIncome - salary * unemploymentInsurancePercentage;
}

function deductHealthInsurance(effectiveIncome, salary) {
  const healthInsurancePercentage = 0.0153; // 1.53%
  if (salary > 14000) {
    return effectiveIncome - salary * healthInsurancePercentage;
  }
  return effectiveIncome;
}

function calculateEffectiveIncome(salary) {
  // Tulonhankkimisvähennys
  let effectiveIncome = deductIncomeGenerationDeduction(salary);

  // Työeläkevakuutusmaksu
  effectiveIncome = deductPensionInsurance(effectiveIncome, salary);

  // Työttömyysvakuutusmaksu
  effectiveIncome = deductUnemploymentInsurance(effectiveIncome, salary);

  // Sairausvakuutuksen päivärahamaksu
  return deductHealthInsurance(effectiveIncome, salary);
}

function calculateIncomeDeduction(salary) {
  let incomeDeduction = (7230 - 2500) * 0.51 + (salary - 7230) * 0.28;
  incomeDeduction = incomeDeduction > 3570 ? 3570 : incomeDeduction;
  incomeDeduction = incomeDeduction - (salary - 750 - 14000) * 0.045;
  return incomeDeduction < 0 ? 0 : incomeDeduction;
}

function calculateBasicDeduction(effectiveIncome, salary) {
  const incomeDeduction = calculateIncomeDeduction(salary);
  const basicDeduction =
    3100 - (effectiveIncome - incomeDeduction - 3100) * 0.18;
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

function calculateEarningsDeduction(effectiveIncome, salary, stateIncomeTax) {
  const maxEarningsDeduction = maxEarningDeduction(effectiveIncome, salary);
  const workIncomeDeduction = maxEarningsDeduction - stateIncomeTax;
  return workIncomeDeduction < 0 ? 0 : workIncomeDeduction;
}

export function calculateMunicipalityTax(salary) {
  // Laskennalliset vuositulot
  const effectiveIncome = calculateEffectiveIncome(salary);

  // Valtion verot
  const stateIncomeTax = calculateIncomeTax(salary);

  // Ansiotulovähennys
  const incomeDeduction = calculateIncomeDeduction(salary);

  // Perusvähennys
  const basicDeduction = calculateBasicDeduction(effectiveIncome, salary);

  // Työtulovähennys
  const earningDeduction = calculateEarningsDeduction(
    effectiveIncome,
    salary,
    stateIncomeTax
  );

  const effectiveIncomeAfterDeductions =
    effectiveIncome - incomeDeduction - basicDeduction;

  return (
    Math.round(
      (effectiveIncomeAfterDeductions * config.municipality_tax.average -
        earningDeduction) *
        100
    ) / 100
  );
}
