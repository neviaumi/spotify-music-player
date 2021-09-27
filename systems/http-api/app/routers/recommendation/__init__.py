from fastapi import APIRouter

router = APIRouter()


@router.get("/recommendation-feed/{feed_type}/{feed_id}")
def get_recommendation_feed(feed_type: str, feed_id: str):
    return {"params": {"feed_type": feed_type, "feed_id": feed_id}}


__all__ = ["router"]
