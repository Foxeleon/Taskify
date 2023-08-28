import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { User } from '../../types';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  public users = [];
  public passwordMatch = false;
  public demoValue = '';
  public view = 'default';

  public registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(16)] ],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)] ],
    passwordRepeat: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)] ],
    firstName: ['', [Validators.required, Validators.maxLength(150)] ],
    lastName: ['', [Validators.required, Validators.maxLength(150)] ],
    email: ['', [Validators.required, Validators.email] ]
  });
  public loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(16)] ],
    password: ['', [Validators.required] ]
  });
  constructor(private fb: FormBuilder, public tdService: TodoService) { }

  ngOnInit() {
    this.tdService.getUsers()
    .subscribe(
      (value) => {
        this.tdService.allUsers = value;
        this.users = JSON.parse(localStorage.getItem('users'));
        if (this.users == null) {
          this.users = this.tdService.allUsers;
        }
      },
      (error) => {
        console.log(error);
        this.view = 'default';
      },
      () => console.log('code 101')
      );
  }

  registerUser() {
    this.tdService.user = {
      id: this.tdService.setUserId(),
      role: 'user',
      username: this.registerForm.value.username,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.lastName,
      password: this.registerForm.value.lastName,
      creationDate: this.tdService.currDay,
      lastLoginDate: null
    };
    this.users.unshift(this.tdService.user);
    this.tdService.updateUsers(this.users);
  }

  deleteUser() {
    // TODO
  }

  loginUser(users: User[], username: string) {
    for (const user of users) {
      if (user.username === username) {
        user.lastLoginDate = this.tdService.currDay;
      }
    }
  }

  resetRegisterForm() {
      this.registerForm.patchValue({
        username: '',
        password: '',
        passwordRepeat: '',
        firstName: '',
        lastName: '',
        email: ''
        });
  }

  onChanges(): void {
    this.registerForm.get('password').valueChanges.subscribe(val => {
      this.demoValue = `My Password is ${val}.`;
    });
  }

  passCheck(): void {
    if ( this.registerForm.value.password === this.registerForm.value.passwordRepeat ) {
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
    }
  }

}
