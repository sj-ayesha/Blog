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

export interface AppState extends fromRoot.AppState {
  post: PostState;
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



export const initialState = postAdapter.getInitialState(defaultPost);

export function postReducer(state = initialState, action: postActions.ActionPosts): PostState {
  switch (action.type) {
    // -------LOAD POSTS REDUCER---------//
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
      };

    // -------LOAD POST REDUCER---------//
    case postActions.PostActionTypes.LOAD_POST_SUCCESS:
      return postAdapter.addOne(action.payload, {
        ...state,
        selectedPostId: action.payload.id
      });

    case postActions.PostActionTypes.LOAD_POST_FAILURE:
      return {
        ...state,
        error: action.payload
      };

    // -------ADD POST REDUCER---------//
    case postActions.PostActionTypes.ADD_POST_SUCCESS:
      return postAdapter.addOne(action.payload, state);

    case postActions.PostActionTypes.ADD_POST_FAILURE:
      return {
        ...state,
        error: action.payload
      };

    // -------UPDATE POST REDUCER---------//
    case postActions.PostActionTypes.UPDATE_POST_SUCCESS:
      return postAdapter.updateOne(action.payload, state);

    case postActions.PostActionTypes.UPDATE_POST_FAILURE:
      return {
        ...state,
        error: action.payload
      };

    // -------REMOVE POST REDUCER---------//
    case postActions.PostActionTypes.DELETE_POST_SUCCESS:
      return postAdapter.removeOne(action.payload, state);

    case postActions.PostActionTypes.DELETE_POST_FAILURE:
      return {
        ...state,
        error: action.payload
      };



    default: {
      return state;
    }
  }
}

const getPostFeatureState = createFeatureSelector<PostState>(
  'post'
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

// Selectors to add the selected post in the edit component
export const getCurrentPostId = createSelector(
  getPostFeatureState,
  (state: PostState) => state.selectedPostId
);

export const getCurrentPost = createSelector(
  getPostFeatureState,
  getCurrentPostId,
  state => state.entities[state.selectedPostId]
);

