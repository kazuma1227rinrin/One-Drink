class CustomDrankLog < ApplicationRecord
    belongs_to :drink_result_log
    belongs_to :custom
end
