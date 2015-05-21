namespace :character do
  desc "Exports characters to csv file"
  task :export => :environment do
    exporter = CharacterCSVExporter.new('db/characters.csv')
    exporter.export(Character.all)
  end

  desc "Imports characters from csv file"
  task :import => :environment do
    file = if ENV['DATE'].nil?
             'db/characters.csv'
           else
             "db/characters-#{ENV['DATE']}.csv"
           end
    exporter = CharacterCSVImporter.new(file)
    exporter.import
  end

  namespace :import do
    task :fresh => :environment do
      Character.destroy_all
      Rake::Task['character:import'].invoke
    end
  end
end
