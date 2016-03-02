require 'byebug'

class Api::PlaylistsController < ApplicationController

  def index
    @playlists = User.find(params[:id]).playlists
    render json: @playlists
  end

  def create
    @playlist = Playlist.new(playlist_params)
    if @playlist.save
      render json: @playlist
    else
      render json: {errors: @playlist.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    @playlist = Playlist.find(params[:id])
    if @playlist.update(playlist_params)
      render json: @playlist
    else
      render json: {errors: @playlist.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @playlist = Playlist.find(params[:id])
    Playlist.delete(params[:id])
  end

  def show
    @playlist = Playlist.find(params[:id])
    @playlist['tracks'] = @playlist.tracks
    render json: @playlist
  end

  private

  def playlist_params
    params.require(:playlist).permit(:creator_id, :title, :description, :slug)
  end

end
