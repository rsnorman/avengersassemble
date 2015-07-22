class ExperienceRewarder

  def initialize(client = MarvelClient.new)
    @client   = client
  end

  def reward(characters = Character.all)
    characters.each do |character|
      start_time = Time.current

      begin
        experience = @client.character_comics(
          character.marvel_id, limit: 1
        )['data']['total']
        character.update_attribute(:experience, experience)
      rescue
        puts "Failed rewarding experience for #{character.name}. Setting to 0"
        character.update_attribute(:experience, 0)
      end

      puts "Took #{Time.current - start_time} to reward experience" \
        "for #{character.name}"
    end
  end

end
