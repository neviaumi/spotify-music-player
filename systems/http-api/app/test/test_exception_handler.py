from fastapi.testclient import TestClient
from fastapi import status

from app.exceptions import TypedHTTPException


def test_route_not_found(test_app):
    client = TestClient(test_app)
    response = client.get(
        "/404-page",
    )
    assert response.status_code == 404
    assert response.json() == {"errors": [{"code": "NOT_FOUND", "meta": {}}]}


def test_custom_exception(test_app):
    def test_route():
        raise TypedHTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=[{"code": "UNKNOWN", "meta": {}}],
        )

    test_app.api_route("/test", methods=["GET"])(test_route)
    client = TestClient(test_app)
    response = client.get(
        "/test",
    )
    assert response.status_code == 422
    assert response.json() == {"errors": [{"code": "UNKNOWN", "meta": {}}]}
