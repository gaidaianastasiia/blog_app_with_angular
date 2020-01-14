import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/user';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    form: FormGroup;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl('', [Validators.minLength(6), Validators.required])
        });
    }

    signUp(formData: FormData) {
        const newUser = new User(formData['email'], formData['password']);

        this.authService.signUp(newUser)
            .then(value =>{
                this.router.navigate(['/'])
            })
            .catch(err => {
                window.alert(err.message);
            });

    }
}
