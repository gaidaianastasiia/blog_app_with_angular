import {Injectable} from '@angular/core';
import {USER_ROLE_KEY} from '../constants/storageKeys';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    getRole() {
        return localStorage.getItem(USER_ROLE_KEY);
    }

    saveRole(role) {
        localStorage.setItem(USER_ROLE_KEY, role);
    }

    deleteRole() {
        localStorage.removeItem(USER_ROLE_KEY);
    }
}