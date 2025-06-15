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
  // tabs: string[] = ['id', 'name', 'email', 'password', 'role'];
  displayedColumns: string[] = ['id', 'name', 'email', 'password', 'role'];

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

  changeRole(user: User, newRole: string): void {
  const updatedUser = { ...user, role: newRole };

  this.authentificationService.updateUser(user.id, updatedUser).subscribe({
    next: () => {
      user.role = newRole; // MàJ locale immédiate
      alert(`Role updated to ${newRole}`);
    },
    error: (err) => {
      console.error(err);
      alert('Failed to update role');
    }
  });
}


getRandomColor(name: string): string {
  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33A8',
    '#33FFF5', '#FFBD33', '#8C33FF', '#33FFBD', '#FF338C'
  ];
  const charCode = name.charCodeAt(0) + (name.length > 1 ? name.charCodeAt(1) : 0);
  return colors[charCode % colors.length];
}







}
