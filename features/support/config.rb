require 'cucumber/rails'
require 'capybara/rspec'
require 'rack_session_access/capybara'
require 'site_prism'

Capybara.register_driver :selenium do |app|
  profile = Selenium::WebDriver::Firefox::Profile.new
  profile.native_events = true
  Capybara::Selenium::Driver.new(app, :browser => :firefox, profile: profile)
end

Capybara.register_driver :slow_selenium do |app|
  client = Selenium::WebDriver::Remote::Http::Default.new
  client.timeout = 120
  Capybara::Selenium::Driver.new(app, http_client: client)
end

Before('@clear_cache') do
  require 'fileutils'
  FileUtils.rm_rf(Rails.root.join('tmp/cache'))
end

SitePrism.configure do |config|
  config.use_implicit_waits = true
end
