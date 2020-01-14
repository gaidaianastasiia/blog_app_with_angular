import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {PostService} from '../../../services/post.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
    post: any;
    isAdmin: boolean;
    postDataSubscription: Subscription;
    isAdminSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private postService: PostService,
        private authService: AuthService,
        private storage: AngularFireStorage,
    ) {
    }

    ngOnInit() {
        this.postDataSubscription = this.route.queryParams.subscribe(post => this.post = post);

        this.isAdminSubscription = this.authService.isAdmin$.subscribe(isAdmin => {
            this.isAdmin = isAdmin;
        });

    }

    editPost(post): void {
        this.router.navigate(['./edit', ''],
            {
                queryParams: post
            }
        );
    }

    deletePost(name, postKey): void {
        this.postService.delatePost(name, postKey)
            .then(() => {
                this.router.navigate(['/']);
            });
    }

    ngOnDestroy() {
        this.postDataSubscription.unsubscribe();
        this.isAdminSubscription.unsubscribe();
    }
}
