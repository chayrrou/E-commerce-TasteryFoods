import { Component } from '@angular/core';
import { Router, Event as NavigationEvent, NavigationEnd, ActivatedRoute } from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet_Alaimi_Chayrrou';
  currentRoute !: any;

  constructor(private router: Router){
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
  )
      .subscribe((event: NavigationEvent) => {
        this.currentRoute = event
      });

  
  }
}
