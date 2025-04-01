import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

export type Currency = 'USD' | 'EUR';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly STORAGE_KEY = 'selectedCurrency';
  private readonly EXCHANGE_RATE_USD_TO_EUR = 1.08;
  private readonly DEFAULT_CURRENCY: Currency = 'USD';

  private currencySubject: BehaviorSubject<Currency>;

  currency$;

  constructor(private storageService: StorageService) {
    const initialCurrency = this.getInitialCurrency();
    this.currencySubject = new BehaviorSubject<Currency>(initialCurrency);
    this.currency$ = this.currencySubject.asObservable();
  }

  private getInitialCurrency(): Currency {
    const storedCurrency = this.storageService.getItem<Currency>(this.STORAGE_KEY);
    return storedCurrency === 'USD' || storedCurrency === 'EUR' ? storedCurrency : this.DEFAULT_CURRENCY;
  }

  get currentCurrency(): Currency {
    return this.currencySubject.value;
  }

  setCurrency(currency: Currency): void {
    if (this.currentCurrency !== currency) {
      this.currencySubject.next(currency);
      this.storageService.setItem(this.STORAGE_KEY, currency);
    }
  }


  getCurrencySymbol(): string {
    return this.currentCurrency === 'USD' ? '$' : '€';
  }

  convertAmount(amount: number): number {
    if (this.currentCurrency === 'USD') {
      return amount;
    } else if (this.currentCurrency === 'EUR') {
      return Math.round((amount * 1.1) * 100) / 100;
    }
    return amount;
  }

  convertToUSD(amount: number): number {
    if (this.currentCurrency === 'USD') {
      return amount;
    } else if (this.currentCurrency === 'EUR') {
      return Math.round((amount / 1.1) * 100) / 100;
    }
    return amount;
  }
}
