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

    if (!emp_id || !name || !email || !password) {
      this.toastr.error('Please fill all the fields.', 'Error');
      return;
    }

    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(usersData)) {
      formData.append(key, value)
    }

    this.service.addUsers(formData).subscribe({
      next: (res: any) => {
        if (res.message) {
          this.toastr.success(res.message, 'Success');
          this.usersForm.reset();
        } else {
          console.log("Error", res.message);

          this.toastr.error(res.message, 'Error');
          // this.toastr.error(res.password, 'Error');
        }
      },
      error: (err: any) => {
        console.error('Error:', err);
        this.toastr.error(err.error.message || 'Server error. Please try again later.', 'Error');
      }
    });

    // this.service.addUsers(formData).subscribe((res) => {
    //   if (res === res.message) {
    //     this.toastr.success(res.message, 'Success');
    //   } else {
    //     this.toastr.error(res.message , 'Error');
    //     this.toastr.error(res.password, 'Error');
    //   }
    // });

    // this.usersForm.reset();
    // this.router.navigate(['/all-users']);

  }
}
