import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmloyeeComponent } from './add-emloyee/add-emloyee.component';
import { LoginComponent } from './login/login.component';
import { PopupConfirmComponentComponent } from './popup-confirm-component/popup-confirm-component.component';
import { SearchEmloyeeComponent } from './search-emloyee/search-emloyee.component';
import { UpdateEmloyeeComponent } from './update-emloyee/update-emloyee.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'add',component:AddEmloyeeComponent},
  {path:'update',component:UpdateEmloyeeComponent},
  {path:'search',component:SearchEmloyeeComponent},
  {path:'modal',component:PopupConfirmComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
