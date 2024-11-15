import { Transaction, Appointment } from '../types';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { FirebaseService } from './api/firebase';

export const ReportService = {
  async getMonthlyReport(date: Date) {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    
    const appointments = await FirebaseService.getAppointments({
      startDate: start,
      endDate: end
    });

    const transactions = await FirebaseService.getTransactions({
      startDate: start,
      endDate: end
    });

    return {
      totalAppointments: appointments.length,
      revenue: this.calculateRevenue(transactions),
      expenses: this.calculateExpenses(transactions),
      profit: this.calculateProfit(transactions)
    };
  },

  calculateRevenue(transactions: Transaction[]) {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);
  },

  calculateExpenses(transactions: Transaction[]) {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);
  },

  calculateProfit(transactions: Transaction[]) {
    return this.calculateRevenue(transactions) - this.calculateExpenses(transactions);
  }
}; 