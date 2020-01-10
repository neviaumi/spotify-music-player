#!/usr/bin/env bash

set -ex

yarn test --watchAll=false --coverage
lhci autorun