---
layout: false
---

xml.instruct!
xml.urlset "xmlns" => "http://www.sitemaps.org/schemas/sitemap/0.9" do
  sitemap.resources.select { |page|
    page.path =~ /\.html/ &&
    page.data.noindex != true}.each do |page|
      xml.url do
        xml.loc full_url(page.url)
        xml.lastmod Date.today.to_time.iso8601
        xml.changefreq page.data.sitemap_changefreq || "monthly"
        xml.priority page.data.sitemap_priority || "0.5"
      end
  end
end
