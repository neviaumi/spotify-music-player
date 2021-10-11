from fastapi.testclient import TestClient

from test_helpers.dependencies import get_test_settings
from test_helpers import use_mock_spotify_server


settings = get_test_settings()


def test_read_albums_recommendation_feed_by_recent_played_artists(test_app):
    use_mock_spotify_server(test_app)
    client = TestClient(test_app)
    response = client.get(
        "/api/recommendation-feed/albums/by-recent-played-artists",
        headers={"Authorization": f"Bearer {settings.spotify_access_token}"},
    )
    assert response.status_code == 200
    response_body = response.json()
    assert isinstance(response_body["data"], list)
    assert isinstance(response_body["meta"]["seeds"], list)
    assert response_body["meta"]["seed_type"] == "artists"


def test_read_albums_recommendation_feed_by_recent_played_tracks(test_app):
    use_mock_spotify_server(test_app)
    client = TestClient(test_app)
    response = client.get(
        "/api/recommendation-feed/albums/by-recent-played-tracks",
        headers={"Authorization": f"Bearer {settings.spotify_access_token}"},
    )
    assert response.status_code == 200
    response_body = response.json()

    assert isinstance(response_body["data"], list)
    assert isinstance(response_body["meta"]["seeds"], list)
    assert response_body["meta"]["seed_type"] == "tracks"


def test_read_albums_recommendation_feed_by_user_top_tracks(test_app):
    use_mock_spotify_server(test_app)
    client = TestClient(test_app)
    response = client.get(
        "/api/recommendation-feed/albums/by-user-top-tracks",
        headers={"Authorization": f"Bearer {settings.spotify_access_token}"},
    )
    assert response.status_code == 200
    response_body = response.json()

    assert isinstance(response_body["data"], list)
    assert isinstance(response_body["meta"]["seeds"], list)
    assert response_body["meta"]["seed_type"] == "tracks"


def test_read_albums_recommendation_feed_by_user_top_artists(test_app):
    use_mock_spotify_server(test_app)
    client = TestClient(test_app)
    response = client.get(
        "/api/recommendation-feed/albums/by-user-top-artists",
        headers={"Authorization": f"Bearer {settings.spotify_access_token}"},
    )
    assert response.status_code == 200
    response_body = response.json()

    assert isinstance(response_body["data"], list)
    assert isinstance(response_body["meta"]["seeds"], list)
    assert response_body["meta"]["seed_type"] == "artists"


def test_read_albums_recommendation_feed_by_user_top_artists_genres(test_app):
    use_mock_spotify_server(test_app)
    client = TestClient(test_app)
    response = client.get(
        "/api/recommendation-feed/albums/by-user-top-artists-genres",
        headers={"Authorization": f"Bearer {settings.spotify_access_token}"},
    )
    assert response.status_code == 200
    response_body = response.json()

    assert isinstance(response_body["data"], list)
    assert isinstance(response_body["meta"]["seeds"], list)
    assert response_body["meta"]["seed_type"] == "genres"
