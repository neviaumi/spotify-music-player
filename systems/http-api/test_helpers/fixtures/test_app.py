from pytest import fixture

from app.main import app
from app.dependencies import get_settings, get_spotify_api_client

from test_helpers.dependencies import get_test_settings, get_test_spotify_api_client


@fixture(scope="module")
def test_app():
    app.dependency_overrides[get_settings] = get_test_settings
    app.dependency_overrides[get_spotify_api_client] = get_test_spotify_api_client
    yield app
    app.dependency_overrides = {}
