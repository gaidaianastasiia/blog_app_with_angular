import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../models/user';
import {AngularFirestore} from '@angular/fire/firestore';
import UserCredential = firebase.auth.UserCredential;
import {RoleService} from './role.service';
import {USER_ROLE} from '../constants/userRole';
import {BehaviorSubject} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isAdmin: boolean;
    isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(this.isAdmin);

    constructor(
        private afAuth: AngularFireAuth,
        private afStore: AngularFirestore,
        private roleService: RoleService
    ) {
    }

    public signUp(newUser: User): Promise<void> {
        return this.afAuth.auth
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then(userCredential => {
                this.afStore.collection('users')
                    .add({
                        email: userCredential.user.email,
                        role: newUser.role
                    })
                    .then(() => {
                            this.isAdmin = newUser.role === USER_ROLE.admin;
                            this.isAdmin$.next(this.isAdmin);
                        }
                    )
            })
    }

    public signIn(user: User): Promise<void> {
        return this.afAuth.auth
            .signInWithEmailAndPassword(user.email, user.password)
            .then(user => {
                this.afStore
                    .collection('users')
                    .ref.where('email', '==', user.user.email)
                    .onSnapshot(snap => {
                        snap.forEach(userRef => {
                            this.isAdmin = userRef.data().role === USER_ROLE.admin;
                            this.isAdmin$.next(this.isAdmin);
                        });
                    });
            })
            .catch(err => console.log(err));
    }

    public signOut(): Promise<void> {
        return this.afAuth.auth.signOut()
    }

    public isUserLogin() {
        return this.afAuth.auth.currentUser !== null
    }
}