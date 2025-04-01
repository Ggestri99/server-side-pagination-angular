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

  /** Observable para suscribirse a cambios de moneda */
  currency$;

  constructor(private storageService: StorageService) {
    const initialCurrency = this.getInitialCurrency();
    this.currencySubject = new BehaviorSubject<Currency>(initialCurrency);
    this.currency$ = this.currencySubject.asObservable();
  }

  /**
   * Obtiene la moneda inicial desde el almacenamiento o usa el valor por defecto.
   */
  private getInitialCurrency(): Currency {
    const storedCurrency = this.storageService.getItem<Currency>(this.STORAGE_KEY);
    return storedCurrency === 'USD' || storedCurrency === 'EUR' ? storedCurrency : this.DEFAULT_CURRENCY;
  }

  /**
   * Obtiene la moneda actual
   */
  get currentCurrency(): Currency {
    return this.currencySubject.value;
  }

  /**
   * Cambia la moneda y la almacena en localStorage
   * @param currency Nueva moneda (USD o EUR)
   */
  setCurrency(currency: Currency): void {
    if (this.currentCurrency !== currency) {
      this.currencySubject.next(currency);
      this.storageService.setItem(this.STORAGE_KEY, currency);
    }
  }

  /**
   * Convierte un monto según la moneda actual.
   * @param amount Monto en USD
   * @returns Monto convertido a EUR si la moneda es EUR, de lo contrario, devuelve el mismo monto.
   */
  convertAmount(amount: number): number {
    return this.currentCurrency === 'EUR' ? amount * this.EXCHANGE_RATE_USD_TO_EUR : amount;
  }

  /**
   * Devuelve el símbolo de la moneda actual.
   */
  getCurrencySymbol(): string {
    return this.currentCurrency === 'USD' ? '$' : '€';
  }
}
