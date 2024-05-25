class CreateCustoms < ActiveRecord::Migration[7.0]
  def change
    create_table :customs do |t|
      t.string :name
      t.float :calorie

      t.timestamps
    end
  end
end
