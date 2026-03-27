import { Component } from '@angular/core';
import { TransactionFormComponent } from './components/transaction-form/transaction-form';
import { TransactionListComponent } from './components/transaction-list/transaction-list';
import { DashboardComponent } from './components/dashboard/dashboard'; // 1. L'import est bon

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TransactionFormComponent, TransactionListComponent, DashboardComponent], // 2. Ajoute DashboardComponent ici
  template: `
    <div style="max-width: 800px; margin: auto; padding: 20px; font-family: sans-serif;">
      <h1>💰 Finance Tracker</h1>
      
      <app-dashboard></app-dashboard>
      
      <hr>
      <app-transaction-form></app-transaction-form>
      <hr>
      <app-transaction-list></app-transaction-list>
    </div>
  `
})
export class AppComponent {}