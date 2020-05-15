import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { PostService } from '../post.service';
import * as postActions from '../state/post.actions';
import { Post } from '../post.model';

@Injectable()
export class PostEffect {
  constructor(private actions$: Actions, private postService: PostService) { }

  @Effect()
  loadPosts$: Observable<Action> = this.actions$.pipe(
    ofType<postActions.LoadPosts>(
      postActions.PostActionTypes.LOAD_POSTS
    ),
    mergeMap((actions: postActions.LoadPosts) =>
      this.postService.getPosts().pipe(
        map(
          (posts: Post[]) =>
            new postActions.LoadPostsSuccess(posts)
        ),
        catchError(err => of(new postActions.LoadPostsFailure(err)))
      )
    )
  )
}
