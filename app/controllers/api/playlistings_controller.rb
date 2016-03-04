require 'byebug'

class Api::PlaylistingsController < ApplicationController

  def index
    @playlistings = Playlist.find(params[:id]).tracks
    render json: @playlistings
  end

  def create
    @playlisting = Playlisting.new({track_id: playlisting_params[:track_id], playlist_id: playlisting_params[:playlist_id]})
    if @playlisting.save
      render json: @playlisting
    else
      render json: {errors: @playlisting.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @playlisting = Playlisting.find(params[:id])
    Playlisting.delete(params[:id])
    render json: @playlisting
  end

  private

  def playlisting_params
    params.require(:playlisting).permit(:track_id, :playlist_id)
  end

end
