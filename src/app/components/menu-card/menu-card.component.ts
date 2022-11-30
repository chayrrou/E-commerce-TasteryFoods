import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/model/food';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})

export class MenuCardComponent implements OnInit {

  @Input() food!: Food;

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
