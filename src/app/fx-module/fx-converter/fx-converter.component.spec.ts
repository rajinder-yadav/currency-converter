import { FxCalculatorService, FxError } from './../fx-calculator.service';
import { By } from '@angular/platform-browser';
import { FxConverterComponent } from './fx-converter.component';
import { TestBed, inject, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpHandler,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CAD, EUR, USD, FakeRatesHttpClient} from '../../../mocks/fake-rates-httpclient';
import { DebugElement } from '@angular/core';

describe('FxConverterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      providers: [
        FxCalculatorService,
        { provide: HttpClient, useClass: FakeRatesHttpClient }
      ],
      declarations: [
        FxConverterComponent
      ]
    }).compileComponents();
  }));

  let fixture: ComponentFixture<FxConverterComponent>;
  let comp: FxConverterComponent;
  let deSource: DebugElement;
  let deTarget: DebugElement;
  let elInputSource: HTMLInputElement;
  let elInputTarget: HTMLInputElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(FxConverterComponent);
    comp = fixture.componentInstance;
    deSource = fixture.debugElement.query(By.css('input[name=source_currency]'));
    deTarget = fixture.debugElement.query(By.css('input[name=target_currency]'));
    elInputSource = deSource.nativeElement;
    elInputTarget = deTarget.nativeElement;
  });

  // it('should be created', inject([FxCalculatorService], (service: FxCalculatorService) => {
  //   expect(comp).toBeTruthy();
  // }));

  it('should be created', () => {
    expect(comp).toBeTruthy();
  });

  it('source input should exist', () => {
    expect(elInputSource).toBeTruthy();
  });

  it('target input should exist', () => {
    expect(elInputTarget).toBeTruthy();
  });

  it('source default value should be 0.0', () => {
    expect(comp.source_currency).toBe('0.0');
  });

  it('target default value should be 0.0', () => {
    expect(comp.target_currency).toBe('0.0');
  });

  it('source default input field should be 0.0', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(deSource.nativeElement.value).toBe('0.0');
  }));

  it('target default input field should be 0.0', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(deTarget.nativeElement.value).toBe('0.0');
  }));

  it('input source field should be 1.23', fakeAsync(() => {
    comp.source_currency = '1.23';
    comp.source_base = 'CAD';
    comp.target_base = 'USD';
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(elInputSource.value).toBe('1.23');
  }));

  it('should display input error message', fakeAsync(() => {
    comp.source_currency = 'a';
    comp.source_base = 'USD';
    comp.target_base = 'CAD';
    elInputSource.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('div.error'));
    expect(el.nativeElement.innerText).toBe('Please enter a valid currency number.');
  }));

  it('should display input background with error red', fakeAsync(() => {
    comp.source_currency = 'a';
    deSource.triggerEventHandler('keyup', null);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(deSource.classes.input_error).toBeTruthy();
  }));

  it('should update target input field with 0.97', fakeAsync(() => {
    comp.source_currency = '1.23';
    comp.source_base = 'CAD';
    comp.target_base = 'USD';
    deSource.triggerEventHandler('keyup', null);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(elInputTarget.value).toBe('0.97');
  }));

  it('should update ngModel target_currency with 0.97', fakeAsync(() => {
    comp.source_currency = '1.23';
    comp.source_base = 'CAD';
    comp.target_base = 'USD';
    deSource.triggerEventHandler('keyup', null);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(comp.target_currency).toBe('0.97');
  }));

  it('should update target input field with 1.23', fakeAsync(() => {
    comp.source_currency = '0.97';
    comp.source_base = 'USD';
    comp.target_base = 'CAD';
    deSource.triggerEventHandler('keyup', null);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(elInputTarget.value).toBe('1.23');
  }));

  it('should update ngModel target_currency with 1.23', fakeAsync(() => {
    comp.source_currency = '0.97';
    comp.source_base = 'USD';
    comp.target_base = 'CAD';
    deSource.triggerEventHandler('keyup', null);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(comp.target_currency).toBe('1.23');
  }));

});
