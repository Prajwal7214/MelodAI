import os
from pathlib import Path
from pymongo import MongoClient
from dotenv import load_dotenv

# Load .env from the project root (two levels up from this file)
env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise EnvironmentError(
        "MONGO_URI is not set. Make sure a .env file exists in the project root "
        "with MONGO_URI=<your-connection-string>"
    )

client = MongoClient(MONGO_URI)
db     = client["melodai_db"]

music_history_collection = db["music_history"]
favourites_collection    = db["favourites"]