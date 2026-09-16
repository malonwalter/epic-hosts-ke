import os


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "sqlite:///epic_hosts.db"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "epic-hosts-ke-development-secret"
    )