import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { DisplayErrorComponent } from './demo/display-error/index.component';
import { ValidationMessagesService } from './ngx-validation-messagex'

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    DisplayErrorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [ValidationMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
