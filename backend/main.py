from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.routes.user_routes import router as user_router
from app.routes.auth_routes import router as auth_router
from app.api.spoon_api import router as spoon_api_router


app = FastAPI()

app.include_router(user_router)
app.include_router(auth_router)
app.include_router(spoon_api_router)


origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Vos routes ici
@app.get("/")
async def read_root():
    return {"Hello": "World"}

# Autres routes et logique de l'application

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
