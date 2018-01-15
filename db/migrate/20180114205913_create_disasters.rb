class CreateDisasters < ActiveRecord::Migration[5.1]
  def change
    create_table :disasters do |t|
      t.integer :disasterNumber
      t.boolean :ihProgramDeclared
      t.boolean :iaProgramDeclared
      t.boolean :paProgramDeclared
      t.boolean :hmProgramDeclared
      t.string :state
      t.timestamp :declarationDate
      t.string :disasterType
      t.string :incidentType
      t.string :title
      t.timestamp :incidentBeginDate
      t.timestamp :incidentEndDate
      t.timestamp :disasterCloseOutDate
      t.string :placeCode
      t.string :declaredCountyArea
      t.timestamp :lastRefresh
      t.string :md5hash
      t.string :identifier
      t.timestamps
    end
  end
end
