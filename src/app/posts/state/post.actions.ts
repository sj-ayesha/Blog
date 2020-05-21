import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Post } from '../post.model';

export enum PostActionTypes {
  LOAD_POSTS = '[POST] Load Posts',
  LOAD_POSTS_SUCCESS = '[POST] Load Posts Success',
  LOAD_POSTS_FAILURE = '[POST] Load Posts Failure',

  LOAD_POST = '[POST] Load Post',
  LOAD_POST_SUCCESS = '[POST] Load Post Success',
  LOAD_POST_FAILURE = '[POST] Load Post Failure',

  ADD_POST = '[POST] Add Post',
  ADD_POST_SUCCESS = '[POST] Add Post Success',
  ADD_POST_FAILURE = '[POST] Add Post Failure',

  UPDATE_POST = '[POST] Update Post',
  UPDATE_POST_SUCCESS = '[POST] Update Post Success',
  UPDATE_POST_FAILURE = '[POST] Update Post Failure',

  DELETE_POST = '[POST] Delete Post',
  DELETE_POST_SUCCESS = '[POST] Delete Post Success',
  DELETE_POST_FAILURE = '[POST] Delete Post Failure',
}

// -----------LOAD POSTS ACTIONS-----------------//
export class LoadPosts implements Action {
  readonly type = PostActionTypes.LOAD_POSTS;
}

export class LoadPostsSuccess implements Action {
  readonly type = PostActionTypes.LOAD_POSTS_SUCCESS;

  constructor(public payload: Post[]) { }
}
export class LoadPostsFailure implements Action {
  readonly type = PostActionTypes.LOAD_POSTS_FAILURE;

  constructor(public payload: string) { }
}

// -----------LOAD POST ACTIONS-----------------//
export class LoadPost implements Action {
  readonly type = PostActionTypes.LOAD_POST;

  constructor(public payload: number) { }
}

export class LoadPostSuccess implements Action {
  readonly type = PostActionTypes.LOAD_POST_SUCCESS;

  constructor(public payload: Post) { }
}
export class LoadPostFailure implements Action {
  readonly type = PostActionTypes.LOAD_POST_FAILURE;

  constructor(public payload: string) { }
}

// -----------ADD POST ACTIONS-----------------//
export class AddPost implements Action {
  readonly type = PostActionTypes.ADD_POST;

  constructor(public payload: Post) { }
}

export class AddPostSuccess implements Action {
  readonly type = PostActionTypes.ADD_POST_SUCCESS;

  constructor(public payload: Post) { }
}

export class AddPostFailure implements Action {
  readonly type = PostActionTypes.ADD_POST_FAILURE;

  constructor(public payload: string) { }
}

// -----------UPDATE POST ACTIONS-----------------//
export class UpdatePost implements Action {
  readonly type = PostActionTypes.UPDATE_POST;

  constructor(public payload: Post) { }
}

export class UpdatePostSuccess implements Action {
  readonly type = PostActionTypes.UPDATE_POST_SUCCESS;

  constructor(public payload: Update<Post>) { }
}
export class UpdatePostFailure implements Action {
  readonly type = PostActionTypes.UPDATE_POST_FAILURE;

  constructor(public payload: string) { }
}

// -----------DELETE POST ACTIONS-----------------//
export class DeletePost implements Action {
  readonly type = PostActionTypes.DELETE_POST;

  constructor(public payload: number) { }
}

export class DeletePostSuccess implements Action {
  readonly type = PostActionTypes.DELETE_POST_SUCCESS;

  constructor(public payload: number) { }
}
export class DeletePostFailure implements Action {
  readonly type = PostActionTypes.DELETE_POST_FAILURE;

  constructor(public payload: string) { }
}

export type ActionPosts = LoadPosts | LoadPostsSuccess | LoadPostsFailure |
  LoadPost | LoadPostSuccess | LoadPostFailure |
  AddPost | AddPostSuccess | AddPostFailure |
  UpdatePost | UpdatePostSuccess | UpdatePostFailure |
  DeletePost | DeletePostSuccess | DeletePostFailure;
