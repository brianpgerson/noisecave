class AddPlaysColumn < ActiveRecord::Migration
  def change
    add_column :tracks, :plays, :integer, null: false, default: 0
  end
end
