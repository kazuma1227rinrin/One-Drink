class CreateDrinkResultLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :drink_result_logs do |t|
      t.bigint :user_id
      t.string :drink_name
      t.integer :calorie
      t.integer :protein
      t.integer :sugar
      t.text :description
      t.text :image
      t.string :size
      t.text :comment
      t.boolean :is_favorite_flg
      t.boolean :is_drank_flg

      t.timestamps
    end
  end
end
