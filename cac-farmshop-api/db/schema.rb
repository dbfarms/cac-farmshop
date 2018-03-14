# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180314190132) do

  create_table "carts", force: :cascade do |t|
    t.integer "user_id"
    t.string "status", default: "not submited"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories", force: :cascade do |t|
    t.string "title"
  end

  create_table "customer_users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.integer "customer_user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "authorization"
  end

  create_table "customers", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "days", force: :cascade do |t|
    t.string "name"
  end

  create_table "days_availables", force: :cascade do |t|
    t.integer "day_id"
    t.integer "farmgood_id"
  end

  create_table "farmerfarmgoods", force: :cascade do |t|
    t.integer "farmer_id"
    t.integer "farmgood_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "farmers", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.string "kind_of"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
  end

  create_table "farmgood_categories", force: :cascade do |t|
    t.integer "category_id"
    t.integer "farmgood_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "farmgoods", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "img_url"
    t.integer "farmer_id"
    t.integer "price"
    t.integer "inventory"
    t.integer "category_id"
  end

  create_table "line_items", force: :cascade do |t|
    t.integer "cart_id"
    t.integer "item_id"
    t.integer "quantity", default: 1
  end

  create_table "orders", force: :cascade do |t|
    t.integer "user_id"
    t.integer "cart_id"
    t.string "status"
    t.integer "total"
  end

  create_table "user_roles", force: :cascade do |t|
    t.integer "user_id"
    t.integer "farmer_id"
    t.integer "customer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "authorization"
    t.integer "farmer_id"
  end

end
