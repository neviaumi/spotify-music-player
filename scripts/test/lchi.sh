#!/usr/bin/env bash

set -ex

yarn lhci autorun
yarn lhci assert --no-lighthouserc --budgetsFile=.budgets.json