class StatSection < SitePrism::Section
  element :bar, '.stat-bar'

  def has_percent?(value)
    bar['value'] == value.to_s
  end
end
