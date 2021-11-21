#!/usr/bin/env bash

set -ex
poetry run pylint --fail-under=10 ./app
poetry run black ./app
npx pyright
poetry run pytest --pyargs app