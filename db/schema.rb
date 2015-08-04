# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150804060035) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "characters", force: :cascade do |t|
    t.string  "name",                                  null: false
    t.string  "real_name"
    t.text    "description"
    t.text    "powers"
    t.string  "thumbnail_url"
    t.integer "marvel_id",                             null: false
    t.integer "wiki_id"
    t.integer "fighting_rating"
    t.integer "strength_rating"
    t.integer "energy_rating"
    t.integer "intelligence_rating"
    t.integer "durability_rating"
    t.integer "speed_rating"
    t.boolean "is_missing_image",      default: false, null: false
    t.boolean "is_missing_ratings",    default: false, null: false
    t.boolean "is_invalid",            default: false, null: false
    t.integer "original_character_id"
    t.boolean "is_original",           default: false, null: false
    t.integer "experience"
  end

  add_index "characters", ["original_character_id"], name: "index_characters_on_original_character_id", using: :btree

  create_table "teams", force: :cascade do |t|
    t.string   "name",                           null: false
    t.text     "description"
    t.integer  "total_experience",   default: 0, null: false
    t.integer  "total_fighting",     default: 0, null: false
    t.integer  "total_strength",     default: 0, null: false
    t.integer  "total_energy",       default: 0, null: false
    t.integer  "total_intelligence", default: 0, null: false
    t.integer  "total_durability",   default: 0, null: false
    t.integer  "total_speed",        default: 0, null: false
    t.integer  "total_camaraderie",  default: 0, null: false
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.integer  "user_id",                        null: false
    t.integer  "score",              default: 0, null: false
  end

  add_index "teams", ["user_id"], name: "index_teams_on_user_id", using: :btree

  create_table "teams_characters", force: :cascade do |t|
    t.integer  "character_id"
    t.integer  "team_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "teams_characters", ["character_id"], name: "index_teams_characters_on_character_id", using: :btree
  add_index "teams_characters", ["team_id"], name: "index_teams_characters_on_team_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.string   "image",            limit: 1024
  end

  add_foreign_key "teams", "users"
end
