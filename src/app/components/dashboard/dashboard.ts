import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../../services/finance';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
      <div class="card">Solde : <strong>{{summary?.balance}} €</strong></div>
      <div class="card" style="color: green;">Revenus : {{summary?.totalIncome}} €</div>
      <div class="card" style="color: red;">Dépenses : {{summary?.totalExpenses}} €</div>
    </div>
    <div style="max-width: 300px; margin: auto;">
      <canvas id="myChart"></canvas>
    </div>
  `,
  styles: ['.card { padding: 20px; border: 1px solid #ddd; border-radius: 8px; flex: 1; text-align: center; font-size: 1.2em; }']
})
export class DashboardComponent implements OnInit {
  summary: any;

  constructor(private financeService: FinanceService) {}

  ngOnInit() {
    // Récupère les chiffres (Solde, Revenus, Dépenses)
    this.financeService.getSummary().subscribe(data => this.summary = data);
    
    // Récupère les données du graphique
    this.financeService.getStatsByCategory().subscribe(data => {
      const labels = Object.keys(data);
      const values = Object.values(data);

      new Chart("myChart", {
        type: 'pie', // Camembert
        data: {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
          }]
        }
      });
    });
  }
}