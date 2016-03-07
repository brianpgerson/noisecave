# NoiseCave

http://www.noisecave.com

## Minimum Viable Product

NoiseCave is a web application inspired by SoundCloud built with Ruby on Rails and React.js. NoiseCave allows users to:

- [x] Create an account
- [x] Log in / Log out
- [x] Create, read, update, and delete tracks
- [x] Play tracks continuously while navigating
- [x] Add tracks to the audio playback queue
- [x] Organize tracks within playlists
- [x] Search tracks by title

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

- [x] create new project
- [x] create `User` model
- [x] authentication
- [x] style landing page with sign-in/sign-up dual purpose form
- [x] blank landing page after signin

### Phase 2: Track Model, API, and basic APIUtil (1 days)

**Objective:** Notes can be created, read, edited and destroyed through
the API.

- [x] create `Track` model
- [x] seed the database with a small amount of test data
- [x] CRUD API for track (`TracksController`)
- [x] jBuilder views for track
- [x] setup Webpack & Flux scaffold
- [x] setup `APIUtil` to interact with the API
- [x] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Tracks can be manipulated with the
user interface.

- [x] setup the flux loop with skeleton files
- [x] setup React Router
- [x] implement each track component, building out the flux loop as needed.
- [x] `TracksIndex`
- [x] `TrackIndexItem`
- [x] `TrackUploadForm`
- [x] `TrackDetail`
- [x] Tracks are saved to the DB on save in the track form


### Phase 4: Audio Playback/Stream Component (1 day)

**Objective:** Build out the track player component using HTML5 audio

- [x] persist a "stream bar" at the top of the page
- [x] get audio to play continuously!

### Phase 5: Standardize Styling (0.5 days)

**Objective:** Build on some of the boilerplate styling and standardize styles across the site.

- [x] flesh out the style guide
- [x] add more advanced colors & styles that can be reused

### Phase 6: Playlists (1.5 days)

**Objective:** Tracks belong to Playlists, and can be viewed by playlist.

- [x] create `Playlist` model
- build out API, Flux loop, and components for:
  - [x] Playlist CRUD
  - [x] moving tracks to different/multiple playlists
  - [x] viewing tracks by playlist
- Use CSS to style new views


### Phase 7: Search (.5 day)

**Objective:** Tracks are searchable with fuzzy search capabilities

- [x] create `Search` component which:
  - [x] searches the database for tracks
  - [ ] implements fuzzy search functionality


### Phase 8: Styling Cleanup and Seeding (2 days)

**Objective:** Make the site extremely excellent.

- [x] Get feedback on my UI from others
- [x] Refactor HTML classes & CSS rules
- [x] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Slugging for track/playlist urls
- [ ] Pagination / infinite scroll for Tracks Index (discover page)
- [ ] Ability to tag tracks, organize by tags
- [ ] Multiple sessions
