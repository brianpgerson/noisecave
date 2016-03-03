class Playlisting < ActiveRecord::Base
  validates :track_id, :playlist_id, presence: true

  belongs_to :track
  belongs_to :playlist
end
