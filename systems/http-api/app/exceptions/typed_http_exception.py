from typing import TypedDict, List

from fastapi import HTTPException

# https://jsonapi.org/format/#errors
Error = TypedDict(
    "Error",
    {
        "code": str,
        "meta": dict,
    },
)


class TypedHTTPException(HTTPException):
    def __init__(self, detail: List[Error], *args, **kwargs):
        super().__init__(detail=detail, *args, **kwargs)
