import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/Shared/service/snack-bar.service';
import { Users } from 'src/app/Shared/model/User.model';
import { ConfirmValidators } from 'src/app/Shared/Custome Validators/confirm.validators';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  userForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    city: ['', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    dob: ['', Validators.required],
    status: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    confirmPassword: ['', [Validators.required]],
    password: ['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]]
  },
  {
    validator:ConfirmValidators('password','confirmPassword')
  });
  today = new Date();
  message = '';

  arraydata : Users[] = [];
  constructor( private formBuilder: FormBuilder, private snackBarService : SnackBarService, private router:Router) { }

  ngOnInit(): void {
    const data = localStorage.getItem('user');
    this.arraydata = data ?  JSON.parse(data) : this.arraydata;
  }

  formSubmit(){
    this.today = new Date(this.userForm.controls['dob'].value);
    let dd = String(this.today.getDate()).padStart(2, '0');
    let mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = this.today.getFullYear();
    this.userForm.value.dob = mm + '/' + dd + '/' + yyyy;
      let length = this.arraydata.length;
      this.userForm.removeControl('confirmPassword');
      this.arraydata.push(this.userForm.value);
        if (this.arraydata.length > length) {
          localStorage.setItem('user', JSON.stringify(this.arraydata));
          this.message = 'User Added Successfully...';
          this.router.navigate(['/']);
        } else {
          this.message = 'Something went wrong...';
        }
        this.snackBarService.showMessage(this.message);

  }

  get confirm(){
    return this.userForm.controls;
  }

}
