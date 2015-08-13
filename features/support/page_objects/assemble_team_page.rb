require_relative 'character_result_section'
require_relative 'team_member_section'
require_relative 'team_creator_feedback_section'

class AssembleTeamPage < SitePrism::Page
  element :search_field, '.character-search-field input'
  element :assemble_button, '#create_team_button button'
  sections :character_results, CharacterResultSection, '.character-result'
  sections :team_members, TeamMemberSection, '.team-character'
  section :creator_feedback, TeamCreatorFeedbackSection, '#team_creator_feedback'

  def find_character_result(character_name)
    character_results.detect do |cr|
      cr.name.text.include? character_name
    end
  end

  def find_team_member(character_name)
    team_members.detect do |tm|
      tm.has_id?(find_character(character_name).id)
    end
  end

  def has_character_result?(character_name)
    find_character_result(character_name).present?
  end

  def has_team_member?(character_name)
    find_team_member(character_name).present?
  end

  def add_character(character_name)
    find_character_result(character_name).add_button.click
  end

  private

  def find_character(name)
    @characters ||= {}
    @characters[name] ||= Character.find_by(name: name)
  end
end
