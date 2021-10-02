from typing import Optional
from pydantic import BaseSettings


class Settings(BaseSettings):
    spotify_host_url: str = "https://api.spotify.com/v1"

    class Config:
        env_file = ".env"


class TestSettings(Settings):
    spotify_host_url: str = "https://api.spotify.com/v1"
    spotify_access_token: Optional[str]

    class Config:
        env_file = ".env.test"
