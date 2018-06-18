# Veroprosentti

This module can be used to estimate annual tax amount and percentage when paying taxes to Finnish tax authority.

## Usage

Function accepts one options parameter: an object containing information to calculate taxes. Following parameters are understood:

| Name               | Type    | Attributes | Description                                                                                                                |
| ------------------ | ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| `annual_salary`    | Number  |            | Annual salary amount from where to calculate taxes. Accepts either this or monthly_salary.                                 |
| `monthly_salary`   | Number  |            | Annual salary amount from where to calculate taxes. Accepts either this or annual_salary.                                  |
| `holiday_bonus`    | Boolean | optional   | Whether to include holiday bonus (lomaraha) in calculations. Default is `false`                                            |
| `municipality_tax` | Number  | optional   | Calculates taxes based on given municipality's municipality tax percentage. Default is average municipality tx of Finland. |

Function returns an object containing annual salary, annual tax amount and tax percentage.

## Examples

```javascript
import { veroprosentti, municipality_taxes } from "veroprosentti";

veroprosentti({ annual_salary: 50000 });
// => { salary: 50000, tax: 12231.17, tax_percentage: 24.46 }

veroprosentti({ monthly_salary: 4000 });
// => { salary: 48000, tax: 11471.51, tax_percentage: 23.9 }

veroprosentti({ monthly_salary: 4000, holiday_bonus: true });
// => { salary: 50000, tax: 12231.17, tax_percentage: 24.46 }

veroprosentti({
  monthly_salary: 4000,
  municipality_tax: municipality_taxes.YPAJA
});
// => { salary: 50000, tax: 12135.41, tax_percentage: 25.28 }
```
