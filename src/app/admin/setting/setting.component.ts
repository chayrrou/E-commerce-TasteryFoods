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
  hideCurrent: boolean = true;
  hideNew: boolean = true;
  hideConfirm: boolean = true;

  imagePreviewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;


  constructor(private fb : FormBuilder,private authentificationService : AuthentificationService) { }

  ngOnInit(): void {
    // const user = this.authentificationService.user

      const userId = localStorage.getItem('userId');
      console.log(userId)

    // if (this.user?.image) {
    //   this.imagePreviewUrl = this.user.image; // afficher image actuelle si existante
    // }
    // this.settingForm = this.fb.nonNullable.group({
    //   name:[user?.name, Validators.required],
    //   email: [user?.email, Validators.required],
    //   password : [user?.password, Validators.required],
    //   role: [user?.role],
    //   image: [this.user?.image || ''] 
    // })

    // const userData = localStorage.getItem('user');
    // if (userData) {
    //   this.user = JSON.parse(userData);
    // }


     if (userId) {
    this.authentificationService.getUserById(+userId).subscribe({
      next: (userData: User) => {
        this.user = userData;
        this.imagePreviewUrl = userData.image;

        this.settingForm = this.fb.nonNullable.group({
          name: [userData.name, Validators.required],
          email: [userData.email, Validators.required],
          password: [userData.password, Validators.required],
          role: [userData.role],
          image: [userData.image || '']
        });
      },
      error: (err) => {
        console.error('Erreur chargement utilisateur', err);
      }
    });
  } else {
    alert("Utilisateur non connecté !");
  }
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




  onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    // Ici tu pourrais uploader le fichier via un service, puis récupérer l'URL publique

    // Pour test, on simule juste un chemin local ou url
    const fakeUrl = `assets/uploads/${file.name}`; // par exemple

    this.imagePreviewUrl = fakeUrl; // afficher l'image via ce lien
    this.settingForm.patchValue({ image: fakeUrl }); // stocker l'url dans le formulaire
  } else {
    alert('Please select a valid image file.');
  }
}


onUpdate() {
  if (this.user && this.settingForm.valid) {
    this.authentificationService.updateUser(this.user.id, this.settingForm.value).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.imagePreviewUrl = updatedUser.image; // <= AJOUTÉ ICI !
        this.settingForm.patchValue({
          name: updatedUser.name,
          email: updatedUser.email,
          password: updatedUser.password,
          role: updatedUser.role,
          image: updatedUser.image
        });
        alert('Update successful!');
        localStorage.setItem('user', JSON.stringify(updatedUser));

      },
      error: (err) => {
        console.error(err);
        alert('Failed to update user info');
      }
    });
  }
}


}


