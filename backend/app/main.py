import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.calculator import router as calculator_router

load_dotenv()

app = FastAPI(
    title="Rural Biz Advisor API",
    version="0.1.0",
)

cors_origin = os.getenv("CORS_ORIGIN", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[cors_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(calculator_router)


@app.get("/")
def health_check():
    return {"status": "ok", "service": "rural-biz-advisor-api"}
