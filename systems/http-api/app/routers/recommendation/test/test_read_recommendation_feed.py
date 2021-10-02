from fastapi.testclient import TestClient

from test_helpers.dependencies import get_test_settings

settings = get_test_settings()


def test_read_recommendation_feed_by_recent_played_artists(test_app):
    client = TestClient(test_app)
    response = client.get(
        "/recommendation-feed/albums/by-recent-played-artists",
        headers={"Authorization": f"Bearer {settings.spotify_access_token}"},
    )
    assert response.status_code == 200
    assert response.json() == {"data": [], "meta": {"seeds": [], "type": "artists"}}
