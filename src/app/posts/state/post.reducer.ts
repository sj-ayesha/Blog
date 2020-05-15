import * as postActions from './post.actions';
import { Post } from '../post.model';
import * as fromRoot from '../../state/app-state';

import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface PostState {
  posts: Post[];
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  posts: PostState;
}

export const initialState: PostState = {
  posts: [],
  loading: false,
  loaded: false,
  error: ''
};

export function postReducer(state = initialState, action: postActions.ActionPosts): PostState {
  switch (action.type) {
    case postActions.PostActionTypes.LOAD_POSTS:
      return {
        ...state,
        loading: true
      }

    case postActions.PostActionTypes.LOAD_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        posts: action.payload
      }

    case postActions.PostActionTypes.LOAD_POSTS_FAILURE:
      return {
        ...state,
        posts: [],
        loading: false,
        loaded: false,
        error: action.payload
      }

    default: {
      return state;
    }
  }
}

const getPostFeatureState = createFeatureSelector<PostState>(
  'posts'
);

export const getPosts = createSelector(
  getPostFeatureState,
  (state: PostState) => state.posts
);

export const getPostsLoading = createSelector(
  getPostFeatureState, (state: PostState) => state.loading
);

export const getPostsLoaded = createSelector(
  getPostFeatureState, (state: PostState) => state.loaded
);

export const getError = createSelector(
  getPostFeatureState, (state: PostState) => state.error
);

