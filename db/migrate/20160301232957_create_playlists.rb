class CreatePlaylists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
      t.integer :creator_id, null: false
      t.string :title, null: false
      t.text :description
      t.string :slug, null: false
      t.timestamps null: false
    end
    add_index :playlists, :creator_id
    add_index :playlists, :slug
  end
end
