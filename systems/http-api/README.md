#HTTP API

## Setup

`poetry install`

## Dev server
`poetry run uvicorn app.main:app --reload `

## Test
` poetry run pytest --pyargs app`

## Style check
```
poetry run pylint ./app
poetry run black ./app/
```