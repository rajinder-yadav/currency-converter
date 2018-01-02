import { FxCalculatorService, FxError } from './../fx-calculator.service';
import { Component, OnInit } from '@angular/core';

/**
 * FX Conversion Component.
 * Accept User input, display converted currency in real-time.
 * Allow User to select base and target currencies.
*/
@Component({
  selector: 'fx-converter',
  templateUrl: './fx-converter.component.html',
  styleUrls: ['./fx-converter.component.scss']
})
export class FxConverterComponent implements OnInit {

  // Supported currency exchange
  readonly FX_BASES = [
    'CAD',
    'EUR',
    'USD'
  ];

  source_currency = '0.0';
  target_currency = '0.0';
  source_base = 'CAD';
  target_base = 'USD';
  error_message: string;
  input_error: string;
  disclaimer_message = '';

  constructor(private fx: FxCalculatorService) {}

  ngOnInit() {}

  /**
   * Update target currency value on key-press.
   */
  onKeyUp() {
    // Validate numeric values 0-9 and '.'
    if (/^\d*\.?\d*$|^\d*\.$/.test(this.source_currency.trim())) {
      this.input_error = '';
      this.updateTargetCurrency();
    } else {
      if (this.source_currency.length > 0) {
        this.input_error = 'Please enter a valid currency number.';
      }
    }
  }

  /**
   * Update target currency on currency selection change.
   */
  onSelect() {
    this.updateTargetCurrency();
  }

  /**
   * Convert input currency value to target currency value.
   */
  updateTargetCurrency() {
    const value: number | FxError = this.fx.convert(
      Number.parseFloat(this.source_currency),
      this.source_base,
      this.target_base
    );

    // Check if there was an error
    if (value instanceof Error) {
      this.error_message = value.message;
      this.target_currency = '0.0';
    } else {
      this.error_message = '';
      this.target_currency = String(value);
    }
  }

  /**
   * Toggle disclaimer info.
   */
  onDisclaimerClick() {
    if (this.disclaimer_message === '') {
      const rate = this.fx.convert(1, this.source_base, this.target_base);
      this.disclaimer_message = `1 ${this.source_base} = ${rate} ${this.target_base}`;
    } else {
      this.disclaimer_message = '';
    }
  }

  /**
   * Clear disclaimer info.
   */
  onDisclaimerExit() {
    this.disclaimer_message = '';
  }
}
