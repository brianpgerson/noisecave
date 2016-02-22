# Schema Information

## tracks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
slug        | string    | not null, indexed
description | text      | not null
image       | attachment| not null
audio_url   | string    | not null  <!-- need to check into this -->
creator_id  | integer   | not null, foreign key (references users), indexed
archived    | boolean   | not null, default: false

## playlists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
creator_id  | integer   | not null, foreign key (references users), indexed
title       | string    | not null
description | string    |
slug        | string    | not null, indexed

##playlistings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
track_id    | integer   | not null, foreign key (references tracks), indexed
playlist_id | integer   | not null, foreign key (references playlists), indexed

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
creator_id  | integer   | not null, foreign key (references users), indexed
track_id    | integer   | not null, foreign key (references tracks), indexed

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
creator_id  | integer   | not null, foreign key (references users), indexed
track_id    | integer   | not null, foreign key (references tracks), indexed
body        | string    |

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
slug            | string    | not null, indexed
email           | string    | not null, indexed, unique
password_digest | string    | not null
description     | text      |
image           | attachment|
session_token   | string    | not null, indexed, unique


BONUS:

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
track_id    | integer   | not null, foreign key (references tracks), indexed, unique [tag_id]
tag_id      | integer   | not null, foreign key (references tags), indexed
