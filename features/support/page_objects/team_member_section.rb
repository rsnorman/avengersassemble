class TeamMemberSection < SitePrism::Section

  def click
    root_element.click
  end

  def has_id?(id)
    root_element[:id] == "team_character_#{id}"
  end

end
