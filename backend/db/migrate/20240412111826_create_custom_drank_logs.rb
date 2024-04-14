class CreateCustomDrankLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :custom_drank_logs do |t|
      t.bigint :drink_result_log_id
      t.bigint :custom_id

      t.timestamps
    end

    # 外部キーとして設定
    add_foreign_key :custom_drank_logs, :drink_result_logs, column: :drink_result_log_id
    add_foreign_key :custom_drank_logs, :customs, column: :custom_id

    # インデックスの追加
    add_index :custom_drank_logs, :drink_result_log_id
    add_index :custom_drank_logs, :custom_id    
  end
end
