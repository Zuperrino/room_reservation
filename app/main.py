from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routers import main_router
from app.core.config import settings
from app.core.init_db import create_first_superuser
from app.core.admin.admin import init_admin

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_first_superuser()
    yield

app = FastAPI(
    title=settings.app_title,
    description=settings.description,
    lifespan=lifespan,
)

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_admin(app)
app.include_router(main_router)
