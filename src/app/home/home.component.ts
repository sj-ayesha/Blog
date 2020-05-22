import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as postActions from '../posts/state/post.actions';

import * as fromPost from '../posts/state/post.reducer';
import { Post } from '../posts/post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Observable<Post[]>;

  constructor(private store: Store<fromPost.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new postActions.LoadPosts);
    this.posts = this.store.pipe(select(fromPost.getPosts));
  }

}
