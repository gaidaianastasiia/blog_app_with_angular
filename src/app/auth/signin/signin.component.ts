import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl('', [Validators.minLength(6), Validators.required])
        });
    }

    login(formData: FormData) {
        const user = new User(formData['email'], formData['password']);

        this.authService.signIn(user)
            .then(userCredential => {
                this.router.navigate(['/'])
            })
            .catch(err => {
                window.alert(err.message);
            });
    }
}
