#!/usr/bin/env bash

set -ex

npx markdownlint-cli2 .
npx npmPkgJsonLint .