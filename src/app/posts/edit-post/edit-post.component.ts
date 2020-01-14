import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {PostService} from '../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-edit-post',
    templateUrl: './edit-post.component.html',
    styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
    editPostForm: FormGroup;
    defaultImageUrl = '../../../assets/img/image_placeholder.jpg'
    imgSrc = this.defaultImageUrl;
    selectedImage: File = null;
    updatingPost: any;
    postDataSubscription: Subscription;

    constructor(
        private storage: AngularFireStorage,
        private postService: PostService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.editPostForm = new FormGroup({
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

    showPreview(event: any) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e: any) => this.imgSrc = e.target.result;
            reader.readAsDataURL(event.target.files[0]);
            this.selectedImage = event.target.files[0];
        } else {
            this.imgSrc = this.defaultImageUrl;
            this.selectedImage = null;
        }
    }

    editPost(formData: FormData) {
        this.postService.updatePost(this.updatingPost.postKey, formData, this.selectedImage)
                .then(() => {
                    this.router.navigate(['/']);
               })
                 .catch(console.error);
    }

    private fillForm(post): void {
        this.editPostForm.get('title').setValue(post.title);
        this.imgSrc = post.imageUrl;
        this.editPostForm.get('content').setValue(post.content);
    }

    ngOnDestroy() {
        this.postDataSubscription.unsubscribe();
    }
}
