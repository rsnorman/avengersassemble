require 'spec_helper'
require './app/value_objects/ratings'

RSpec.describe Ratings do
  let(:character) do
    instance_double('Character', fighting_rating:     1,
                                 strength_rating:     2,
                                 energy_rating:       3,
                                 intelligence_rating: 4,
                                 durability_rating:   5,
                                 speed_rating:        6)
  end

  subject { described_class.from_character(character) }

  describe '.from_character' do
    its(:fighting)     { is_expected.to eq 1 }
    its(:strength)     { is_expected.to eq 2 }
    its(:energy)       { is_expected.to eq 3 }
    its(:intelligence) { is_expected.to eq 4 }
    its(:durability)   { is_expected.to eq 5 }
    its(:speed)        { is_expected.to eq 6 }
  end

  describe '#all' do
    subject { super().all }

    it 'returns all the rating values' do
      expect(subject).to eq [1,2,3,4,5,6]
    end
  end

  describe '#missing?' do
    let(:character) do
      instance_double('Character', fighting_rating:     value,
                                   strength_rating:     value,
                                   energy_rating:       value,
                                   intelligence_rating: value,
                                   durability_rating:   value,
                                   speed_rating:        value)
    end

    subject { super().missing? }

    context 'with all nil values' do
      let(:value) { nil }
      it { is_expected.to be_truthy }
    end

    context 'with all zero values' do
      let(:value) { 0 }
      it { is_expected.to be_truthy }
    end

    context 'with all values equal to 1' do
      let(:value) { 1 }
      it { is_expected.to be_truthy }
    end

    context 'with not all values equal to nil, zero, or one' do
      let(:value) { 2 }
      it { is_expected.to be_falsey }
    end
  end
end
