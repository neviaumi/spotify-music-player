from httpx import AsyncClient


async def get_user_top_artists(api_client: AsyncClient):
    resp = await api_client.get(
        url="/me/top/artists",
        params={
            "limit": 50,
            "time_range": "short_term",
        },
    )
    data = resp.json()
    return data["items"]
