import { Component, OnInit, Input, Inject   } from '@angular/core';

// Import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Import to bring in the API call 
import { FetchApiDataService  } from '../fetch-api-data.service';

// Import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component representing the signup form.
 * @selector 'app-user-registration-form'
 * @templateUrl './user-registration-form.component.html'
 * @styleUrls ['./user-registration-form.component.scss']
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  @Input() userData : any= { Username: '', Password: '', Email: '', Birthday: '' };

  token : any = localStorage.getItem('token');

  /**
   * @constructor - Constructor for UserProfileComponent.
   * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Material dialog service for opening dialogs.
   * @param {MatSnackBar} snackBar - Material snack bar service for displaying notifications.
   */
constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, button: string, function: string}
  ) {}

// this method is called once the component has received all its input from the calling component
ngOnInit(): void {
   if( this.token !== null ){
     this.userData = JSON.parse(localStorage.getItem('user') || '');
     this.userData.Password = '';
     console.log(this.userData);
   }
}

  /**
   * Function responsible for sending the form inputs to the backend. 
   * @returns Message "User registration successful" / "User registration successful".
   */
registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
  // Logic for a successful user registration goes here!    
    this.dialogRef.close(); // This will close the modal on success!
    console.log(response);
    this.snackBar.open('User registration successful', 'OK', {
      duration: 2000
     });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

  /**
     * This method will update the user's data
     * @returns user's data
     * @returns updated user's data saved to local storage
     * @returns user notified of success
     * @returns user notified of error
   */
  updateUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((response) => {
      console.log(response);
     localStorage.setItem('user', JSON.stringify(response));
     this.dialogRef.close();
     this.snackBar.open('User updated successfully!!', 'OK', {duration: 2000});
    }, (response) => {
     console.log(response);
     this.snackBar.open(response, 'OK', {  duration: 2000});
    });
  }

}