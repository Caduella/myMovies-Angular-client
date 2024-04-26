import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * @description Component representing the welcome page.
 * @selector 'app-welcome-page'
 * @templateUrl './welcome-page.component.html'
 * @styleUrls ['./welcome-page.component.scss']
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent implements OnInit {
  
  /**
   * @constructor
   * @param {MatDialog} dialog - Material dialog service for opening dialogs.
   */
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}
 
  /**
   * @description Opens the user registration dialog when called.
   */
  public openUserRegistrationDialog() : void {
    localStorage.clear();
    console.log(localStorage.getItem('token'));
    this.dialog.open(UserRegistrationFormComponent, { width: '400px', data: {title: 'REGISTER', button: 'Signup', function: 'registerUser()'}});
   }

  /**
   * @description Opens the login dialog when called.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assign dialog width
      width: '380px'
    });
  }

}