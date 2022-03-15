import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddEmloyeeComponent } from './add-emloyee/add-emloyee.component';
import { UpdateEmloyeeComponent } from './update-emloyee/update-emloyee.component';
import { SearchEmloyeeComponent } from './search-emloyee/search-emloyee.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddEmloyeeComponent,
    UpdateEmloyeeComponent,
    SearchEmloyeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
