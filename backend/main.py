import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router import auth, comments, posts
app = FastAPI()
app = FastAPI(redirect_slashes=False)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Talent Growth Test - Blog App API"}

app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(comments.router, prefix="/api/v1", tags=["Comments"])
app.include_router(posts.router, prefix="/api/v1", tags=["Posts"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)