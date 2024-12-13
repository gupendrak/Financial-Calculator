import { Observable } from '@nativescript/core';

export class InflationCalculatorModel extends Observable {
  private _currentValue: number;
  private _inflationRate: number;
  private _futureYear: number;
  private _calculatedValue: string;

  constructor() {
    super();
    this._currentValue = '';
    this._inflationRate = '';
    this._futureYear = '';
    this._calculatedValue = '';
  }

  get currentValue(): number {
    return this._currentValue;
  }

  // set currentValue(value: string) {
  //   this._currentValue = parseFloat(value) || 0;
  //   this.notifyPropertyChange('currentValue', this._currentValue);
  // }
  // set currentValue(value: string) {
  //   const parsedValue = parseFloat(value);
  //   this._currentValue = !isNaN(parsedValue) ? parsedValue : 0;
  //   console.log('Updated Current Value:', this._currentValue);
  //   this.notifyPropertyChange('currentValue', this._currentValue);
  // }

  get inflationRate(): number {
    return this._inflationRate;
  }

  // set inflationRate(value: string) {
  //   this._inflationRate = parseFloat(value) || 0;
  //   this.notifyPropertyChange('inflationRate', this._inflationRate);
  // }

  get futureYear(): number {
    return this._futureYear;
  }

  // set futureYear(value: string) {
  //   this._futureYear = parseInt(value, 10) || 0;
  //   this.notifyPropertyChange('futureYear', this._futureYear);
  // }
  set currentValue(value: string) {
    console.log('Setting currentValue:', value);
    this._currentValue = parseFloat(value) || 0;
    this.notifyPropertyChange('currentValue', this._currentValue);
  }

  set inflationRate(value: string) {
    console.log('Setting inflationRate:', value);
    this._inflationRate = parseFloat(value) || 0;
    this.notifyPropertyChange('inflationRate', this._inflationRate);
  }

  set futureYear(value: string) {
    console.log('Setting futureYear:', value);
    this._futureYear = parseInt(value, 10) || 0;
    this.notifyPropertyChange('futureYear', this._futureYear);
  }

  get calculatedValue(): string {
    return this._calculatedValue;
  }

  set calculatedValue(value: string) {
    this._calculatedValue = value;
    this.notifyPropertyChange('calculatedValue', value);
  }

  // Method to calculate the future value with validation
  onCalculate() {
    // Check if the input fields are numbers, filled, and greater than zero
    console.log('Inputs Received:', {
      currentValue: this._currentValue,
      inflationRate: this._inflationRate,
      futureYear: this._futureYear,
    });
    if (
      isNaN(this._currentValue) ||
      this._currentValue <= 0 ||
      isNaN(this._inflationRate) ||
      this._inflationRate <= 0 ||
      isNaN(this._futureYear) ||
      this._futureYear <= 0
    ) {
      this.forceUpdateCalculatedValue(
        'Invalid input. All fields must be numbers greater than zero.'
      );
      return;
    }

    const currentYear = new Date().getFullYear();
    const years = this._futureYear - currentYear;

    // Check if the future year is greater than the current year
    if (years <= 0) {
      this.forceUpdateCalculatedValue(
        'Please enter a future year greater than the current year.'
      );
      return;
    }

    // Calculate the future value using the inflation formula
    const futureValue =
      this._currentValue * Math.pow(1 + this._inflationRate / 100, years);
    this.forceUpdateCalculatedValue(`Future Value: ₹${futureValue.toFixed(2)}`);
  }

  // Helper method to force update the calculated value
  private forceUpdateCalculatedValue(newValue: string) {
    if (this._calculatedValue === newValue) {
      // Temporarily clear the value to trigger the UI update
      this.notifyPropertyChange('calculatedValue', '');
    }
    this.calculatedValue = newValue;
  }
}
