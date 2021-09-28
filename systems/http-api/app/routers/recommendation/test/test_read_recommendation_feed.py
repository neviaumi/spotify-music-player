from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_read_recommendation_feed():
    response = client.get("/recommendation-feed/foo/bar")
    assert response.status_code == 200
    assert response.json() == {"params": {"feed_type": "foo", "feed_id": "bar"}}
