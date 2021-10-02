from enum import Enum

from fastapi import APIRouter, Depends, HTTPException, status
from httpx import AsyncClient
from app.dependencies import get_spotify_api_client
from .services import get_recent_played_artists, get_recommend_albums

router = APIRouter()


class FeedType(Enum):
    RECENT_PLAYED_ARTISTS: str = "by-recent-played-artists"


@router.get("/recommendation-feed/albums/{feed_type}")
async def get_recommendation_feed(
    feed_type: FeedType, api_client: AsyncClient = Depends(get_spotify_api_client)
):
    if feed_type == FeedType.RECENT_PLAYED_ARTISTS:
        recent_played_artists = await get_recent_played_artists(api_client)
        recommend_albums = await get_recommend_albums(
            api_client,
            [artist["id"] for artist in recent_played_artists],
            "seed_artists",
        )
        seed = {"seeds": recent_played_artists[0:5], "type": "artists"}
    else:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=[{"code": "UNKNOWN_PARAMETER", "meta": {"feed_type": feed_type}}],
        )
    return {
        "data": recommend_albums,
        "meta": seed,
    }
