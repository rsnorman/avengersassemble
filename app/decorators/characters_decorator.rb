class CharactersDecorator < SimpleDelegator
  def to_builder
    Jbuilder.new do |json|
      json.name "Ryan"
    end
  end
end

# do |character|
 # json.character.(character, :name)
 # character_json.(
 #   self, :id, :name, :real_name, :description, :powers,
 #   :thumbnail_url, :ratings, :experience, :soldier_type
 # )
#end
