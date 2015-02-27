###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# Assets paths
set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

# activate :directory_indexes

# Development specific configuration
configure :development do
  activate :i18n, :mount_at_root => :en
  activate :directory_indexes
  activate :livereload, :host => "127.0.0.1"
end

# Build specific configuration
configure :build do
  # activate :minify_html
  activate :minify_css
  activate :minify_javascript
  activate :asset_hash
  # activate :relative_assets
  activate :i18n, :mount_at_root => false
  activate :directory_indexes
  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
