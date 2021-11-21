import asyncio

from unittest.mock import MagicMock
import pytest
from ..get_user_top_artists_genres import get_user_top_artists_genres


def create_api_client_mock(response):
    mock_response = MagicMock()
    mock_response.json = MagicMock(return_value=response)
    mock_response_future = asyncio.Future()
    mock_response_future.set_result(mock_response)
    mock_client = MagicMock()
    mock_client.get.return_value = mock_response_future
    return mock_client


@pytest.mark.asyncio
async def test_get_user_top_artists_genres():
    api_client = create_api_client_mock(
        {
            "items": [
                {"genres": ["a", "b", "c", "d"]},
                {"genres": ["d", "e", "f", "g"]},
                {"genres": ["d", "c", "b", "a"]},
            ]
        }
    )
    genres = await get_user_top_artists_genres(api_client)
    assert genres == ["d", "a", "b", "c", "e", "f", "g"]
