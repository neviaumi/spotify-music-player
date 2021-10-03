from typing import TypedDict
from fastapi import Depends, Request
from fastapi.security import OAuth2PasswordBearer
from httpx import AsyncClient, MockTransport, Response

from app.config import Settings
from app.dependencies.get_settings import get_settings
from test_helpers.seeds import build_track_object


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")
GetAPI = TypedDict(
    "GetAPI", {"/v1/me/player/recently-played": dict, "/v1/recommendations": dict}
)
ApiHandler = TypedDict("ApiHandler", {"GET": GetAPI}, total=False)
default_api_handler: ApiHandler = {
    "GET": {
        "/v1/me/player/recently-played": {
            "items": [
                {"track": build_track_object()},
                {"track": build_track_object()},
                {"track": build_track_object()},
            ]
        },
        "/v1/recommendations": {"tracks": [build_track_object()]},
    }
}


async def raise_on_4xx_5xx(response):
    response.raise_for_status()


def handler(api_handler: ApiHandler):
    def request_handler(request: Request):
        return Response(200, json=api_handler[request.method][request.url.path])

    return request_handler


def mock_spotify_api_client(api_handler):
    async def get_test_spotify_api_client(
        settings: Settings = Depends(get_settings), token: str = Depends(oauth2_scheme)
    ):
        mounts = {settings.spotify_host_url: MockTransport(handler(api_handler))}
        async with AsyncClient(
            base_url=settings.spotify_host_url,
            headers={"Authorization": f"Bearer {token}"},
            event_hooks={"response": [raise_on_4xx_5xx]},
            mounts=mounts,
        ) as client:
            yield client

    return get_test_spotify_api_client
