import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  user: User = new User();

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.user);
  }

}
