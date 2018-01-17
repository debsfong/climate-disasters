class CreateDisasters < ActiveRecord::Migration[5.1]
  def change
    create_table :disasters do |t|
      t.integer :disaster_number
      t.boolean :ih_drogram_declared
      t.boolean :ia_program_declared
      t.boolean :pa_program_declared
      t.boolean :hm_program_declared
      t.string :state
      t.timestamp :declaration_date
      t.string :disaster_type
      t.string :incident_type
      t.string :title
      t.timestamp :incident_begin_date
      t.timestamp :incident_end_date
      t.timestamp :disaster_close_out_date
      t.string :place_code
      t.string :declared_county_area
      t.timestamp :last_refresh
      t.string :md5hash
      t.string :identifier
      t.timestamps
    end
  end
end
