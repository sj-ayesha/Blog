import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostAddComponent } from './post-add/post-add.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostListComponent } from './post-list/post-list.component';
import { CarouselComponent } from '../components/carousel/carousel.component';

import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { postReducer } from "./state/post.reducer";

const postRoutes: Routes = [{path: '', component: PostComponent}];

@NgModule({
  declarations: [PostComponent, PostAddComponent, PostEditComponent, PostListComponent, CarouselComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(postRoutes),
    StoreModule.forFeature('posts', postReducer)
  ]
})
export class PostsModule { }
