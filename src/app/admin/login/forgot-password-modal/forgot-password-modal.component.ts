import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss']
})
export class ForgotPasswordModalComponent implements OnInit {
  email: string = '';
  otp: string = '';
  new_password: string = '';
  otpRequested = false;
  otpValidated = false;
  minutes: number = 2;
  seconds: number = 0;
  hidePassword = true;
  private timer: any;

  constructor(
    private dialogRef: MatDialogRef<ForgotPasswordModalComponent>,
    private toastr: ToastrService,
    private service: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    if (this.otpValidated) {
      // Change password logic
      this.changePassword();
    } else if (this.otpRequested) {
      // Validate OTP logic
      this.validateOtp();
    } else {
      // Request OTP logic
      this.requestOtp();
    }
  }

  requestOtp() {
    this.otpRequested = true;
    this.startTimer();
    // Implement OTP request logic here
    this.toastr.success('OTP sent to your email!', 'Success');
  }

  validateOtp() {
    // Implement OTP validation logic here
    if (this.otp === '123456') { // Replace with actual validation logic
      this.otpValidated = true;
      clearInterval(this.timer);
      this.toastr.success('OTP validated successfully!', 'Success');
    } else {
      this.toastr.error('Invalid OTP. Please try again.', 'Error');
    }
  }

  changePassword() {
    const data = {
      email: this.email,
      new_password: this.new_password
    };

    this.service.changePassword(data).subscribe({
      next: (response: any) => {
        if (response.message) {
          this.toastr.success(response.message, 'Success');
          this.dialogRef.close();
        } else {
          this.toastr.error(response.message, 'Error');
        }
      },
      error: (err: any) => {
        this.toastr.error(err.error.message, 'Error');
      }
    });
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes > 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          clearInterval(this.timer);
          this.toastr.error('OTP expired. Please request a new one.', 'Error');
          this.dialogRef.close();
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onClose() {
    clearInterval(this.timer);
    this.dialogRef.close();
  }
}
