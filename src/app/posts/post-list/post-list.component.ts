import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch({type: 'LOAD_POSTS'})
    this.store.subscribe(state => (this.posts = state.posts.posts));
  }

}
