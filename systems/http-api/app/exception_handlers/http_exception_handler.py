from http import HTTPStatus
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import Request


def create_default_error(_: Request, exc: StarletteHTTPException):
    return [
        {
            "code": HTTPStatus(exc.status_code).name,
            "meta": {},
        }
    ]


def http_exception_handler(_, exc: StarletteHTTPException):
    """
    https://jsonapi.org/format/#document-top-level
    """
    return JSONResponse(
        status_code=exc.status_code,
        content=jsonable_encoder(
            {
                "errors": exc.detail
                if isinstance(exc.detail, list)
                else create_default_error(_, exc)
            }
        ),
    )


__all__ = ["http_exception_handler", "StarletteHTTPException"]
