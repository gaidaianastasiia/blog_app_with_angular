import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnDestroy {
    posts: any[];
    isAdmin: boolean;
    isAdminSubscription: Subscription;

    constructor(
        private authService: AuthService,
        private postService: PostService,
        private router: Router
    ) {}

    ngOnInit() {
        this.postService.getPosts().then(posts => {
            this.posts = posts.map(post => {
                let newPost = post.payload.doc.data();
                newPost.postKey = post.payload.doc.id;
                return newPost;
            });
        });

        this.isAdminSubscription = this.authService.isAdmin$.subscribe(isAdmin => {
            this.isAdmin = isAdmin;
        });
    }

    goToPost(post) {
        this.router.navigate(['./post', ''],
            {
                queryParams: post
            }
        );
    }

    signOut() {
        this.authService.signOut()
            .then(value => {
                this.router.navigate(['auth'])
            })
            .catch(err => {
                window.alert(err.message);
            })
    }

    ngOnDestroy(){
        this.isAdminSubscription.unsubscribe();
    }
}
