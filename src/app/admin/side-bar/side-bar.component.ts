import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthentificationService) { }

  ngOnInit(): void {
  }

  logout () {
    this.authenticationService.user = undefined;
    this.router.navigate(['login']);
  }
}
