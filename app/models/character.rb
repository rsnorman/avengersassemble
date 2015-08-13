class Character < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :marvel_id, presence: true
  validates :thumbnail_url, presence: true

  scope :original,      -> { where(is_original:        true) }
  scope :duplicate,     -> { where(is_original:        false) }

  scope :missing_image, -> { where(is_missing_image:   true) }
  scope :rated,         -> { where(is_missing_ratings: false) }
  scope :valid,         lambda {
    where(is_missing_image:   false,
          is_invalid:         false)
  }

  scope :experienced,   -> { where('experience IS NOT NULL') }
  scope :inexperienced, -> { where(experience: nil) }

  default_scope -> { order(experience: :desc, name: :asc) }

  def ratings
    @ratings ||= Ratings.from_character(self)
  end

  def thumbnail_image
    @thumb_image ||= ThumbnailImage.new(thumbnail_url)
  end

  def soldier_type
    @soldier_type ||= SoldierType.from_experience(experience)
  end
end
