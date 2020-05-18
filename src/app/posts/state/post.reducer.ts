import * as postActions from './post.actions';
import { Post } from '../post.model';
import * as fromRoot from '../../state/app-state';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface PostState extends EntityState<Post> {
  selectedPostId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const postAdapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export const defaultPost: PostState = {
  ids: [],
  entities: {},
  selectedPostId: null,
  loading: false,
  loaded: false,
  error: ''
};

export interface AppState extends fromRoot.AppState {
  posts: PostState;
}

export const initialState = postAdapter.getInitialState(defaultPost);

export function postReducer(state = initialState, action: postActions.ActionPosts): PostState {
  switch (action.type) {
    case postActions.PostActionTypes.LOAD_POSTS:
      return {
        ...state,
        loading: true
      }

    case postActions.PostActionTypes.LOAD_POSTS_SUCCESS:
      return postAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });

    case postActions.PostActionTypes.LOAD_POSTS_FAILURE:
      return {
        ...state,
        entities: {},
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
  postAdapter.getSelectors().selectAll
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

