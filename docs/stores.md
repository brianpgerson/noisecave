# Flux Stores

### TrackStore

Holds all persisted track data.

##### Actions:
- `receiveAllTracks`
- `receiveSingleTrack`
- `removeTrack`

##### Listeners:
- `TracksIndex` (passes to `TrackIndexItem` via props)
- `TrackDetail`

### PlaylistStore

Holds all persisted playlist data.

##### Actions:
- `receiveAllPlaylist`
- `receiveSinglePlaylist`
- `removePlaylist`

##### Listeners:
- `PlaylistIndex`

### SearchStore

Holds search parameters to send to the API.

##### Actions:
- `receiveSearchParams`

##### Listeners:
- `SearchIndex`
