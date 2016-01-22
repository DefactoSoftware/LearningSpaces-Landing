###
# Page options, layouts, aliases and proxies
###

# Ignores
ignore '/fonts/icons/selection.json'

# Per-page layout changes:
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

activate :i18n, mount_at_root: :en
activate :directory_indexes
activate :autoprefixer

# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end

# Build-specific configuration
configure :build do
  # Path prefix (ie. for Github pages)
  # set :http_prefix, "/LearningSpaces-Landing"

  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript
end

###
# Helpers
###

helpers do
  # Temp fix for middleman asset_url method
  # https://github.com/middleman/middleman/issues/1772
  def asset_url(path, prefix="", options={})
    options_with_resource = options.merge(current_resource: current_resource)
    ::Middleman::Util.asset_url(app, path, prefix, options_with_resource)
  end

  # Use frontmatter for i18n titles
  def page_title(page=current_page)
    titleAppend =  defined?(page.data.title_affix) && !page.data.title_affix ? "" : " | LearningSpaces"
    return page.data.title.send(I18n.locale) + titleAppend if page.data.title.is_a?(Hash) && page.data.title[I18n.locale]
    return page.data.title + titleAppend if page.data.title
    return "Welcome to LearningSpaces"
  end

  # Parse Markdown
  def markdown(string)
    Tilt['markdown'].new { string }.render(scope=self)
  end

  def full_locale(lang=I18n.locale.to_s)
    if lang == "en"
      "en_US"
    else
      "#{lang.downcase}_#{lang.upcase}"
    end
  end

  # Get full url
  def full_url(url)
    URI.join("http://www.learningspaces.#{t("tld")}", url)
  end
end
