import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';

import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [SigninComponent, SignupComponent],
})
export class AuthModule {}