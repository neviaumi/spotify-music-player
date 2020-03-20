#!/usr/bin/env bash

set -ex

yarn test --watchAll=false --coverage
yarn lhci autorun
yarn lhci assert --no-lighthouserc --budgetsFile=.budgets.json