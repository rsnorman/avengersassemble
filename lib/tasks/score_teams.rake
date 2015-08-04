namespace :team do
  desc 'Recalculates all the scores for teams'
  task score: :environment do
    puts 'Updating all team scores…'
    Team.all.each do |team|
      team.update_attribute(:score, ScoreCalculator.new(team).score)
    end
    puts "Updated #{Team.count} team scores"
  end
end
