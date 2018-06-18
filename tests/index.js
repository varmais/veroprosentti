import test from "tape";
import veroprosentti, { municipality_taxes } from "../src/index";

test("throws error when monthly or yearly salary is not given", function(t) {
  t.throws(() => veroprosentti());
  t.end();
});

test("throws error when both monthly and yearly salary is given", function(t) {
  t.throws(() => veroprosentti({ monthly_salary: 5, annual_salary: 10 }));
  t.end();
});

test("calculates tax from yearly salary", function(t) {
  t.deepEqual(veroprosentti({ annual_salary: 50000 }), {
    salary: 50000,
    tax: 12231.17,
    tax_percentage: 24.46
  });
  t.end();
});

test("calculates tax with average municipality tax percentage", function(t) {
  t.deepEqual(veroprosentti({ monthly_salary: 4000 }), {
    salary: 48000,
    tax: 11471.51,
    tax_percentage: 23.9
  });
  t.end();
});

test("calculates tax with given municipality tax percentage", function(t) {
  t.deepEqual(
    veroprosentti({
      monthly_salary: 4000,
      municipality_tax: municipality_taxes.YPAJA
    }),
    {
      salary: 48000,
      tax: 12135.41,
      tax_percentage: 25.28
    }
  );
  t.deepEqual(
    veroprosentti({
      monthly_salary: 4000,
      municipality_tax: municipality_taxes.BRANDO
    }),
    {
      salary: 48000,
      tax: 10212.52,
      tax_percentage: 21.28
    }
  );
  t.end();
});

test("calculates tax from monthly salary without holiday bonus by default", function(t) {
  t.deepEqual(veroprosentti({ monthly_salary: 4000 }), {
    salary: 48000,
    tax: 11471.51,
    tax_percentage: 23.9
  });
  t.end();
});

test("calculates tax from monthly salary with holiday bonus", function(t) {
  t.deepEqual(veroprosentti({ monthly_salary: 4000, holiday_bonus: true }), {
    salary: 50000,
    tax: 12231.17,
    tax_percentage: 24.46
  });
  t.end();
});
