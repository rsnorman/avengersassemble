class ModelAttributes

  def initialize(model)
    @model = model
  end

  def attribute_names
    @model.columns.collect(&:name)
                  .sort { |x,y| x <=> y }
  end

end
