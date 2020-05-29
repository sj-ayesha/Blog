import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as postActions from '../state/post.actions';
import * as fromPost from '../state/post.reducer';
import { Post } from '../post.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {

  postFormEdit: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<fromPost.AppState>, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.postFormEdit = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      id: null
    });

    const post$: Observable<Post> = this.store.select(
      fromPost.getCurrentPost
    );

    post$.subscribe(currentPost => {
      if (currentPost) {
        this.postFormEdit.patchValue({
          title: currentPost.title,
          description: currentPost.description,
          id: currentPost.id
        });
      }
    });
  }

  updatePost() {
    const updatedPost: Post = {
      title: this.postFormEdit.get('title').value,
      description: this.postFormEdit.get('description').value,
      id: this.postFormEdit.get('id').value
    };

    this.store.dispatch(new postActions.UpdatePost(updatedPost));
    this.activeModal.close('Close click');
  }

}
