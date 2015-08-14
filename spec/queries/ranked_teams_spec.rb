require 'rails_helper'

RSpec.describe RankedTeams, focus: true do
  let!(:team1) { create_team('Ryan\'s Team', 100) }
  let!(:team2) { create_team('Jessica\'s Team', 200) }
  subject { RankedTeams.new(Team.all) }

  describe '#rankings' do
    subject { super().rankings }

    context 'with different scores' do
      it 'orders teams by score' do
        expect(subject).to eq [team2, team1]
      end
    end

    context 'with same score' do
      before { team2.update_attribute(:created_at, 5.days.ago) }
      it 'orders teams by created at ascending' do
        expect(subject).to eq [team2, team1]
      end
    end
  end

  describe '#rank_for_team' do
    subject { super().rank_for_team(team2) }
    it 'returns the rank for the team' do
      expect(subject).to eq 1
    end
  end

  def create_team(name, score)
    user = User.create(name: name.split('\'').first)
    Team.create(name: name, score: score, user: user)
  end

end
