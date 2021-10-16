#!/usr/bin bash
set -ex
image_name="$1"
if [ -z "$image_name" ]; then
  exit 1
fi
docker push "$image_name"
gcloud run deploy test-pulumi-cloud-run \
  --allow-unauthenticated \
  --image="$image_name" \
  --command="uvicorn" \
  --args='app.main:app,--host,0.0.0.0,--port,8080'