from httpx import AsyncClient


async def get_recent_played_tracks(api_client: AsyncClient):
    resp = await api_client.get(
        url="/me/player/recently-played",
        params={
            "limit": 50,
        },
    )
    data = resp.json()
    return [item["track"] for item in data["items"]]
