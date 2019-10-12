import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  list: Employee[];
  constructor(private service: EmployeeService, private fireStore: AngularFirestore, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getEmployees().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()} as Employee;
      })
    });
  }

  onEdit(emp: Employee) {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: string) {
    if(confirm('Are you sure you would like to delete this record?')) {
      this.fireStore.doc('employees/' + id).delete();
      this.toastr.warning('Deleted Successfully', 'Emp. Register');
    }
  }

  //48:22 Angular 7 CRUD using Firestore - training

}
