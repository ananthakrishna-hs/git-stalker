# GitStalker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2. Search any user and user's public repository's list using exact user name.

## Development server
> Needs [Node.js](https://nodejs.org/en/) to be installed!
- Run `npm install` in the root of the project.
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Assumptions
- Exact username to be entered on the search bar.
- Maximum number of repositories per page is fixed to 10, but configurable.
- Rate limit applicable as per GitHub REST API policy.
- Sort of results only on _created time_.
- Application hierarchy as per abstraction and for further enhancements.

## Solution
- Username to be searched in search bar in the header (and inside collapse for smaller screens).
- Uses Ng-Bootstrap purely for styling and standard widgets.
- Decomposes application into abstracted components and interacts through data-bainding and event-emitters.
- Uses BehaviorSubject to track loader status, which is used for all API calls made in interceptor.


