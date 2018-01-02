import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FxConverterComponent } from './fx-converter/fx-converter.component';
import { FxCalculatorService } from './fx-calculator.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    FxConverterComponent
  ],
  providers: [
    FxCalculatorService
  ],
  exports: [
    FxConverterComponent
  ]
})
export class FxModule { }
