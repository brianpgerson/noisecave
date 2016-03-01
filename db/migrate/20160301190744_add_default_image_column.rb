class AddDefaultImageColumn < ActiveRecord::Migration
  def change
    change_column :users, :image, :string, default: "http://res.cloudinary.com/thadowg/image/upload/c_fill,h_303,w_303/v1456691068/fneickfs0vgwtxmansd4.jpg"
  end
end
