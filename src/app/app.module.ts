import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatTableModule} from '@angular/material/table'; 

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component'; 
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component'; 
import { ContactComponent } from './components/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { CardFoodComponent } from './components/card-food/card-food.component';
import { AdminModule } from './admin/admin.module';
import { BuyFoodComponent } from './components/buy-food/buy-food.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutUsComponent,
    FooterComponent,
    MenuComponent,
    LoginComponent,
    ContactComponent,
    SearchComponent,
    MenuCardComponent,
    CardFoodComponent,
    BuyFoodComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AdminModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    HttpClientModule
    
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
