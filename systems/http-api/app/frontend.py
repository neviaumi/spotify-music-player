import json
import os
from pathlib import Path

from fastapi import Request, APIRouter
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter()
if os.getenv("FRONT_END_MANIFEST") is not None:
    manifest = Path(os.environ["FRONT_END_MANIFEST"]).read_text(encoding="utf-8")
    manifest = json.loads(manifest)
    templates = Jinja2Templates(directory="templates")
    js_files = {k: v for (k, v) in manifest.items() if ".js" in k}
    css_files = {k: v for (k, v) in manifest.items() if ".css" in k}

    @router.get(
        "/{file_path:path}", response_class=HTMLResponse, name="front_end_fallback"
    )
    def rest_of_route(request: Request):
        return templates.TemplateResponse(
            "index.html",
            {
                "request": request,
                "manifest": manifest,
                "js_files": js_files,
                "css_files": css_files,
            },
        )
