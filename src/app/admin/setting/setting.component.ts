import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
 
  lesUsers !: User[];
  settingForm!: FormGroup;
  hide: boolean = true;
  constructor(private fb : FormBuilder,private authentificationService : AuthentificationService) { }

  ngOnInit(): void {

    this.settingForm = this.fb.nonNullable.group({
      name:['',Validators.required],
      email: ['',Validators.required],
      password : ['',Validators.required],
      role: ['']
    })

    this.authentificationService.getUsers().subscribe(
      (value) =>{ 
        this.lesUsers = value;
      }
    )
  }


  public get name(){
    return this.settingForm.get('name');
  }
  public get email(){
    return this.settingForm.get('email');
  }
  public get password(){
    return this.settingForm.get('password');
  }

  onUpdate(){
    this.authentificationService.updateUser(this.settingForm.value).subscribe(
      value => { 
      })

  }
 

 
}


