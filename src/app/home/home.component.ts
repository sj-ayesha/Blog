import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as postActions from '../posts/state/post.actions';

import * as fromPost from '../posts/state/post.reducer';
import { Post } from '../posts/post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  posts: Post[];

  constructor(private store: Store<fromPost.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new postActions.LoadPosts);
    this.store.pipe(select(fromPost.getPosts)).subscribe(posts => {
      this.posts = posts;
      console.log('posts', posts.map(x => x.date));
    });

  }

  ngAfterViewInit(): void {
    this.rotateText()

  }

  rotateText() {
    const TxtRotate = function(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function() {
      const i = this.loopNum % this.toRotate.length;
      const fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = "<span class='wrap'>"+this.txt+"</span>";

      let that = this;
      let delta = 300 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(() => {
        that.tick();
      }, delta);
    };

    window.onload = () => {
      const elements = document.getElementsByClassName('txt-rotate');
      for (let i=0; i<elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-rotate');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
          return new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
      }
      // INJECT CSS
      const css = document.createElement('style');
      css.type = 'text/css';
      css.innerHTML = '.txt-rotate > .wrap { border-right: 0.08em solid #666 }';
      document.body.appendChild(css);
    };
  }

}
