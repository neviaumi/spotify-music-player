#!/bin/sh

set -ex

gsutil cp -r build/css build/js build/assets "gs://$GCP_STORAGE_BUCKET/"
