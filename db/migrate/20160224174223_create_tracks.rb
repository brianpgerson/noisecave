class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.string :slug, null: false
      t.text :description, null: false
      t.string :image_url
      t.string :audio_url, null: false
      t.integer :creator_id, null: false
      t.boolean :archived, null: false, default: false
      t.timestamps null: false
    end

    add_index :tracks, :slug
    add_index :tracks, :audio_url
    add_index :tracks, :creator_id
  end
end
