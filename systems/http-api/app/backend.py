from fastapi import APIRouter
from .routers import recommendation

router = APIRouter()

router.include_router(recommendation.router)
