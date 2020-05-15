import { Action } from '@ngrx/store';

import { Post } from '../post.model';

export enum PostActionTypes {
  LOAD_POSTS = '[POST] Load Posts',
  LOAD_POSTS_SUCCESS = '[POST] Load Posts Success',
  LOAD_POSTS_FAILURE = '[POST] Load Posts Failure',
}

export class LoadPosts implements Action {
  readonly type = PostActionTypes.LOAD_POSTS;
}

export class LoadPostsSuccess implements Action {
  readonly type = PostActionTypes.LOAD_POSTS_SUCCESS;

  constructor(public payload: Post[]) {}
}
export class LoadPostsFailure implements Action {
  readonly type = PostActionTypes.LOAD_POSTS_FAILURE;

  constructor(public payload: string) {}
}

export type ActionPosts = LoadPosts | LoadPostsSuccess | LoadPostsFailure;
