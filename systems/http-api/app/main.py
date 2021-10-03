from fastapi import FastAPI

from .routers import recommendation
from .exception_handlers.http_exception_handler import (
    http_exception_handler,
    StarletteHTTPException,
)
from .exception_handlers.validation_exception_handler import (
    validation_exception_handler,
    RequestValidationError,
)
from .schemas import ErrorResponse

app = FastAPI(
    responses={
        # https://github.com/tiangolo/fastapi/issues/1376
        # Override Default 422 error.
        422: {"model": ErrorResponse},
    },
)

app.add_exception_handler(StarletteHTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)

app.include_router(recommendation.router)
