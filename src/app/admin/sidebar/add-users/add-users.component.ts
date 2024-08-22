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
      name: this.fb.control(''),
      email: this.fb.control(''),
      password: this.fb.control(''),
    })
  }

  addUsers() {
    const usersData = {
      name: this.usersForm.value.name,
      email: this.usersForm.value.email,
      password: this.usersForm.value.password
    };

    const { name, email, password } = usersData;

    if (!name || !email || !password) {
      this.toastr.error('Please fill all the fields.', 'Error');
      return;
    }

    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(usersData)) {
      formData.append(key, value)
    }

    this.service.addUsers(formData).subscribe((res) => {
      if (res === res.message) {
        this.toastr.success(res.message, 'Success');
      } else {
        this.toastr.error(res.password, 'Error');
      }
    });

    // this.usersForm.reset();
    // this.router.navigate(['/all-users']);
    
  }
}
