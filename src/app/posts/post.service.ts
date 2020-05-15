import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Post } from './post.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  getPostById(payload: number): Observable<Post> {
    return this.http.get<Post>(`${this.postsUrl}/${payload}`);
  }

  createCustomer(payload: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, payload);
  }

  updateCustomer(post: Post): Observable<Post> {
    return this.http.patch<Post>(
      `${this.postsUrl}/${post.id}`,
      post
    );
  }

  deleteCustomer(payload: number) {
    return this.http.delete(`${this.postsUrl}/${payload}`);
  }
}
