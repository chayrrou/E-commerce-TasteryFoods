import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isConnected = this.authenticationService.user ? true : false;
  badge: number = 0;

  constructor(private authenticationService: AuthentificationService, private cartService: CartService, private router : Router) { }

  ngOnInit(): void {
     this.cartService.cartList$.subscribe(cart => {
      this.badge = cart.length;
    });
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout () {
    this.authenticationService.user = undefined;
    this.router.navigate(['login']);
  }
}
