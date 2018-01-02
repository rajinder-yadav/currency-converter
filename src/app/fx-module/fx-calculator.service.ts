import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import 'rxjs/add/operator/retry';

export class FxError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

/**
 * FX Service to convert currency.
*/
@Injectable()
export class FxCalculatorService {
  base_rates: any = {};
  error_message = '';

  constructor(private http: HttpClient) {
    // Fetch currency conversion values from Fixer
    this.fetchConversions('CAD');
    this.fetchConversions('EUR');
    this.fetchConversions('USD');
  }

  /**
   * Fetch currency rate for given base currency.
   * @param base - string: Base currency.
   */
  fetchConversions(base: string) {
    // Fetch currency conversion values from Fixer
    this.http.get(`https://api.fixer.io/latest?base=${base}`)
      .retry(3)
      .subscribe( (data: any) => {
          this.base_rates[base] = data.rates;
          this.error_message = '';
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // Client-side or network error!
            this.error_message = 'A Network error occured, try again later.';
          } else {
            // Server request was unsuccessful
            this.error_message = 'Unable to get FX rates, try again later.';
          }
        });
  }

  /**
   * Convert Source currency to Target currency.
   * Supported currency base: CAD, USD, EUR.
   * @param currency - number: Decimal value of currency.
   * @param source - string: Input Currency base { CAD, USD, EUR }
   * @param target - string: Currency base to convert to { CAD, USD, EUR }
   * @return - number: Converted currency.
   */
  convert(currency: number, source: string, target: string): number | FxError {
    // There was an error fetching rates from FX service.
    if (this.error_message.length > 0) {
      return new FxError(this.error_message);
    }
    // Check for empty input.
    if (isNaN(currency)) {
      return 0;
    }

    switch (source) {
      case 'CAD':
        switch (target) {
          case 'CAD':
            return currency;
          case 'EUR':
            return Math.round(currency * 100 * this.base_rates['CAD'].EUR) / 100;
          case 'USD':
            return Math.round(currency * 100 * this.base_rates['CAD'].USD) / 100;
        }
        break;

      case 'EUR':
        switch (target) {
          case 'CAD':
            return Math.round(currency * 100 * this.base_rates['EUR'].CAD) / 100;
          case 'EUR':
            return currency;
          case 'USD':
            return Math.round(currency * 100 * this.base_rates['EUR'].USD) / 100;
        }
        break;

      case 'USD':
        switch (target) {
          case 'CAD':
            return Math.round(currency * 100 * this.base_rates['USD'].CAD) / 100;
          case 'EUR':
            return Math.round(currency * 100 * this.base_rates['USD'].EUR) / 100;
          case 'USD':
            return currency;
        }
        break;
    }
  }
}
