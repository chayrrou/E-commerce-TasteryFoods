import { Component } from '@angular/core';
import { Router, Event as NavigationEvent, NavigationEnd, ActivatedRoute } from '@angular/router';
import {filter} from 'rxjs/operators';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet_Alaimi_Chayrrou';
 constructor(){}
}
