#!/usr/bin bash
set -ex
cp ../web-frontend/build/asset-manifest.json ./static/
package_name=$(python -c "print('$LERNA_PACKAGE_NAME'.split('/')[1])")
image_name="europe-west2-docker.pkg.dev/$GCP_PROJECT_ID/$GCP_IMAGE_REPOSITORY/$package_name:${GITHUB_SHA:-latest}"
docker build -t "$image_name" .
if [ "$CI" = "true" ] ; then
    npx lerna exec --stream --concurrency 1 --scope=@music-player/http-api -- bash scripts/ci/deploy.sh "$image_name"
fi
