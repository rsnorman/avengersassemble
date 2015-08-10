class TeamSerializer < ActiveModel::Serializer
  attributes :name, :score, :leader, :rank, :stats

  has_many :characters

  def leader
    @object.user
  end

  def rank
    if @object.respond_to?(:rank)
      @object.rank
    else
      RankedTeams.new.rank_for_team(@object)
    end
  end
end
