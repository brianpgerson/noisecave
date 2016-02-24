class FixTrackArchivedColumnAgain < ActiveRecord::Migration
  def change
    remove_column :tracks, :archived, :boolean
    add_column :tracks, :archived, :boolean
  end
end
