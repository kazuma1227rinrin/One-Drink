class DrinkResultLog < ApplicationRecord
    has_many :custom_drank_logs, dependent: :destroy
    has_many :customs, through: :custom_drank_logs
end
