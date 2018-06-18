import config from "./config";
import { stateIncomeTax } from "./stateIncomeTax";
import { municipalityTax } from "./municipalityTax";
import { round } from "./utils";

export const municipality_taxes = config.municipality_tax;

const defaultOptions = {
  municipality_tax: config.municipality_tax.AVERAGE,
  monthly_salary: null,
  annual_salary: null,
  holiday_bonus: false
};

function validateSalaryOptions(options) {
  const hasNone = !options.monthly_salary && !options.annual_salary;
  const hasBoth = options.monthly_salary && options.annual_salary;
  if (hasNone || hasBoth) {
    throw new Error(
      "veroprosentti expects either monthly_salary or annual_salary"
    );
  }
}

function yearlySalary(options) {
  if (options.annual_salary) {
    return options.annual_salary;
  }
  if (options.monthly_salary && options.holiday_bonus) {
    return options.monthly_salary * 12.5;
  }
  return options.monthly_salary * 12;
}

export default function veroprosentti(config) {
  const options = Object.assign({}, defaultOptions, config);
  validateSalaryOptions(options);

  const salary = yearlySalary(options);
  const income_tax = stateIncomeTax(salary);
  const municipality_tax = options.municipality_tax
    ? municipalityTax(salary, options.municipality_tax)
    : municipalityTax(salary);
  const tax = income_tax + municipality_tax;
  const tax_percentage = round((tax / salary) * 100);

  return {
    salary,
    tax,
    tax_percentage
  };
}
