FactoryBot.define do
  factory :drink_result_log do
    user_id { "" }
    drink_name { "MyString" }
    calorie { 1 }
    protein { 1 }
    sugar { 1 }
    description { "MyText" }
    image { "MyText" }
    size { "MyString" }
    comment { "MyText" }
    is_favorite_flg { false }
    is_drank_flg { false }
  end
end
