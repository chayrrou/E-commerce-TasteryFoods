import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { SettingComponent } from './setting/setting.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { UsersComponent } from './users/users.component';
import { AuthPageAdminGuard } from '../auth-page-admin.guard';
import { FooterDashboardComponent } from './footer-dashboard/footer-dashboard.component';
import { CategoryMealsComponent } from './category-meals/category-meals.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path:'admin', component:DashboardComponent,
    canActivate: [AuthPageAdminGuard],
    children:[
      {path:'', redirectTo:'contact', pathMatch:'full'},
      {path:'sideBar', component:SideBarComponent},
      {path:'product', component:ProductComponent},
      {path:'categoryMeals', component:CategoryMealsComponent},
      {path:'setting', component: SettingComponent},
      {path:'users', component:UsersComponent },
      {path:'contact', component:ContactComponent},
      {path:'footerDashoard', component:FooterDashboardComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
