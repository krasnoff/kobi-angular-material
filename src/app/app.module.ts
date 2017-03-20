import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import {FlexLayoutModule} from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    ReactiveFormsModule,
    FlexLayoutModule.forRoot(),
    JsonpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDVugjLJqZ4Hrtl2xrFQfw6O10T3VgY-s0'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
