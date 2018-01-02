import { Observable } from 'rxjs/Observable';
import { TestBed, inject } from '@angular/core/testing';
import {
  HttpHandler,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';

import { FxCalculatorService } from './fx-calculator.service';
import { CAD, EUR, USD, FakeRatesHttpClient} from '../../mocks/fake-rates-httpclient';

describe('FxCalculatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FxCalculatorService,
        { provide: HttpClient, useClass: FakeRatesHttpClient }
      ]
    });
  });

  it('should be created', inject([FxCalculatorService], (service: FxCalculatorService) => {
    expect(service).toBeTruthy();
  }));

  // CAD
  it('1.23 CAD = 1.23 CAD', inject([FxCalculatorService], (service: FxCalculatorService) => {
    const v = service.convert(1.23, 'CAD', 'CAD');
    expect(v).toBe(1.23);
  }));

  it('1.23 CAD = 0.82 EUR', inject([FxCalculatorService], (service: FxCalculatorService) => {
    const v = service.convert(1.23, 'CAD', 'EUR');
    expect(v).toBe(0.82);
  }));

  it('1.23 CAD = 0.97 USD', inject([FxCalculatorService], (service: FxCalculatorService) => {
    const v = service.convert(1.23, 'CAD', 'USD');
    expect(v).toBe(0.97);
  }));

  it('0.82 EUR = 1.23 CAD', inject([FxCalculatorService], (service: FxCalculatorService) => {
    const v = service.convert(0.82, 'EUR', 'CAD');
    expect(v).toBe(1.23);
  }));

  it('0.97 USD = 1.23 CAD', inject([FxCalculatorService], (service: FxCalculatorService) => {
    const v = service.convert(0.97, 'USD', 'CAD');
    expect(v).toBe(1.23);
  }));

  // EUR
  it('1.23 EUR = 1.23 EUR', inject([FxCalculatorService], (service: FxCalculatorService) => {
    const v = service.convert(1.23, 'EUR', 'EUR');
    expect(v).toBe(1.23);
  }));

  it('1.23 EUR = 1.85 CAD', inject([FxCalculatorService], (service: FxCalculatorService) => {
    const v = service.convert(1.23, 'EUR', 'CAD');
    expect(v).toBe(1.85);
  }));

  it('1.23 EUR = 1.46 USD', inject([FxCalculatorService], (service: FxCalculatorService) => {
    const v = service.convert(1.23, 'EUR', 'USD');
    expect(v).toBe(1.46);
  }));

  it('1.85 CAD = 1.23 EUR', inject([FxCalculatorService], (service: FxCalculatorService) => {
    const v = service.convert(1.85, 'CAD', 'EUR');
    expect(v).toBe(1.23);
  }));

  it('1.46 USD = 1.23 EUR', inject([FxCalculatorService], (service: FxCalculatorService) => {
    const v = service.convert(1.46, 'USD', 'EUR');
    expect(v).toBe(1.23);
  }));

  // USD
  it('1.23 USD = 1.23 USD', inject([FxCalculatorService], (service: FxCalculatorService) => {
    const v = service.convert(1.23, 'USD', 'USD');
    expect(v).toBe(1.23);
  }));

  it('1.23 USD = 1.56 CAD', inject([FxCalculatorService], (service: FxCalculatorService) => {
    const v = service.convert(1.23, 'USD', 'CAD');
    expect(v).toBe(1.56);
  }));

  it('1.23 USD = 1.04 EUR', inject([FxCalculatorService], (service: FxCalculatorService) => {
    const v = service.convert(1.23, 'USD', 'EUR');
    expect(v).toBe(1.04);
  }));

  it('1.56 CAD = 1.23 USD', inject([FxCalculatorService], (service: FxCalculatorService) => {
    const v = service.convert(1.56, 'CAD', 'USD');
    expect(v).toBe(1.23);
  }));

  it('1.04 EUR = 1.23 USD', inject([FxCalculatorService], (service: FxCalculatorService) => {
    const v = service.convert(1.04, 'EUR', 'USD');
    expect(v).toBe(1.23);
  }));

});
