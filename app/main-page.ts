import { EventData } from '@nativescript/core';
// import { Page } from '@nativescript/core';
import { InflationCalculatorModel } from './main-view-model';

// export function onNavigatingTo(args: EventData) {
//   const page = <Page>args.object;
//   page.bindingContext = new InflationCalculatorModel(); // Binding the ViewModel to the page
// }

export function onNavigatingTo(args: EventData) {
  const page = args.object;
  const viewModel = new InflationCalculatorModel();
  page.bindingContext = viewModel;
  console.log('Binding context set:', viewModel);
}

export function onCalculate(args: EventData) {
  const page = (<any>args.object).page;
  const viewModel = <InflationCalculatorModel>page.bindingContext;

  // Ensure numeric inputs are passed into the ViewModel
  viewModel.onCalculate();
}
