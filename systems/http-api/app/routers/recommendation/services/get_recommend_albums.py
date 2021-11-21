from typing import Literal, List
from httpx import AsyncClient

from app.utils import dedupe


async def get_recommend_albums(
    api_client: AsyncClient,
    seeds: List[str],
    seed_type: Literal["seed_artists", "seed_genres", "seed_tracks"],
):
    resp = await api_client.get(
        url="recommendations", params={seed_type: seeds[0:5], "limit": 100}
    )
    data = resp.json()
    recommend_tracks = data["tracks"]
    return dedupe(
        [track["album"] for track in recommend_tracks], lambda album: album["id"]
    )
