import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Contact } from 'src/app/model/contact';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  allRequests: Contact[] = [];
  filteredRequests: Contact[] = [];
  pageSize = 10;
  currentPage = 0;
  dialog: any;
  
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.loadContactRequests();
  }

  loadContactRequests(): void {
    this.contactService.getContacts().subscribe(requests => {
      this.allRequests = requests;
      this.filteredRequests = [...this.allRequests];
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredRequests = this.allRequests.filter(request => 
      request.firstName.toLowerCase().includes(filterValue) ||
      request.lastName.toLowerCase().includes(filterValue) ||
      request.email.toLowerCase().includes(filterValue) ||
      request.help.toLowerCase().includes(filterValue)
    );
    this.currentPage = 0;
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paginatedRequests(): Contact[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.filteredRequests.slice(startIndex, startIndex + this.pageSize);
  }

 
  // 👉 Supprimer avec confirmation
  deleteRequest(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this request?');
    if (confirmDelete) {
      this.contactService.deleteContact(id).subscribe(() => {
        this.loadContactRequests();
      });
    }
  }




}
