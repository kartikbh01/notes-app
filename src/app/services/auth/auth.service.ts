import { Injectable } from '@angular/core';
import { account } from '../../lib/appwrite';
import { ID } from 'appwrite';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // register
  async register(email: string, password: string, name: string) {
    return await account.create({
        userId: ID.unique(),
        email: email,
        password: password,
        name: name
    });
  }

  // login
  async login(email: string, password: string) {
    return await account.createEmailPasswordSession({
        email: email,
        password: password
    });
  }

  // logout
  async logout() {
    return await account.deleteSession('current');
  }

  // get current user
  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      return null;
    }
  }
}


// appwrite sdk method explanations
// account.create() -> creates a new user (for register user)
// account.createEmailPasswordSession() -> creates a new session for the user (for login)
// account.deleteSession() -> deletes the current session (for logout)
// account.get() -> gets the current user (user object)
