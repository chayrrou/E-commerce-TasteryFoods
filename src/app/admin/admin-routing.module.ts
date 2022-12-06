import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { SettingComponent } from './setting/setting.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { UsersComponent } from './users/users.component';
import { AuthPageAdminGuard } from '../auth-page-admin.guard';
import { FooterDashboardComponent } from './footer-dashboard/footer-dashboard.component';

const routes: Routes = [
  {path:'admin', component:DashboardComponent,
    canActivate: [AuthPageAdminGuard],
    children:[
      {path:'', redirectTo:'product', pathMatch:'full'},
      {path:'sideBar', component:SideBarComponent},
      {path:'product', component:ProductComponent},
      {path:'setting', component: SettingComponent},
      {path:'users', component:UsersComponent },
      {path:'footerDashoard', component:FooterDashboardComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
