import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DEFAULT_PREVIEW_IMAGE_URL} from '../../../constants/url';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {
    postForm: FormGroup;
    previewImageURL = DEFAULT_PREVIEW_IMAGE_URL;
    selectedImage = null;
    updatingPost: any;
    postDataSubscription: Subscription;

    constructor(
        private postService: PostService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.postForm = new FormGroup({
            title: new FormControl('', Validators.required),
            imageUrl: new FormControl(''),
            content: new FormControl('', Validators.required)
        });

        this.postDataSubscription = this.route.queryParams.subscribe(post => {
            if (Object.keys(post).length == 0) {
                this.updatingPost = null;
            } else {
                this.updatingPost = post;
                this.fillForm(this.updatingPost);
            }
        });
    }

    onImgChange(event: any) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e: any) => this.previewImageURL = e.target.result;
            reader.readAsDataURL(event.target.files[0]);
            this.selectedImage = event.target.files[0];
        } else {
            this.previewImageURL = DEFAULT_PREVIEW_IMAGE_URL;
            this.selectedImage = null;
        }
    }

    addNewPost(formData: FormData): void {
        this.postService.addNewPost(formData, this.selectedImage)
            .then(() => {
                this.router.navigate(['/']);
            })
            .catch(console.error);
    }

    editPost(formData: FormData) {
        this.postService.updatePost(
            this.updatingPost.postKey,
            formData,
            this.selectedImage,
            this.updatingPost.imageStorageName
        )
            .then(() => {
                this.router.navigate(['/']);
            })
            .catch(console.error);
    }

    private fillForm(post): void {
        this.postForm.get('title').setValue(post.title);
        this.previewImageURL = post.imageUrl;
        this.postForm.get('content').setValue(post.content);
    }

    ngOnDestroy() {
        this.postDataSubscription.unsubscribe();
    }
}