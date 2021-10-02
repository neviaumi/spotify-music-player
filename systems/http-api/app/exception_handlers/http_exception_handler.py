from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder


def http_exception_handler(_, exc: StarletteHTTPException):
    """
    https://jsonapi.org/format/#document-top-level
    https://jsonapi.org/format/#errors
    """
    return JSONResponse(
        status_code=exc.status_code,
        content=jsonable_encoder({"errors": exc.detail}),
    )


__all__ = ["http_exception_handler", "StarletteHTTPException"]
