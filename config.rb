###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

###
# Configuration
###

# set :relative_links, true
# activate :relative_assets

activate :i18n, :mount_at_root => :en
activate :directory_indexes
activate :autoprefixer

# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end

# Build-specific configuration
configure :build do
  # Path prefix (ie. for Github pages)
  set :http_prefix, "/LearningSpaces-Landing"

  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript
end

# Deploy
activate :deploy do |deploy|
  deploy.method = :git
  # Optional Settings
  # deploy.build_before = true        # default: false
  # deploy.remote   = 'custom-remote' # remote name or git url, default: origin
  # deploy.branch   = 'custom-branch' # default: gh-pages
  # deploy.strategy = :submodule      # commit strategy: can be :force_push or :submodule, default: :force_push
  # deploy.commit_message = 'custom-message' # commit message (can be empty), default: Automated commit at `timestamp` by middleman-deploy `version`
end

###
# Helpers
###

helpers do
  # Parse Markdown
  def markdown(string)
    Tilt['markdown'].new { string }.render(scope=self)
  end
end
