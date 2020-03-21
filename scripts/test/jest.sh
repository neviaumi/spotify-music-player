#!/usr/bin/env bash

set -ex

# For debugg failure on CI
yarn test --showConfig
yarn test --coverage
