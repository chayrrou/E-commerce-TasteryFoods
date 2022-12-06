import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  tabs: string[] = ['id', 'name', 'email', 'password', 'role'];
  lesUsers !: User[];
  dataSource!: MatTableDataSource<any>;

  constructor(private authentificationService : AuthentificationService) { }

  ngOnInit(): void {
    this.authentificationService.getUsers().subscribe(
      (value) =>{ 
        this.lesUsers = value;
       this.dataSource = new MatTableDataSource(this.lesUsers);}
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
