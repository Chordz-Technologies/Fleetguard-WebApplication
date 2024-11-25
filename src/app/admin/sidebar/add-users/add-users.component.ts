import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  usersForm!: FormGroup;

  constructor(private service: ServiceService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.usersForm = this.fb.group({
      empId: this.fb.control(''),
      name: this.fb.control(''),
      email: this.fb.control(''),
      password: this.fb.control(''),
    })
  }

  addUsers() {
    const usersData = {
      emp_id: this.usersForm.value.empId,
      name: this.usersForm.value.name,
      email: this.usersForm.value.email,
      password: this.usersForm.value.password
    };

    const { emp_id, name, email, password } = usersData;

    // Validation for empty fields
    if (!emp_id || !name || !email || !password) {
      this.toastr.error('Please fill all the fields.', 'Error');
      return;
    }

    // Alphanumeric validation
    const alphanumericRegex = /^[a-zA-Z0-9 ]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate empId first
    if (!alphanumericRegex.test(emp_id)) {
      this.toastr.error('Please enter a valid Employee ID. Eg. EMP 101', 'Error');
      return;
    }

    // Validate name next
    if (!alphanumericRegex.test(name)) {
      this.toastr.error('Please enter a valid Name. Eg. John or John123', 'Error');
      return;
    }

    // Validate email
    if (!emailRegex.test(email)) {
      this.toastr.error('Please enter a valid email address. Eg. john@gmail.com', 'Error');
      return;
    }

    // Create FormData
    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(usersData)) {
      formData.append(key, value);
    }

    // Call service to add user
    this.service.addUsers(formData).subscribe({
      next: (res: any) => {
        if (res.message) {
          this.toastr.success(res.message, 'Success');
          this.usersForm.reset();
        } else {
          this.toastr.error(res.message, 'Error');
        }
      },
      error: (err: any) => {
        console.error('Error:', err);
        this.toastr.error(err.error.message || 'Server error. Please try again later.', 'Error');
      }
    });
  }
}  
