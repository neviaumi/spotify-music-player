from collections import Counter

from httpx import AsyncClient
from app.utils import flatten


async def get_user_top_artists_genres(api_client: AsyncClient):
    resp = await api_client.get(
        url="/me/top/artists",
        params={
            "limit": 50,
            "time_range": "short_term",
        },
    )
    data = resp.json()

    genres = Counter(flatten([item["genres"] for item in data["items"]]))
    return [genre for genre, _ in genres.most_common()]
