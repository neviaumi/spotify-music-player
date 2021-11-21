from httpx import AsyncClient

from fastapi import Depends
from fastapi.security import HTTPBearer


from app.config import Settings
from app.dependencies.get_settings import get_settings


oauth2_scheme = HTTPBearer()


async def raise_on_4xx_5xx(response):
    response.raise_for_status()


async def get_spotify_api_client(
    settings: Settings = Depends(get_settings), token: str = Depends(oauth2_scheme)
):
    async with AsyncClient(
        base_url=settings.spotify_host_url,
        headers={"Authorization": f"Bearer {token}"},
        event_hooks={"response": [raise_on_4xx_5xx]},
    ) as client:
        yield client
