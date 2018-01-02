import { FxCalculatorService } from './fx-module/fx-calculator.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs/Subscription';

/**
 * Main Application Component.
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  timer_sub: Subscription;

  constructor(private fxService: FxCalculatorService) {
  }

  /**
   * Kick off timer to fetch latest rates from FX service.
   */
  ngOnInit() {
    // Start timer stream to refresh currency rate every minute.
    this.timer_sub = TimerObservable.create(60000, 60000)
      .subscribe(() => {
        this.fxService.fetchConversions('CAD');
        this.fxService.fetchConversions('EUR');
        this.fxService.fetchConversions('USD');
      });
  }

  /**
   * Perform resource cleanup.
   */
  ngOnDestroy() {
    // Release timer resource, prevent memory leak.
    this.timer_sub.unsubscribe();
  }
}
