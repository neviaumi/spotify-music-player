#!/bin/sh

set -ex

bucket_name="test-pulumi-f675971"

gsutil cp -r build/css build/js build/assets "gs://$bucket_name/"
