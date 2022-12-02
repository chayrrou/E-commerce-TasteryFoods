import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm !: FormGroup;
  loginForm !: FormGroup;
  lesUsers !: User[];
  constructor(private fb : FormBuilder, private authentificationService:AuthentificationService, private router: Router) { }

  ngOnInit(): void {
    this.signinForm = this.fb.nonNullable.group({
      email:['',[Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}$')]],
      password : ['',Validators.required],
      name :['',[Validators.required, Validators.pattern('^[A-Z][a-zA-Z]+$')]],
      role : ['']
    })
    this.loginForm = this.fb.nonNullable.group({
      email:['',[Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}$')]],
      password : ['',Validators.required]
    })
    
    this.authentificationService.getUsers().subscribe(
      value => this.lesUsers = value
    )
  }

  public get email(){
    return this.signinForm.get('email');
  }

  public get name(){
    return this.signinForm.get('name');
  }

  public get password(){
    return this.signinForm.get('password');
  }

  addUser(){
   this.authentificationService.addUsers(this.signinForm.value).subscribe(
      value => this.lesUsers.push(value)
   )
   this.signinForm.reset();
  }

  loginUsers(){
    // alert("c'est bon");
    const { email, password } = this.loginForm.value;
    const user = this.lesUsers.filter((user) => user.email === email && user.password === password)

    if (user?.length && user[0].role === "admin" ) {
      this.router.navigate(['admin']);
    }
    
    this.loginForm.reset();
  }

}
