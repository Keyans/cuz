#!/bin/bash

# Generate the site using Nuxt's standard command
bun run generate

# Make sure dist directory exists
mkdir -p dist

# Ensure _nuxt directory is created
mkdir -p dist/_nuxt

# Copy all public assets directly to dist
cp -r public/* dist/

# Create a simple index.html if it doesn't exist
if [ ! -f dist/index.html ]; then
  echo '<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Printify Clone</title>
    <link rel="icon" type="image/png" href="/favicon.png">
  </head>
  <body>
    <div id="app"></div>
    <script src="/_nuxt/entry.js"></script>
  </body>
</html>' > dist/index.html
fi

echo "Build completed successfully!"
