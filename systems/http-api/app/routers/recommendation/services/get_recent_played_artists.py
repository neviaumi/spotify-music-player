from httpx import AsyncClient
from app.utils import dedupe, flatten
from .get_recent_played_tracks import get_recent_played_tracks


async def get_recent_played_artists(api_client: AsyncClient):
    recent_played_tracks = await get_recent_played_tracks(api_client)
    recent_played_artists = dedupe(
        flatten([track["artists"] for track in recent_played_tracks]),
        lambda artist: artist["id"],
    )
    return recent_played_artists
