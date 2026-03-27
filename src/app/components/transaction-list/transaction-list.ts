import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 1. OBLIGATOIRE POUR ngModel
import { FinanceService } from '../../services/finance';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // 2. ON AJOUTE FormsModule ICI
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css'
})
export class TransactionListComponent implements OnInit {
  // 3. DÉCLARATION DES VARIABLES (C'est ce qui manquait !)
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  categories: any[] = [];
  
  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(private financeService: FinanceService) {}

  ngOnInit() {
    this.loadData();
    // On charge les catégories pour le menu déroulant
    this.financeService.getCategories().subscribe(data => this.categories = data);
  }

  loadData() {
    this.financeService.getTransactions().subscribe(data => {
      this.transactions = data;
      this.filteredTransactions = data; // Au début, la liste filtrée est la liste complète
    });
  }

  // 4. LA MÉTHODE DE FILTRE
  applyFilters() {
    this.filteredTransactions = this.transactions.filter(t => {
      const matchSearch = t.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchCat = this.selectedCategory === '' || t.category?.name === this.selectedCategory;
      return matchSearch && matchCat;
    });
  }

  // 5. LA MÉTHODE DE SUPPRESSION
  onDelete(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette transaction ?')) {
      this.financeService.deleteTransaction(id).subscribe(() => {
        this.loadData(); // On rafraîchit la liste après suppression
      });
    }
  }
}