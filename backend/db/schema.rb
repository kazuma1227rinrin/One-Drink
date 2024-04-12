# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_04_12_111826) do
  create_table "custom_drank_logs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "drink_result_log_id"
    t.bigint "custom_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "customs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.float "calorie"
    t.float "protein"
    t.float "sugar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "drink_result_logs", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.string "drink_name"
    t.integer "calorie"
    t.integer "protein"
    t.integer "sugar"
    t.text "description"
    t.text "image"
    t.string "size"
    t.text "comment"
    t.boolean "is_favorite_flg"
    t.boolean "is_drank_flg"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
