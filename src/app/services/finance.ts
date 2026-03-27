import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }

  getStatsByCategory(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/transactions/dashboard`);
}
  addTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/transactions`, transaction);
  }
deleteTransaction(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/transactions/${id}`);
}
  getSummary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/transactions/dashboard/summary`);
  }
}