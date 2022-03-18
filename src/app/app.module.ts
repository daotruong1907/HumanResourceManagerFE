import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import{HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddEmloyeeComponent } from './add-emloyee/add-emloyee.component';
import { UpdateEmloyeeComponent } from './update-emloyee/update-emloyee.component';
import { SearchEmloyeeComponent } from './search-emloyee/search-emloyee.component';
import { HeaderPageComponent } from './header-page/header-page.component';
import { PopupConfirmComponentComponent } from './popup-confirm-component/popup-confirm-component.component';
import { CommonService } from './data/Service/common.service';

@NgModule({
  declarations: [	
    AppComponent,
    LoginComponent,
    AddEmloyeeComponent,
    UpdateEmloyeeComponent,
    SearchEmloyeeComponent,
    HeaderPageComponent,
    PopupConfirmComponentComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
