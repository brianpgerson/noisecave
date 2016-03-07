# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160307015720) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "playlistings", force: :cascade do |t|
    t.integer  "track_id",    null: false
    t.integer  "playlist_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "playlistings", ["playlist_id"], name: "index_playlistings_on_playlist_id", using: :btree
  add_index "playlistings", ["track_id"], name: "index_playlistings_on_track_id", using: :btree

  create_table "playlists", force: :cascade do |t|
    t.integer  "creator_id",  null: false
    t.string   "title",       null: false
    t.text     "description"
    t.string   "slug",        null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "playlists", ["creator_id"], name: "index_playlists_on_creator_id", using: :btree
  add_index "playlists", ["slug"], name: "index_playlists_on_slug", using: :btree

  create_table "tracks", force: :cascade do |t|
    t.string   "title",                       null: false
    t.string   "slug",                        null: false
    t.text     "description",                 null: false
    t.string   "image_url"
    t.string   "audio_url",                   null: false
    t.integer  "creator_id",                  null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.boolean  "archived",    default: false
    t.integer  "plays",       default: 0,     null: false
  end

  add_index "tracks", ["audio_url"], name: "index_tracks_on_audio_url", using: :btree
  add_index "tracks", ["creator_id"], name: "index_tracks_on_creator_id", using: :btree
  add_index "tracks", ["slug"], name: "index_tracks_on_slug", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",                                                                                                                           null: false
    t.string   "slug",                                                                                                                               null: false
    t.string   "email",                                                                                                                              null: false
    t.string   "password_digest",                                                                                                                    null: false
    t.text     "description"
    t.string   "image",           default: "http://res.cloudinary.com/thadowg/image/upload/c_fill,h_303,w_303/v1456691068/fneickfs0vgwtxmansd4.jpg"
    t.string   "session_token",                                                                                                                      null: false
    t.datetime "created_at",                                                                                                                         null: false
    t.datetime "updated_at",                                                                                                                         null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree
  add_index "users", ["slug"], name: "index_users_on_slug", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", using: :btree

end
