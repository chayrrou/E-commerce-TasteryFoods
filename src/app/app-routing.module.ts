import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CardFoodComponent } from './components/card-food/card-food.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { NotFound404Component } from './components/not-found404/not-found404.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home',title:'Home', component:HomeComponent},
  {path:'menu',title:'Menu', component:MenuComponent},
  {path:'aboutUs',title:'AboutUs', component:AboutUsComponent},
  {path:'contact',title:'Contact', component:ContactComponent},
  {path:'login', title:'Login',component:LoginComponent},
  {path:'menu/:id', title:'CardFood', component:CardFoodComponent},
  {path:'cartItem', title:'CartItem', component:CartItemComponent},
  {path:'**', title:'notFound404', component:NotFound404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
