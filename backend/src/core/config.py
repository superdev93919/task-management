from motor.motor_asyncio import AsyncIOMotorClient
from pydantic_settings import BaseSettings
from functools import lru_cache
import os
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

class Settings(BaseSettings):
    """
    Settings class to manage environment variables for MongoDB connection.
    
    Attributes:
        mongo_uri: MongoDB connection URI.
        mongo_db: MongoDB database name.
    """
    mongo_uri: str = os.getenv("MONGO_URI")
    mongo_db: str = os.getenv("MONGO_DB")


@lru_cache()
def get_settings() -> Settings:
    """
    Retrieves the settings using the LRU cache for optimization.

    Returns:
        Settings: An instance of the Settings class containing MongoDB connection details.
    """
    return Settings()


# Create an instance of the MongoDB AsyncIOMotorClient using the URI from settings
client = AsyncIOMotorClient(get_settings().mongo_uri)

# Reference the MongoDB database specified in the settings
db = client[get_settings().mongo_db]
