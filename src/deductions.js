import config from "./config";

/**
 * Tulonhankkimisvähennys.
 *
 * @param salary
 * @returns {number}
 */
export function incomeGenerationDeduction(salary) {
  return salary > config.constants.INCOME_GENERATION_MAX_DEDUCTION
    ? config.constants.INCOME_GENERATION_MAX_DEDUCTION
    : salary;
}

/**
 * Työeläkevakuutusmaksu.
 *
 * @param salary
 * @returns {number}
 */
export function pensionInsurance(salary) {
  return salary * config.constants.PENSION_INSURANCE_PERCENTAGE;
}

/**
 * Työttömyysvakuutusmaksu.
 *
 * @param salary
 * @returns {number}
 */
export function unemploymentInsurance(salary) {
  return salary * config.constants.UNEMPLOYMENT_INSURANCE_PERCENTAGE;
}

/**
 * Sairausvakuutuksen päivärahamaksu.
 *
 * @param salary
 * @returns {number}
 */
export function healthInsurance(salary) {
  if (salary > config.constants.HEALTH_INSURANCE_MIN_SALARY) {
    return salary * config.constants.HEALTH_INSURANCE_PERCENTAGE;
  }
  return 0;
}

/**
 * Verotettavat vuositulot vähennysten jälkeen.
 *
 * @param salary
 * @returns {number}
 */
export function calculateEffectiveIncome(salary) {
  return (
    salary -
    incomeGenerationDeduction(salary) -
    pensionInsurance(salary) -
    unemploymentInsurance(salary) -
    healthInsurance(salary)
  );
}
