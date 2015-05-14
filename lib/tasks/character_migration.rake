namespace :character do
  desc "Exports characters to csv file"
  task :export => :environment do
    exporter = CharacterCSVExporter.new('db/characters.csv')
    exporter.export(Character.all)
  end

  desc "Imports characters from csv file"
  task :import => :environment do
    exporter = CharacterCSVImporter.new('db/characters.csv')
    exporter.import
  end
end
