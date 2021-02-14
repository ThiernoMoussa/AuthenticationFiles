import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/model/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerform: FormGroup;
  errorMessage;
  successMessage;
  constructor(private fb: FormBuilder, private router: Router, private userService: UsersService) { }

  ngOnInit(): void
  {
    this.initRegisterForm();
  }
  initRegisterForm(): void
  {
    this.registerform = this.fb.group({
      sexe: this.fb.control('',[ Validators.required]),
      pseudo: this.fb.control('',[ Validators.required]),
      lastname: this.fb.control('',[ Validators.required]),
      firstname: this.fb.control('',[ Validators.required]),
      email: this.fb.control('',[ Validators.email]),
      password: this.fb.control('',[ Validators.minLength(6)]),
      dateBirth: this.fb.control('',[ Validators.required]),
      tel: this.fb.control('',[ Validators.required]),
      addresse: this.fb.control('',[ Validators.required]),

    });
  }

  onSubmit():void
  {
    const sexeUser = this.registerform.get('sexe').value;
    const pseudoUser = this.registerform.get('pseudo').value;
    const firstnameUser = this.registerform.get('firstname').value;
    const lastnameUser = this.registerform.get('lastname').value;
    const emailUser = this.registerform.get('email').value;
    const passwordUser = this.registerform.get('password').value;
    const dateBirthUser = this.registerform.get('datebirth').value;
    const telUser = this.registerform.get('tel').value;
    const addresseUser = this.registerform.get('addresse').value;
    const newUser: Users =
    {
      sexe: sexeUser,
      firstname: firstnameUser,
      lastname: lastnameUser,
      email: emailUser,
      password: passwordUser,
      dateBirth: dateBirthUser,
      pseudo: pseudoUser,
      tel: telUser,
      addresse: addresseUser

    };
    this.userService.createUser(newUser)
    .then((data)=>{
      this.errorMessage= null;
      this.successMessage=data;
      setTimeout(()=>{
      this.successMessage=null;
      this.router.navigate(['/individual']);
      },2000)

    })
    .catch((error)=>{
      this.errorMessage = error;
      setTimeout(()=>{
      this.errorMessage=null;
      },2000);
      console.log("error");
    })
  }

}
