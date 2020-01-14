import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PostsListComponent} from './posts-list/posts-list.component';
import {PostComponent} from './post/post.component';
import {PostFormComponent} from './post-form/post-form.component';


const routes: Routes = [
    { path: '', component: PostsListComponent },
    { path: 'post/:postData', component: PostComponent },
    { path: 'create', component: PostFormComponent },
    { path: 'edit/:postData', component: PostFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostsRoutingModule { }