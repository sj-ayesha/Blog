import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as postActions from '../state/post.actions';

import * as fromPost from '../state/post.reducer';
import { Post } from '../post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts: Observable<Post[]>;
  error$: Observable<String>;

  constructor(private store: Store<fromPost.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new postActions.LoadPosts);
    this.posts = this.store.pipe(select(fromPost.getPosts));
    this.error$ = this.store.pipe(select(fromPost.getError));
  }

  deletePost(post: Post) {
    if (confirm('Are you sure you want to delete a post?')) {
      this.store.dispatch(new postActions.DeletePost(post.id));
    }
  }

  editPost(post: Post) {
    this.store.dispatch(new postActions.LoadPost(post.id));
  }

}
