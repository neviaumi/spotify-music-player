from app.dependencies import get_spotify_api_client

from test_helpers.dependencies.get_spotify_api_client import (
    mock_spotify_api_client,
    ApiHandler,
    default_api_handler,
)


def use_mock_spotify_server(app, handler: ApiHandler = None):
    app.dependency_overrides[get_spotify_api_client] = mock_spotify_api_client(
        handler if handler is not None else default_api_handler
    )
