import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit, AfterViewInit {

  users: any;
  dataSource!:MatTableDataSource<any>;
  data :any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'city',
    'state',
    'country',
    'email',
    'password',
    'phoneNumber',
    'status',
    'dob',
  ];
  constructor() { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.users = localStorage.getItem('user');
    this.data = this.users && JSON.parse(this.users);
    this.dataSource = new MatTableDataSource(this.data);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
