require 'byebug'
require_relative '../../../lib/crypto'

class Api::TracksController < ApplicationController
  before_action :require_logged_in, only: [:create, :update, :destroy]

  def index
    @tracks = Track.all
    render json: @tracks
  end

  def show
    @track = Track.find(params[:id])
    render json: @track
  end

  def create
    @track = Track.new(track_params)
    if @track.save
      render json: @track
    else
      render json: {errors: @track.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    @track = Track.find(params[:id])
    updated_plays = @track.plays + 1
    if @track.update(plays: updated_plays)
      render json: @track
    else
      render json: {errors: @track.errors.full_messages}, status: :unprocessable_entity
    end
  end


  def destroy
    @track = Track.find(params[:id])
    Track.delete(params[:id])
    render json: @track
  end

  private

  def track_params
    params.require(:track).permit(:title, :description, :image_url, :audio_url, :creator_id, :archived, :slug)
  end

end
