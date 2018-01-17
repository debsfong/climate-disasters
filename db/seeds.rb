# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# file = File.join(Rails.root, 'disaster_declarations_summaries.jsona')
# records = JSON.parse(File.read(file))

# records.each do |record|
#   Disaster.create!(record)
# end

require 'csv'

csv_text = File.read(Rails.root.join('lib', 'seeds', 'DisasterDeclarationsSummaries.csv'))
csv = CSV.parse(csv_text, headers: true, encoding: 'ISO-8859-1')
csv.each do |row|
  t = Disaster.new
  t.disaster_number = row['disasterNumber']
  t.ih_drogram_declared = row['ihProgramDeclared']
  t.ia_program_declared = row['iaProgramDeclared']
  t.pa_program_declared = row['paProgramDeclared']
  t.hm_program_declared = row['hmProgramDeclared']
  t.state = row['state']
  t.declaration_date = row['declarationDate']
  t.disaster_type = row['disasterType']
  t.incident_type = row['incidentType']
  t.title = row['title']
  t.incident_begin_date = row['incidentBeginDate']
  t.incident_end_date = row['incidentEndDate']
  t.disaster_close_out_date = row['disasterCloseOutDate']
  t.declared_county_area = row['declaredCountyArea']
  t.place_code = row['placeCode']
  t.md5hash = row['md5hash']
  t.last_refresh = row['lastRefresh']
  t.save
end

puts "There are now #{Disaster.count} rows in the transactions table"