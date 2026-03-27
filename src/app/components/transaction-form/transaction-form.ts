import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinanceService } from '../../services/finance'; // Import corrigé ici

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css'
})
export class TransactionFormComponent implements OnInit {
  transactionForm: FormGroup;
  categories: any[] = [];

  constructor(private fb: FormBuilder, private financeService: FinanceService) {
    this.transactionForm = this.fb.group({
      description: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.1)]],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      type: ['EXPENSE', Validators.required],
      category: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.financeService.getCategories().subscribe(data => this.categories = data);
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      this.financeService.addTransaction(this.transactionForm.value).subscribe({
        next: () => {
          alert('Transaction ajoutée !');
          window.location.reload(); 
        },
        error: (err) => console.error(err)
      });
    }
  }
}