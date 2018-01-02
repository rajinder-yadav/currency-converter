import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FxModule } from './fx-module/fx.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FxModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
