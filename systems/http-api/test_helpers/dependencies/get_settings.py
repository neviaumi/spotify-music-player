from functools import lru_cache

from app.config import TestSettings


@lru_cache()
def get_test_settings():
    return TestSettings()
