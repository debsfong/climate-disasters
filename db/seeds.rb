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
  t.disasterNumber = row['disasterNumber']
  t.ihProgramDeclared = row['ihProgramDeclared']
  t.iaProgramDeclared = row['iaProgramDeclared']
  t.paProgramDeclared = row['paProgramDeclared']
  t.hmProgramDeclared = row['hmProgramDeclared']
  t.state = row['state']
  t.declarationDate = row['declarationDate']
  t.disasterType = row['disasterType']
  t.incidentType = row['incidentType']
  t.title = row['title']
  t.incidentBeginDate = row['incidentBeginDate']
  t.incidentEndDate = row['incidentEndDate']
  t.disasterCloseOutDate = row['disasterCloseOutDate']
  t.declaredCountyArea = row['declaredCountyArea']
  t.placeCode = row['placeCode']
  t.md5hash = row['md5hash']
  t.lastRefresh = row['lastRefresh']
  t.save
end

puts "There are now #{Disaster.count} rows in the transactions table"