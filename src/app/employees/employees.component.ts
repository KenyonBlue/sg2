import { EmployeeService } from './../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  list: Employee[];
  constructor(private service: EmployeeService) { }

  ngOnInit() {
    this.service.getEmployees().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()} as Employee;
      })
    });
  }

}
