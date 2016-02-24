class FixTrackArchivedColumn < ActiveRecord::Migration
  def change
    change_column :tracks, :archived, :boolean, null: true
  end
end
