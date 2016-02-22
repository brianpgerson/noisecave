# NoiseCave

* [Heroku link][http://www.noisecave.com]

* [Heroku][noisecave.herokuapp.com]

## Minimum Viable Product

NoiseCave is a web application inspired by SoundCloud built with Ruby on Rails and React.js. NoiseCave allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, read, update, and delete tracks
- [ ] Organize tracks within playlists
- [ ] Play tracks continuously while navigating

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] style landing page with sign-in/sign-up dual purpose form
- [ ] blank landing page after signin

### Phase 2: Track Model, API, and basic APIUtil (1.5 days)

**Objective:** Notes can be created, read, edited and destroyed through
the API.

- [ ] create `Track` model
- [ ] figure out how to actually save media files/what data I get from them
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for track (`TracksController`)
- [ ] jBuilder views for track
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (2 days)

**Objective:** Tracks can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each track component, building out the flux loop as needed.
  - [ ] `TracksIndex`
  - [ ] `TrackIndexItem`
  - [ ] `TrackUploadForm`
- [ ] Tracks are saved to the DB on save in the track form
- [ ] Tracks play continuously throughout navigation

### Phase 4: Standardize Styling (0.5 days)

**Objective:** Build on some of the boilerplate styling and standardize styles across the site.

- [ ] flesh out the style guide
- [ ] add more advanced colors & styles that can be reused

### Phase 5: Playlists (1.5 days)

**Objective:** Tracks belong to Playlists, and can be viewed by playlist.

- [ ] create `Playlist` model
- build out API, Flux loop, and components for:
  - [ ] Playlist CRUD
  - [ ] moving tracks to different/multiple playlists
  - [ ] viewing tracks by playlist
- Use CSS to style new views


### Phase 6: Search (.5 day)

**Objective:** Tracks are searchable with fuzzy search capabilities

- [ ] create `Search` component which:
  - [ ] searches the database for tracks
  - [ ] implements fuzzy search functionality
  - [ ] dynamically loads and shows the results

### Phase 7: Styling Cleanup and Seeding (2 days)

**Objective:** Make the site extremely excellent.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Search through notes for blocks of text
- [ ] Slugging for track/playlist urls
- [ ] Pagination / infinite scroll for Tracks Index (discover page)
- [ ] Ability to tag tracks, organize by tags
- [ ] Multiple sessions
