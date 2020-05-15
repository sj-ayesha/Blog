import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as postActions from '../state/post.actions';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch(new postActions.LoadPosts());
    this.store.subscribe(state => (this.posts = state.posts.posts));
  }

}
