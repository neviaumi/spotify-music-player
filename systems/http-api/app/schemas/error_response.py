from typing import List
from pydantic import BaseModel


class Error(BaseModel):
    code: str
    meta: dict


class ErrorResponse(BaseModel):
    errors: List[Error]
