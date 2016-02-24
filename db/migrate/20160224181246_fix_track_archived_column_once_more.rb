class FixTrackArchivedColumnOnceMore < ActiveRecord::Migration
  def change
    change_column :tracks, :archived, :boolean, default: false
  end
end
