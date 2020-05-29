import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as postActions from '../state/post.actions';

import * as fromPost from '../state/post.reducer';
import { Post } from '../post.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { PostAddComponent } from '../post-add/post-add.component';
import { PostEditComponent } from '../post-edit/post-edit.component';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts: Observable<Post[]>;
  error$: Observable<String>;

  constructor(private store: Store<fromPost.AppState>, private router: Router,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.store.dispatch(new postActions.LoadPosts);
    this.posts = this.store.select(fromPost.getPosts);
    this.error$ = this.store.pipe(select(fromPost.getError));
  }

  deletePost(post: Post) {
    if (confirm('Are you sure you want to delete a post?')) {
      this.store.dispatch(new postActions.DeletePost(post.id));
    }
  }

  editPost(post: Post) {
    this.store.dispatch(new postActions.LoadPost(post.id));
    this.modalService.open(PostEditComponent);
  }

  btnClick() {
    this.router.navigateByUrl('/postadd');
  }

  openAddModal() {
    this.modalService.open(PostAddComponent);
  }
}
