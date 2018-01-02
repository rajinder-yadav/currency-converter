import { Observable } from 'rxjs/Observable';

// CAD FX Conversion rates
export const CAD = {
  base: 'CAD',
  rates: {
    USD: 0.78721,
    EUR: 0.66414
  }
};

// EUR FX Conversion rates
export const EUR = {
  base: 'EUR',
  rates: {
    CAD: 1.5057,
    USD: 1.1853,
    ZAR: 15.059
  }
};

// USD FX Conversion rates
export const USD = {
  base: 'USD',
  rates: {
    CAD: 1.2703,
    EUR: 0.84367
  }
};

/**
 * Make fake HTTP request to FX rates service.
 * @param url - HTTP URL to FX rate service.
 * @return - Observable rates data JSON format.
*/
export class FakeRatesHttpClient {
  get(url: string): Observable<any> {
    if (/CAD/.test(url)) {
      return Observable.create(o => {
        o.next(CAD);
        o.complete();
      });
    }
    if (/EUR/.test(url)) {
      return Observable.create(o => {
        o.next(EUR);
        o.complete();
      });
    }
    if (/USD/.test(url)) {
      return Observable.create(o => {
        o.next(USD);
        o.complete();
      });
    }
  }
}
