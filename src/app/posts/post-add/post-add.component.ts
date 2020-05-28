import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, State, select } from '@ngrx/store';
import * as postActions from '../state/post.actions';
import * as fromPost from '../state/post.reducer';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {

  postForm: FormGroup;
  showAddModal: boolean = false;

  constructor(private fb: FormBuilder, private store: Store<fromPost.AppState>) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addPost() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const todayDate = new Date();
    const getDay = todayDate.getDate();
    const getMonths = monthNames[todayDate.getMonth()];
    const getYear = todayDate.getFullYear();

    const newPost: Post = {
      title: this.postForm.get('title').value,
      description: this.postForm.get('description').value,
      date: todayDate
    };

    this.store.dispatch(new postActions.AddPost(newPost));

    this.postForm.reset();
  }

}
