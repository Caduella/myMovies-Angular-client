import { Component, OnInit, Input, Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// Components
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

// Import to bring in the API call created in 6.2
import { FetchApiDataService  } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit{

  @Input() userData = { Username: "", Email: "", Birthday: "", FavoriteMovies: [] };

  user: any = {};
  movies: any[] = [];
  FavoriteMovies : any[] = [];

 
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getFavMovies();
  }

  
  getProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    });
  }

  updateUser(): void {
     // Used registartionComponent with another shared variables
     this.dialog.open(UserRegistrationFormComponent, { width: '400px', height: '400px', data: { title: 'UPDATE USER', button: 'Update', function: 'updateUser()' } });
     this.fetchApiData.currentUser.subscribe(userData => this.user = userData);
  }

  
  deleteUser(): void {
    this.router.navigate(['welcome']).then(() => {
      localStorage.clear();
      this.snackBar.open('User successfully deleted.', 'OK', {
        duration: 2000
      });
    })
    this.fetchApiData.deleteUser().subscribe((result) => {
      console.log(result);
    });
  }

 
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

    openDirectorDialog(name: string, bio: string, birth: string, death: string): void {
      this.dialog.open(DirectorInfoComponent, {
        data: {
          Name: name,
          Bio: bio,
          Birth: birth,
          Death: death
        },
        width: '450px',
      });
    }
  
  
    openGenreDialog(name: string, description: string): void {
      this.dialog.open(GenreInfoComponent, {
        data: {
          Name: name,
          Description: description,
        },
        width: '450px',
      });
    }
  
  
    openSynopsisDialog(description: string): void {
      this.dialog.open(MovieSynopsisComponent, {
        data: {
          Description: description,
        },
        width: '450px',
      });
    }


  getFavMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
    console.log('Fav Movies in getFavMovie', this.FavoriteMovies);
  }

  
  isFav(movie: any): any {
    const MovieID = movie._id;
    if (this.FavoriteMovies.some((movie) => movie === MovieID)) {
      return true;
    } else {
      return false;
    }
  }

  
  deleteFavMovies(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.deleteFavouriteMovies(movie).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavMovies();
      this. getProfile();
      this.snackBar.open('Movie has been deleted from your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }
}