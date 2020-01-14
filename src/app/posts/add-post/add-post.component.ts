import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {PostService} from '../../services/post.service';
import {Router} from '@angular/router';
import {DEFAULT_PREVIEW_IMAGE_URL} from '../../constants/url';

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
    addPostForm: FormGroup;
    previewImageURL: string;
    selectedImage: File;

    constructor(
        private storage: AngularFireStorage,
        private postService: PostService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.addPostForm = new FormGroup({
            title: new FormControl('', Validators.required),
            imageUrl: new FormControl(''),
            content: new FormControl('', Validators.required)
        });

        this.previewImageURL = DEFAULT_PREVIEW_IMAGE_URL;
        this.selectedImage = null;
    }

    showPreviewImage(event: any) {
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
}