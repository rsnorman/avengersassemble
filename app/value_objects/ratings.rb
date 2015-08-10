class Ratings

  RATING_NAMES = %i(
    fighting strength energy intelligence durability speed
  ).freeze

  attr_reader(*RATING_NAMES)

  def self.from_character(character)
    ratings = RATING_NAMES.collect do |rating_name|
      character.public_send("#{rating_name}_rating")
    end

    Ratings.new(*ratings)
  end

  def all
    @all_ratings ||= RATING_NAMES.collect { |r| public_send(r) }
  end

  def missing?
    all.uniq.size == 1 && [nil, 0, 1].include?(all.first)
  end

  private

  def initialize(*ratings)
    RATING_NAMES.each_with_index do |rating_name, index|
      instance_variable_set(
        "@#{rating_name}", ratings[index]
      )
    end
  end

end
