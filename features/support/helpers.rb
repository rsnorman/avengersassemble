module Helpers
  def find_character(name)
    @characters ||= {}
    @characters[name] ||= Character.find_by(name: name)
  end

  def create_user
    User.create(
      name:  ['Ryan Norman', 'Jessica Garvey', 'Dexter Beagle'].sample,
      image: 'http://graph.facebook.com/10100751232536290/picture?type=large'
    )
  end

  def create_team
    all_character_ids = Character.valid.original.experienced.pluck(:id)
    character_ids = []
    while character_ids.size < 5 do
      character_ids << all_character_ids.sample
      character_ids = character_ids.uniq
    end

    UserTeamCreator.new(create_user).assemble(
      character_ids: character_ids,
      camaraderie:   200
    )
  end

  def notifications
    @notifications ||= NotificationsSection.new('body', '#notifications')
  end
end

World(Helpers)
