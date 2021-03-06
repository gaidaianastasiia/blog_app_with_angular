import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './services/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./components/posts/posts.module').then(mod => mod.PostsModule),
        canActivate: [AuthGuard]
    },
    {path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(mod => mod.AuthModule)}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
