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

  constructor(private fb: FormBuilder, private store: Store<fromPost.AppState>) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addPost() {
    const newPost: Post = {
      title: this.postForm.get('title').value,
      description: this.postForm.get('description').value
    };

    this.store.dispatch(new postActions.AddPost(newPost));

    this.postForm.reset();
  }

}
