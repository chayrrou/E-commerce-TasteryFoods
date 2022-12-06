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
    if (this.authentificationService.user) this.router.navigate(['home'])
    this.signinForm = this.fb.nonNullable.group({
      email:['',[Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}$')]],
      password : ['',Validators.required],
      name :['',[Validators.required, Validators.pattern('^[A-Z][a-zA-Z]+$')]],
      role : ['']
    })
    this.loginForm = this.fb.nonNullable.group({
      email:['',[Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}$')]],
      password : ['',[Validators.required,Validators.maxLength(8)]]
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
  public get emaillogin(){
    return this.loginForm.get('email');
  }
  public get passwordlogin(){
    return this.loginForm.get('password');
  }


  addUser(){
   this.authentificationService.addUsers(this.signinForm.value).subscribe(
      value => this.lesUsers.push(value)
   )
   this.authentificationService.user = this.signinForm.value;
   this.signinForm.reset();
   this.router.navigate(['home']);
  }

  loginUsers(){
    const { email, password } = this.loginForm.value;
    const [user] = this.lesUsers.filter((user) => user.email === email && user.password === password) // returns array of filtered users
    if (user) {
      this.authentificationService.user = user; // better not store all user because password can be stolen.
      if (user.role === "admin") {
        this.router.navigate(['admin'])
      } else {
        this.router.navigate(['home'])
      }
    }
    
    this.loginForm.reset();
  }

}
