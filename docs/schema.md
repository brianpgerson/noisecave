# Schema Information

## tracks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
description | text      | not null
image_url   | string    | not null
audio_url   | string    | not null  <!-- need to check into this -->
creator_id  | integer   | not null, foreign key (references users), indexed
playlist_id | integer   | not null, foreign key (references notebooks), indexed
archived    | boolean   | not null, default: false

## playlists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
creator_id  | integer   | not null, foreign key (references users), indexed
title       | string    | not null
description | string    |

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
password_digest | string    | not null
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
