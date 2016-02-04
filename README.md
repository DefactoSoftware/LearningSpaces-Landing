## LearningSpaces Landingpage

[LearningSpaces](https://learningspaces.io) lets you quickly set up a learning community where you create and share knowledge with your team.
  
#### Serve and Build
We serve and build our localized websites using different `-e` environment flags:

```bash
# Serve using a single locale
bundle exec middleman -e en
bundle exec middleman -e nl
bundle exec middleman -e de

# Build using a single locale
bundle exec middleman build -e en
bundle exec middleman build -e nl
bundle exec middleman build -e de
```

Builds can be found in the `build` directory and the server runs at http://localhost:4567.

You can still serve and build without specifying an environment (for development purposes only). This will build all additional locales as subdirectories, e.g. `/nl` or `/de`.
Note that serving or building single locales using environments doesn't have i18n fallback.

#### Deploy
Build and deploy to Amazon S3:
```bash
# Deploy all locales
./deploy

# Deploy single locale
./deploy en
./deploy nl
./deploy de
```

#### Useful links for debugging

- [http://localhost:4567/__middleman/config/](http://localhost:4567/__middleman/config/)
- [http://localhost:4567/__middleman/sitemap/](http://localhost:4567/__middleman/sitemap/)

#### Dependencies

- Ruby 2.2.0
- Bundler

To install other dependencies run `bundle install` from the root of the project
