import { TestBed, inject, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FxCalculatorService, FxError } from './fx-module/fx-calculator.service';
import { FxConverterComponent } from './fx-module/fx-converter/fx-converter.component';
import { FakeRatesHttpClient} from '../mocks/fake-rates-httpclient';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AppComponent,
        FxConverterComponent
      ],
      providers: [
        FxCalculatorService,
        { provide: HttpClient, useClass: FakeRatesHttpClient }
      ]
    }).compileComponents();
  }));

  let fixture: ComponentFixture<AppComponent>;
  let comp: AppComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(comp).toBeTruthy();
  });

  it('should contain 3 FxConverterComponent components', () => {
    const children = fixture.debugElement.queryAll(By.directive(FxConverterComponent));
    expect(children.length).toBe(3);
  });

});
