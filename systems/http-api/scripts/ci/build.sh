#!/usr/bin bash
set -ex
cp ../web-frontend/build/asset-manifest.json ./static/
packageName=$(python -c "print('$LERNA_PACKAGE_NAME'.split('/')[1])")
tag="europe-west2-docker.pkg.dev/spotify-music-player-327914/test-pulumi-repository/$packageName:${GITHUB_SHA:-latest}"
docker build -t "$tag" .
docker push "$tag"