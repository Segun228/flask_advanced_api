import os
from dotenv import load_dotenv


load_dotenv()


def str_to_bool(value: str) -> bool:
    return str(value).strip().lower() in ("true", "1", "yes")


DEV_PREFIX = os.getenv("DEV_PREFIX", "http://localhost:")
PROD_PREFIX = os.getenv("PROD_PREFIX", "/")
PORT = os.getenv("PORT", "8000")
DEBUG = str_to_bool(os.getenv("DEBUG", "False"))
HOST = os.getenv("HOST", "localhost")

PROD = str_to_bool(os.getenv("PRODUCTION", "False"))
if not PROD:
    BASE_URL = f"{DEV_PREFIX}{PORT}/"
else:
    BASE_URL = PROD_PREFIX
