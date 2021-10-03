from enum import Enum
from typing import Literal
from fastapi import APIRouter, Depends, status
from httpx import AsyncClient
from app.dependencies import get_spotify_api_client
from app.exceptions import TypedHTTPException
from .services import (
    get_recent_played_artists,
    get_recommend_albums,
    get_recent_played_tracks,
    get_user_top_tracks,
    get_user_top_artists,
)

router = APIRouter()


class FeedType(Enum):
    RECENT_PLAYED_ARTISTS = "by-recent-played-artists"
    RECENT_PLAYED_TRACKS = "by-recent-played-tracks"
    USER_TOP_TRACKS = "by-user-top-tracks"
    USER_TOP_ARTISTS = "by-user-top-artists"


def create_response_obj(data, seeds, seed_type: Literal["artists", "tracks"]):
    return {
        "data": data,
        "meta": {"seeds": seeds[0:5], "seed_type": seed_type},
    }


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
        response = create_response_obj(
            recommend_albums, recent_played_artists, "artists"
        )
    elif feed_type == FeedType.RECENT_PLAYED_TRACKS:
        recent_played_tracks = await get_recent_played_tracks(api_client)
        recommend_albums = await get_recommend_albums(
            api_client,
            [track["id"] for track in recent_played_tracks],
            "seed_tracks",
        )
        response = create_response_obj(recent_played_tracks, recommend_albums, "tracks")
    elif feed_type == FeedType.USER_TOP_TRACKS:
        user_top_tracks = await get_user_top_tracks(api_client)
        recommend_albums = await get_recommend_albums(
            api_client,
            [track["id"] for track in user_top_tracks],
            "seed_tracks",
        )
        response = create_response_obj(user_top_tracks, recommend_albums, "tracks")
    elif feed_type == FeedType.USER_TOP_ARTISTS:
        user_top_artists = await get_user_top_artists(api_client)
        recommend_albums = await get_recommend_albums(
            api_client,
            [artist["id"] for artist in user_top_artists],
            "seed_artists",
        )
        response = create_response_obj(recommend_albums, user_top_artists, "artists")
    else:
        raise TypedHTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=[{"code": "UNKNOWN_PARAMETER", "meta": {"feed_type": feed_type}}],
        )
    return response
