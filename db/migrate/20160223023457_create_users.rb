class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :slug, null: false, unique: true
      t.string :email, null: false, unique: true
      t.string :password_digest, null: false
      t.text :description
      t.text :image
      t.string :session_token, null: false
      t.timestamps null: false
    end

    add_index :users, :username
    add_index :users, :slug
    add_index :users, :email
    add_index :users, :session_token
  end
end
