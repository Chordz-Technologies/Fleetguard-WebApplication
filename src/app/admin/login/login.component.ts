import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  hide = true;

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
  
  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const isLoginPage = event.url === '/login'; // Adjust the URL for your login page
        if (isLoginPage) {
          // Disable browser forward option
          history.pushState({}, '', location.href);
        }
      }
    });
  }

  login(event: Event) {
    event.preventDefault(); // Prevent default form submission

    this.authService.login(this.email, this.password)
      .subscribe({
        next: (result: any) => {
          if (result && result.jwt) {
            localStorage.setItem('jwt', result.jwt);
            this.router.navigate(['dashboard']);
            this.toastr.success('Login successful!', 'Success');
          } else {
            this.toastr.error('Login failed. Please check your credentials.', 'Error');
          }
        },
        error: (err: any) => {
          console.error('Error:', err);
          this.toastr.error('Invalid credentials. Please check your credentials.', 'Error');
        }
      });
  }
}
