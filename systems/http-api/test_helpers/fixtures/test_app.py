from pytest import fixture

from app.main import app
from app.dependencies import get_settings

from test_helpers.dependencies import get_test_settings


@fixture()
def test_app():
    app.dependency_overrides[get_settings] = get_test_settings
    yield app
    app.dependency_overrides = {}
