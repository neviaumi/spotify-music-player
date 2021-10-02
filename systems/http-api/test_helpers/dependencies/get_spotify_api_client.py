from fastapi import Depends, Request
from fastapi.security import OAuth2PasswordBearer
from httpx import AsyncClient, MockTransport, Response

from app.config import Settings
from app.dependencies.get_settings import get_settings


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")


async def raise_on_4xx_5xx(response):
    response.raise_for_status()


def handler(request: Request):
    response_body = {
        "GET": {
            "/v1/me/player/recently-played": {"items": []},
            "/v1/recommendations": {"tracks": []},
        }
    }
    return Response(200, json=response_body[request.method][request.url.path])


async def get_test_spotify_api_client(
    settings: Settings = Depends(get_settings), token: str = Depends(oauth2_scheme)
):
    mounts = {settings.spotify_host_url: MockTransport(handler)}
    async with AsyncClient(
        base_url=settings.spotify_host_url,
        headers={"Authorization": f"Bearer {token}"},
        event_hooks={"response": [raise_on_4xx_5xx]},
        mounts=mounts,
    ) as client:
        yield client
