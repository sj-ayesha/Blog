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
    mergeMap((action: postActions.LoadPosts) =>
      this.postService.getPosts().pipe(
        map(
          (posts: Post[]) =>
            new postActions.LoadPostsSuccess(posts)
        ),
        catchError(err => of(new postActions.LoadPostsFailure(err))
        )
      )
    )
  );

  // -------------LOAD POST EFFECT----------------//
  @Effect()
  loadPost$: Observable<Action> = this.actions$.pipe(
    ofType<postActions.LoadPost>(
      postActions.PostActionTypes.LOAD_POST
    ),
    mergeMap((action: postActions.LoadPost) =>
      this.postService.getPostById(action.payload).pipe(
        map(
          (post: Post) =>
            new postActions.LoadPostSuccess(post)
        ),
        catchError(err => of(new postActions.LoadPostFailure(err))
        )
      )
    )
  );

  // -------------ADD POST EFFECT----------------//
  @Effect()
  addPost$: Observable<Action> = this.actions$.pipe(
    ofType<postActions.AddPost>(
      postActions.PostActionTypes.ADD_POST
    ),
    map((action: postActions.AddPost) => action.payload),
    mergeMap((post: Post) =>
      this.postService.addPost(post).pipe(
        map(
          (newPost: Post) =>
            new postActions.AddPostSuccess(newPost)
        ),
        catchError(err => of(new postActions.AddPostFailure(err))
        )
      )
    )
  );
  // -------------UPDATE POST EFFECT----------------//
  @Effect()
  updatePost$: Observable<Action> = this.actions$.pipe(
    ofType<postActions.UpdatePost>(
      postActions.PostActionTypes.UPDATE_POST
    ),
    map((action: postActions.UpdatePost) => action.payload),
    mergeMap((post: Post) =>
      this.postService.updatePost(post).pipe(
        map(
          (updatePost: Post) =>
            new postActions.UpdatePostSuccess({
              id: updatePost.id,
              changes: updatePost
            })
        ),
        catchError(err => of(new postActions.UpdatePostFailure(err))
        )
      )
    )
  );

  // -------------DELETE POST EFFECT----------------//
  @Effect()
  deletePost$: Observable<Action> = this.actions$.pipe(
    ofType<postActions.DeletePost>(
      postActions.PostActionTypes.DELETE_POST
    ),
    map((action: postActions.DeletePost) => action.payload),
    mergeMap((id: number) =>
      this.postService.deletePost(id).pipe(
        map(() =>new postActions.DeletePostSuccess(id)
        ),
        catchError(err => of(new postActions.DeletePostFailure(err))
        )
      )
    )
  );
}
