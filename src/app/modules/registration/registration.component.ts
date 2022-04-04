import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'ngx-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  regi: FormGroup;
  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.regi = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(1),Validators.maxLength(20)]],
      // eslint-disable-next-line max-len
      password: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(16),Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
      name: ['', [Validators.required, Validators.minLength(1),Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      // eslint-disable-next-line max-len
      phoneNumber: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  public addUser(){

    this.authService.addUser(this.regi.value).subscribe(
      (data: any) => {
        alert('Add thành công');
        alert(data.message);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }


  onSubmit() {
    this.addUser();
  }
}