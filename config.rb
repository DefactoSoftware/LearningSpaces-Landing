###
# Page options, layouts, aliases and proxies
###

# Ignores
ignore "/fonts/icons/selection.json"

# Per-page layout changes:
# With no layout
page "/*.xml", layout: false
page "/*.json", layout: false
page "/*.txt", layout: false

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

activate :directory_indexes
activate :autoprefixer

# Reload the browser automatically whenever files change
# # configure :development do
# configure :server do
#   activate :livereload
# end

# Just fyi
puts "Running '#{config[:environment]}' environment in '#{config[:mode]}' mode."

# middleman (-e development)
configure :development do
  activate :i18n, mount_at_root: :en, langs: [:en, :nl, :de]
end

# middleman -e en
configure :en do
  activate :i18n, langs: [:en]
end

# middleman -e nl
configure :nl do
  activate :i18n, langs: [:nl]
end

# middleman -e de
configure :de do
  activate :i18n, langs: [:de]
end

# Build configuration
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
  # Page title
  def page_title(page=current_page, locale=I18n.locale)
    affix = defined?(page.data.has_title_affix) && !page.data.has_title_affix ? "" : " | LearningSpaces"
    return page.data.title.send(locale) + affix if page.data.title.is_a?(Hash) && page.data.title[locale]
    return page.data.title + affix if page.data.title.is_a?(String)
    t("head.default_title") || "LearningSpaces"
  end

  # Page description
  def page_description(page=current_page, locale=I18n.locale)
    return page.data.description.send(locale) if page.data.description.is_a?(Hash) && page.data.description[locale]
    return page.data.description if page.data.description.is_a?(String)
    t("head.default_description") || ""
  end

  # Parse Markdown
  def markdown(string)
    Tilt['markdown'].new { string }.render(scope=self)
  end

  # Locale in xx_XX format
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

  # String to slug
  def slug(string)
    string.strip.downcase.parameterize
  end
end
