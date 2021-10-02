from httpx import AsyncClient
from app.utils import dedupe, flatten


async def get_recent_played_artists(api_client: AsyncClient):
    resp = await api_client.get(
        url="/me/player/recently-played",
        params={
            "limit": 50,
        },
    )
    data = resp.json()
    recent_played_artists = dedupe(
        flatten([item["track"]["artists"] for item in data["items"]]),
        lambda artist: artist["id"],
    )
    return recent_played_artists
