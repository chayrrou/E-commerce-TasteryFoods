import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm !: FormGroup;
  lesUsers !: User[];
  constructor(private fb : FormBuilder, private authentificationService:AuthentificationService) { }

  ngOnInit(): void {
    this.userForm = this.fb.nonNullable.group({
      email:['',[Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}$')]],
      password : ['',Validators.required],
      name :['',[Validators.required, Validators.pattern('^[A-Z][a-zA-Z]+$')]],
      role : ['']
    })
    this.authentificationService.getUsers().subscribe(
      value => this.lesUsers = value
    )
  }

}
