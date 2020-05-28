import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostAddComponent } from './post-add/post-add.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostListComponent } from './post-list/post-list.component';
import { CarouselComponent } from '../components/carousel/carousel.component';

import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { postReducer } from './state/post.reducer';
import { PostEffect } from './state/post.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../components/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const postRoutes: Routes = [{
  path: '', component: PostComponent, children: [{
    path: '/postadd', component: PostAddComponent
  }]
}];

@NgModule({
  declarations: [PostComponent, PostAddComponent, PostEditComponent, PostListComponent, CarouselComponent, ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(postRoutes),
    StoreModule.forFeature('posts', postReducer),
    EffectsModule.forFeature([PostEffect])
  ]
})
export class PostsModule { }
