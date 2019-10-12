import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeService, private fireStore: AngularFirestore, private toastr: ToastrService) { 
    this.service.formData = {
      id: null,
      fullName: '',
      empCode: '',
      position: '',
      mobile: '',
    }
  }


  ngOnInit() {
    this.resetForm;
  }

  resetForm(form?: NgForm) {
    if(form !== null) {
      this.service.formData.id = null,
      this.service.formData.fullName = '',
      this.service.formData.empCode = '',
      this.service.formData.position = '',
      this.service.formData.mobile = '',
      form.resetForm();
    }
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id === null ) 
    { this.fireStore.collection('employees').add(data); }
    else {
      this.fireStore.doc('employees/' + form.value.id).update(data);
      this.resetForm(form);
      this.toastr.success('submitted successfully', 'EMP Register');
    }
  }
}
