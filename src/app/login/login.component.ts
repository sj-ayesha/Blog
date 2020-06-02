import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Store } from '@ngrx/store';

import { AppState } from '../store/app-state';
import { LogIn } from '../store/actions/auth.actions';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<AppState>) { }
  user: User = new User();

  ngOnInit(): void {
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new LogIn(payload));
  }

}
