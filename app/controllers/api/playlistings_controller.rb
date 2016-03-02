class Api::PlaylistingsController < ApplicationController

  def index
    @playlistings = Playlist.find(params[:id]).tracks
  end

  def create
    @playlisting = {
      playlistings: [],
      errors: []
    }

    playlisting_params[:tracks].each do |track|
      plisting = Playlisting.new({track_id: track.id, playlist_id: playlisting_params[:playlist_id]})
      if plisting.save
        @playlisting['playlistings'] << plisting
      else
        @playlisting['errors'] << plisting.errors.full_messages
      end
    end
    render json: @playlisting
  end

  def destroy
    @playlisting = Playlisting.find(params[:id])
    Playlisting.delete(params[:id])
    render json: @playlisting
  end

  private

  def playlisting_params
    params.require(:playlisting).permit(:tracks, :playlist_id)
  end

end
