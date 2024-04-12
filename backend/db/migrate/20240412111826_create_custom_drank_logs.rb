class CreateCustomDrankLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :custom_drank_logs do |t|
      t.bigint :drink_result_log_id
      t.bigint :custom_id

      t.timestamps
    end
  end
end
