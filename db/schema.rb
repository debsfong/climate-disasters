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

ActiveRecord::Schema.define(version: 20180114205913) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "disasters", force: :cascade do |t|
    t.integer "disaster_number"
    t.boolean "ih_drogram_declared"
    t.boolean "ia_program_declared"
    t.boolean "pa_program_declared"
    t.boolean "hm_program_declared"
    t.string "state"
    t.datetime "declaration_date"
    t.string "disaster_type"
    t.string "incident_type"
    t.string "title"
    t.datetime "incident_begin_date"
    t.datetime "incident_end_date"
    t.datetime "disaster_close_out_date"
    t.string "place_code"
    t.string "declared_county_area"
    t.datetime "last_refresh"
    t.string "md5hash"
    t.string "identifier"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
