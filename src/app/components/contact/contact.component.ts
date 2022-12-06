import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/model/contact';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  lesContact !: Contact[];

  constructor(private fb : FormBuilder, private contactService : ContactService) { }

  ngOnInit(): void {
      this.contactForm = this.fb.nonNullable.group({
        firstName:['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z]+$')]],
        lastName: ['',[Validators.required, Validators.pattern('^[A-Z][a-zA-Z]+$')]],
        email: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}$')]],
        help : ['',Validators.required]
      })

      this.contactService.getContacts().subscribe(
        value => this.lesContact = value
      )
  }

  onSubmit(){
    this.contactService.addContacts(this.contactForm.value).subscribe(
      value => this.lesContact.push(value)
    )
    this.contactForm.reset();
  }
  public get firstName(){
    return this.contactForm.get('firstName');
  }
  public get lastName(){
    return this.contactForm.get('lastName');
  }
  public get email(){
    return this.contactForm.get('email');
  }
  public get help(){
    return this.contactForm.get('help');
  }

  
}
