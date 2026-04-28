from pymongo import MongoClient
import os

from pymongo import MongoClient

MONGO_URI = "mongodb+srv://melodai_user:melodai123@cluster0.t1nfshd.mongodb.net/?appName=Cluster0"

client = MongoClient(MONGO_URI)
db     = client["melodai_db"]

music_history_collection = db["music_history"]
favourites_collection    = db["favourites"]

# MongoDB Atlas connection string
MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(os.getenv("MONGO_URI"))

# Create/select database
db = client["melodai_db"]

# Create/select collection
music_history_collection = db["music_history"]

# ✅ NEW — Favourites collection
favourites_collection = db["favourites"]