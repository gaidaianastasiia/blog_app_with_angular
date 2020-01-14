import {NgModule} from '@angular/core';
import {PostsRoutingModule} from './posts-routing.module';
import {PostsListComponent} from './posts-list/posts-list.component';
import {PostComponent} from './post/post.component';
import {AddPostComponent} from './add-post/add-post.component';
import {PostFormComponent} from './post-form/post-form.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { EditPostComponent } from './edit-post/edit-post.component';

@NgModule({
    imports: [
        CommonModule,
        PostsRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [PostsListComponent, PostComponent, PostFormComponent, AddPostComponent, EditPostComponent]
})

export class PostsModule {
}