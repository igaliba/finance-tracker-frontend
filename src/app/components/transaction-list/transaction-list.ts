import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../../services/finance';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css'
})
export class TransactionListComponent implements OnInit {
  transactions: any[] = [];

  constructor(private financeService: FinanceService) {}

  ngOnInit() {
    this.financeService.getTransactions().subscribe(data => {
      this.transactions = data;
    });
  }
}