#!/usr/bin/env bash

set -ex
poetry run pylint --fail-under=10 ./gcp ./__main__.py
poetry run black .
poetry run pytest --pyargs .