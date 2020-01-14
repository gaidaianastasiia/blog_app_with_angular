import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {USER_ROLE} from '../constants/userRole';
import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isAdmin: boolean;
    isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(this.isAdmin);

    constructor(
        private afAuth: AngularFireAuth,
        private afStore: AngularFirestore,
    ) {
    }

    public signUp(newUser: User): Promise<void> {
        return this.afAuth.auth
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then(userCredential => {
                this.saveUserData(userCredential.user.email, newUser.role)
                    .then(() => {
                        this.setIsAdmin(newUser.role);
                    })
            })
    }

    public signIn(user: User): Promise<void> {
        return this.afAuth.auth
            .signInWithEmailAndPassword(user.email, user.password)
            .then(signInUser => {
                this.getAuthorizedUser(signInUser)
                    .onSnapshot(snap => {
                        snap.forEach(userRef => {
                            this.setIsAdmin(userRef.data().role);
                        });
                    });
            })
    }

    public signOut(): Promise<void> {
        return this.afAuth.auth.signOut()
    }

    public isUserLogin(): boolean {
        return this.afAuth.auth.currentUser !== null
    }

    private saveUserData(email, role) {
        return this.afStore.collection('users')
            .add({email, role});
    }

    private getAuthorizedUser(signInUser) {
       return this.afStore
            .collection('users')
            .ref.where('email', '==', signInUser.user.email);
    }

    private setIsAdmin(role) {
        this.isAdmin = role === USER_ROLE.admin;
        this.isAdmin$.next(this.isAdmin);
    }
}