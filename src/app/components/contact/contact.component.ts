import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from 'src/app/model/contact';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  lesContacts !: Contact[];
  contactForm !: FormGroup;

  constructor(private contactService : ContactService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.nonNullable.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      help : ['']
    })
    this.contactService.getContacts()
    .subscribe (value => this.lesContacts= value)
  }

}
