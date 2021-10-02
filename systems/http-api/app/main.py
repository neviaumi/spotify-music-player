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


app = FastAPI()

app.add_exception_handler(StarletteHTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)

app.include_router(recommendation.router)
