#!/bin/sh

# Save a short git hash, must be run from a git
# repository (or a child directory)
version=$(git rev-parse --short HEAD)

# Use the post_server_time access token, you can
# find one in your project access token settings
post_server_item=${ROLLBAR_AT}

echo "Uploading source maps for version $version!"

# We upload a source map for each resulting JavaScript
# file; the path depends on your build config
cd $1
#for path in $(find dist -name "*.js"); do
for path in *.js; do
  # URL of the JavaScript file on the web server
  url=$2${path}
  # a path to a corresponding source map file
  source_map="@$path.map"

  echo "Uploading source map for $url"

  curl --show-error https://api.rollbar.com/api/1/sourcemap \
    -F access_token=$post_server_item \
    -F version=$version \
    -F minified_url=$url \
    -F source_map=$source_map

done
