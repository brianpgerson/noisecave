class Playlist < ActiveRecord::Base
  validates :title, :creator_id, :slug, presence: true
  after_initialize :ensure_slug

  has_many :playlistings,
    foreign_key: :playlist_id,
    primary_key: :id,
    class_name: "Playlisting"

  has_many :tracks,
    through: :playlistings,
    source: :track

  belongs_to :user,
    foreign_key: :creator_id,
    primary_key: :id,
    class_name: "User"


  private
  def ensure_slug
    self.slug ||= self.title
  end
end
