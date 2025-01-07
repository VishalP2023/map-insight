// month.model.ts
export class MonthOption {
    label: string;  // Display label like "1 month", "2 months"
    value: number;  // Numeric value like 1, 2, 3, etc.
  
    constructor(label: string, value: number) {
      this.label = label;
      this.value = value;
    }
  }
  