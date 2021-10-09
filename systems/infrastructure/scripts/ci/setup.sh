#!/bin/sh

set -e
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/install-poetry.py | python - -y
echo "$HOME/.local/bin" >> "$GITHUB_PATH"
"$HOME/.local/bin/poetry" config virtualenvs.create false
"$HOME/.local/bin/poetry" install