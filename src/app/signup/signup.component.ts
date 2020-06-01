import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor() { }

  user: User = new User();

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.user);
  }

}
