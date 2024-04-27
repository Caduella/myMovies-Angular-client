# MyMoviesAngularClient

Using Angular, this is SPA on the client side, based on its existing server-side code (REST API and database), with supporting documentation.

This single-page, responsive application provides users with access to informaiton about different movies, directors, and genres.  Users can sign up, date their informaiton, and create a list of their favorite movies.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Key features
- Display a welcome view where users will be able to either log in or sign up for an account.
- Once authenticated, the user can view all movies.
- On the movie card of each movie title, the user can hover over the option buttons of movie synopsis, genre, and director, and read more detailed information in the pop-up modal by clicking on it.
- On each movie card, the user can toggle on and off of their favorite movie designation by clicking on the heart symbol.

## Technical Requirements
- The application is written in Angular (version 16.1.0)
- The application requires Node.js (version 16.14.0) and npm packages
- The application contains user registration and login forms
- The application is designed using Angular Material (version 16.2.14)
- The application's codebase contains comments using Typedoc
- The project contains technical documentation using JSDoc
- The project is hosted on GitHub Pages

## Live App: https://caduella.github.io/myMovies-Angular-client/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
