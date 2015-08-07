class NotificationsSection < SitePrism::Section

  def has_message?(message)
    has_content? message
  end

end
