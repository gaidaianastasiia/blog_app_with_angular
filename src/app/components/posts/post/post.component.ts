import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
    post: any;
    postDataSubscription: Subscription;
    isAdmin: boolean;
    isAdminSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private postService: PostService,
        private authService: AuthService,
    ) {}

    ngOnInit() {
        this.postDataSubscription = this.route.queryParams.subscribe(post => this.post = post);
        this.isAdminSubscription = this.authService.isAdmin$.subscribe(isAdmin => this.isAdmin = isAdmin);
    }

    onEditBtnClick(post): void {
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
