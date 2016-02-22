# API Endpoints

## HTML API

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Tracks

- `GET /api/tracks`
  - Tracks index/search
  - accepts pagination params (if I get there)
- `POST /api/tracks`
- `GET /api/tracks/:id`
- `PATCH /api/tracks/:id`
- `DELETE /api/tracks/:id`

### Playlists

- `GET /api/playlist`
  - index of all playlists for a user
- `POST /api/playlist`
- `GET /api/playlist/:id`
- `PATCH /api/playlist/:id`
- `DELETE /api/playlist/:id`
- `GET /api/playlist/:id/tracks`
  - index of all tracks for a playlist
  
<!-- TODO Look into slugging for above! -->

### Tags (bonus)

- A track's tags will be included in the track detail and track list item
- `GET /api/tags`
- `POST /api/tracks/:track_id/tags`: add tag to track by name
- `DELETE /api/tracks/:track_id/tags/:tag_name`: remove tag from track by
  name
