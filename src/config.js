export default {
  income_tax: {
    level1: { limit: 17200, amount: 8, tax: 0.06 },
    level2: { limit: 25700, amount: 518, tax: 0.1725 },
    level3: { limit: 42400, amount: 3398.75, tax: 0.2125 },
    level4: { limit: 74200, amount: 10156.25, tax: 0.3125 }
  },
  municipality_tax: {
    average: 0.1986
  },
  constants: {
    INCOME_GENERATION_MAX_DEDUCTION: 750,
    PENSION_INSURANCE_PERCENTAGE: 0.0635,
    UNEMPLOYMENT_INSURANCE_PERCENTAGE: 0.019,
    HEALTH_INSURANCE_PERCENTAGE: 0.0153,
    HEALTH_INSURANCE_MIN_SALARY: 14000
  }
};
