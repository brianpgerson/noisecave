class Track < ActiveRecord::Base
  validates :title, :slug, :description, :audio_url, :creator_id, presence: true
  after_initialize :ensure_slug

  belongs_to :creator,
    foreign_key: :creator_id,
    primary_key: :id,
    class_name: "User"


  private

  def ensure_slug
    self.slug ||= self.title
  end
end
