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
 
  // lesUsers !: User[];
  settingForm!: FormGroup;
  hide: boolean = true;
  user: User | undefined = this.authentificationService.user
  constructor(private fb : FormBuilder,private authentificationService : AuthentificationService) { }

  ngOnInit(): void {
    const user = this.authentificationService.user
    this.settingForm = this.fb.nonNullable.group({
      name:[user?.name, Validators.required],
      email: [user?.email, Validators.required],
      password : [user?.password, Validators.required],
      role: [user?.role]
    })

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

  onUpdate() {
    if(this.user) {
      this.authentificationService.updateUser(this.user.id, this.settingForm.value).subscribe(value => {
        alert("update is Successful!");
      })
      
    }
  }
 

 
}


