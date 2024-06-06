class Custom < ApplicationRecord
    has_many :custom_drank_logs, dependent: :destroy
    has_many :drink_result_logs, through: :custom_drank_logs
end
