class Character < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :marvel_id, presence: true
  validates :thumbnail_url, presence: true

  scope :valid, -> { where( is_missing_image: false,
                            is_missing_ratings: false,
                            is_invalid: false ) } 
end
