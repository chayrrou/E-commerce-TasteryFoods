import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BuyFoodComponent } from './components/buy-food/buy-food.component';
import { CardFoodComponent } from './components/card-food/card-food.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {path:'',title:'Home', component:HomeComponent},
  {path:'home',title:'Home', component:HomeComponent},
  {path:'menu',title:'Menu', component:MenuComponent},
  {path:'aboutUs',title:'AboutUs', component:AboutUsComponent},
  {path:'contact',title:'Contact', component:ContactComponent},
  {path:'login', title:'Login',component:LoginComponent},
  {path:'menu/:id', title:'CardFood', component:CardFoodComponent},
  {path:'buyFood', title:'buyFood', component:BuyFoodComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
