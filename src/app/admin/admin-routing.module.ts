import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { CommandComponent } from './command/command.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { SideBarComponent } from './side-bar/side-bar.component';

const routes: Routes = [
  {path:'admin', component:DashboardComponent,
    children:[
      {path:'', redirectTo:'product', pathMatch:'full'},
      {path:'sideBar', component:SideBarComponent},
      {path:'product', component:ProductComponent},
      {path:'command', component:CommandComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
