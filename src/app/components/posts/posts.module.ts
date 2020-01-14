import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {PostsRoutingModule} from './posts-routing.module';
import {PostsListComponent} from './posts-list/posts-list.component';
import {PostComponent} from './post/post.component';
import {PostFormComponent} from './post-form/post-form.component';

@NgModule({
    imports: [
        CommonModule,
        PostsRoutingModule,
        ReactiveFormsModule,
    ],
    declarations: [PostsListComponent, PostComponent, PostFormComponent]
})
export class PostsModule {}